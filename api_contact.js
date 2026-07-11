import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'POST') {
      const { name, email, phone, subject, message, inquiry_type } = req.body;
      const { data, error } = await supabase
        .from('contacts')
        .insert({ name, email, phone, subject, message, inquiry_type })
        .select()
        .single();
      if (error) throw error;
      return res.status(201).json({ success: true, message: 'Message sent successfully. We will get back to you soon!', data });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}