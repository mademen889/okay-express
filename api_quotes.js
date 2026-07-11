import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase.from('quotes').select('*').order('created_at', { ascending: false }).limit(50);
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const { name, email, phone, service_type, origin, destination, weight, dimensions, urgency } = req.body;
      
      // Calculate quote based on service type and weight
      const baseRates = { 'International Courier': 45, 'Air Freight': 120, 'Sea Freight': 35, 'Customs Clearance': 200, 'Warehouse': 15 };
      const baseRate = baseRates[service_type] || 50;
      const weightCost = (parseFloat(weight) || 1) * baseRate;
      const urgencyMultiplier = urgency === 'Express' ? 2 : urgency === 'Same Day' ? 3 : 1;
      const estimated_cost = Math.round(weightCost * urgencyMultiplier * 100) / 100;
      
      const transitDays = service_type === 'Air Freight' ? '2-5 days' : service_type === 'Sea Freight' ? '15-30 days' : service_type === 'International Courier' ? '3-7 days' : '5-10 days';

      const { data, error } = await supabase
        .from('quotes')
        .insert({ name, email, phone, service_type, origin, destination, weight, dimensions, urgency, estimated_cost, transit_days: transitDays })
        .select()
        .single();
      if (error) throw error;
      
      return res.status(201).json({ ...data, estimated_cost, transit_days: transitDays });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}