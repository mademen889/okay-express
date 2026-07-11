import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { customer_email } = req.query;
      let query = supabase.from('orders').select('*, order_items(*)').order('created_at', { ascending: false });
      if (customer_email) query = query.eq('customer_email', customer_email);
      const { data, error } = await query;
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const { customer_name, customer_email, customer_phone, shipping_address, items, total_amount } = req.body;
      const order_number = 'ORD-' + Date.now().toString().slice(-8);
      
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({ order_number, customer_name, customer_email, customer_phone, shipping_address, total_amount, status: 'Pending' })
        .select()
        .single();
      if (orderError) throw orderError;

      const orderItems = items.map(item => ({ order_id: order.id, product_id: item.id, quantity: item.quantity, price: item.price }));
      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) throw itemsError;

      return res.status(201).json(order);
    }

    if (req.method === 'PUT') {
      const { id, status } = req.body;
      const { data, error } = await supabase.from('orders').update({ status }).eq('id', id).select().single();
      if (error) throw error;
      return res.status(200).json(data);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}