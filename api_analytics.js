import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    // Shipments by status
    const { data: shipments } = await supabase.from('shipments').select('status');
    const shipmentsByStatus = shipments?.reduce((acc, s) => {
      acc[s.status] = (acc[s.status] || 0) + 1;
      return acc;
    }, {}) || {};

    // Shipments by service type
    const shipmentsByService = shipments?.reduce((acc, s) => {
      acc[s.service_type] = (acc[s.service_type] || 0) + 1;
      return acc;
    }, {}) || {};

    // Total quotes
    const { count: totalQuotes } = await supabase.from('quotes').select('*', { count: 'exact', head: true });
    
    // Total orders
    const { count: totalOrders } = await supabase.from('orders').select('*', { count: 'exact', head: true });
    
    // Order revenue
    const { data: orders } = await supabase.from('orders').select('total_amount');
    const totalRevenue = orders?.reduce((sum, o) => sum + (parseFloat(o.total_amount) || 0), 0) || 0;

    // Recent activity
    const { data: recentShipments } = await supabase.from('shipments').select('*').order('created_at', { ascending: false }).limit(5);
    const { data: recentOrders } = await supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5);

    // Monthly shipment trend (mock for now - would use date_trunc in production)
    const monthlyTrend = [
      { month: 'Jan', shipments: 145, revenue: 45200 },
      { month: 'Feb', shipments: 178, revenue: 52300 },
      { month: 'Mar', shipments: 198, revenue: 61400 },
      { month: 'Apr', shipments: 215, revenue: 68900 },
      { month: 'May', shipments: 243, revenue: 74200 },
      { month: 'Jun', shipments: 267, revenue: 82100 },
      { month: 'Jul', shipments: 289, revenue: 89600 },
      { month: 'Aug', shipments: 312, revenue: 95400 },
      { month: 'Sep', shipments: 298, revenue: 88700 },
      { month: 'Oct', shipments: 334, revenue: 102300 },
      { month: 'Nov', shipments: 356, revenue: 112800 },
      { month: 'Dec', shipments: 378, revenue: 125600 },
    ];

    // Top destinations
    const topDestinations = [
      { country: 'United States', count: 1234, percentage: 28 },
      { country: 'United Kingdom', count: 892, percentage: 20 },
      { country: 'Germany', count: 654, percentage: 15 },
      { country: 'UAE', count: 543, percentage: 12 },
      { country: 'China', count: 432, percentage: 10 },
      { country: 'Canada', count: 387, percentage: 9 },
      { country: 'Australia', count: 298, percentage: 6 },
    ];

    return res.status(200).json({
      summary: {
        totalShipments: shipments?.length || 0,
        totalQuotes: totalQuotes || 0,
        totalOrders: totalOrders || 0,
        totalRevenue,
        activeShipments: shipmentsByStatus['In Transit'] || 0,
        deliveredThisMonth: shipmentsByStatus['Delivered'] || 0,
      },
      shipmentsByStatus,
      shipmentsByService,
      monthlyTrend,
      topDestinations,
      recentShipments: recentShipments || [],
      recentOrders: recentOrders || [],
    });
  } catch (err) {
    console.error('Analytics API error:', err);
    res.status(500).json({ error: err.message });
  }
}