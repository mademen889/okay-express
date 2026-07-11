import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { tracking_number } = req.query;
      let query = supabase.from('shipments').select('*').order('created_at', { ascending: false });
      if (tracking_number) {
        query = query.eq('tracking_number', tracking_number);
      }
      const { data, error } = await query.limit(50);
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const { sender_name, sender_address, recipient_name, recipient_address, weight, service_type, destination_country, origin_city, destination_city } = req.body;
      const tracking_number = 'OEI' + Date.now().toString().slice(-10);
      const { data, error } = await supabase
        .from('shipments')
        .insert({ tracking_number, sender_name, sender_address, recipient_name, recipient_address, weight, service_type, destination_country, origin_city, destination_city, status: 'Processing' })
        .select()
        .single();
      if (error) throw error;
      return res.status(201).json(data);
    }

    if (req.method === 'PUT') {
      const { id, status, location } = req.body;
      const updates = {};
      if (status) updates.status = status;
      if (location) updates.current_location = location;
      const { data, error } = await supabase.from('shipments').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return res.status(200).json(data);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}