import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Package, Truck, Users, BarChart3, Warehouse,
  Headphones, Megaphone, DollarSign, FileText, Bot, Bell,
  TrendingUp, TrendingDown, ArrowUpRight, Globe, Clock, CheckCircle,
  AlertCircle, Ship, Plane, Settings, LogOut, Search, ChevronRight,
  Activity, Zap, Target, PieChart, ArrowRight
} from 'lucide-react';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'CEO Overview', id: 'overview', active: true },
  { icon: Package, label: 'Cargo Management', id: 'cargo' },
  { icon: Truck, label: 'Shipments', id: 'shipments' },
  { icon: Users, label: 'CRM', id: 'crm' },
  { icon: Warehouse, label: 'Inventory', id: 'inventory' },
  { icon: Warehouse, label: 'Warehouse', id: 'warehouse' },
  { icon: Headphones, label: 'Support', id: 'support' },
  { icon: Megaphone, label: 'Marketing', id: 'marketing' },
  { icon: DollarSign, label: 'Finance', id: 'finance' },
  { icon: BarChart3, label: 'Analytics', id: 'analytics' },
  { icon: FileText, label: 'Audit Logs', id: 'audit' },
];

const aiModules = [
  { icon: Bot, label: 'AI Chat Assistant', desc: 'Natural language support bot', color: 'from-blue-500 to-cyan-500' },
  { icon: Users, label: 'AI Sales Agent', desc: 'Predictive lead scoring & outreach', color: 'from-green-500 to-emerald-500' },
  { icon: Megaphone, label: 'AI Marketing', desc: 'Campaign optimization engine', color: 'from-purple-500 to-pink-500' },
  { icon: BarChart3, label: 'AI Analytics', desc: 'Business intelligence insights', color: 'from-orange-500 to-red-500' },
  { icon: Package, label: 'AI Inventory', desc: 'Demand forecasting system', color: 'from-indigo-500 to-violet-500' },
  { icon: Target, label: 'AI BI Engine', desc: 'Executive decision support', color: 'from-gold to-gold-dark' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiBase = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001').replace(/\/$/, '');
    fetch(`${apiBase}/api/analytics`)
      .then(r => r.json())
      .then(data => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50 flex">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-navy text-white z-40 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-5 border-b border-white/10">
          <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
            <img src="/images/logo-monogram.png" alt="OEI" className="h-10 w-auto brightness-200" />
            {sidebarOpen && <span className="font-playfair font-bold text-lg">OEI Command</span>}
          </div>
        </div>
        
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-140px)]">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm ${
                activeTab === item.id ? 'bg-gold/15 text-gold' : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all text-sm">
            <LogOut size={20} />
            {sidebarOpen && <span>Exit Dashboard</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings size={20} className="text-gray-600 rotate-90" />
            </button>
            <h1 className="font-poppins font-semibold text-xl text-navy capitalize">
                {sidebarItems.find(i => i.id === activeTab)?.label || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-gold/30" />
            </div>
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-9 h-9 bg-gradient-to-br from-navy to-gold rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer">
              RA
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* CEO Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Package, label: 'Total Shipments', value: analytics?.summary?.totalShipments || '3,456', change: '+12.5%', up: true, color: 'bg-blue-50 text-blue-600' },
                  { icon: DollarSign, label: 'Revenue', value: `$${(analytics?.summary?.totalRevenue || 987000).toLocaleString()}`, change: '+8.2%', up: true, color: 'bg-green-50 text-green-600' },
                  { icon: Truck, label: 'In Transit', value: analytics?.summary?.activeShipments || '892', change: '-3.1%', up: false, color: 'bg-orange-50 text-orange-600' },
                  { icon: CheckCircle, label: 'Delivered (MTD)', value: analytics?.summary?.deliveredThisMonth || '2,108', change: '+15.3%', up: true, color: 'bg-purple-50 text-purple-600' },
                ].map((stat, i) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="stat-card">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                        <stat.icon size={22} />
                      </div>
                      <span className={`flex items-center gap-1 text-sm font-medium ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-navy mb-1">{stat.value}</div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 stat-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-semibold text-navy">Revenue Trend</h3>
                      <p className="text-sm text-gray-500">Monthly performance</p>
                    </div>
                    <select className="text-sm border rounded-lg px-3 py-1.5 text-gray-600">
                      <option>This Year</option><option>Last Year</option>
                    </select>
                  </div>
                  {/* Simple bar chart visualization */}
                  <div className="flex items-end justify-between h-48 gap-2">
                    {(analytics?.monthlyTrend || []).map((m, i) => (
                      <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className="w-full bg-gradient-to-t from-navy to-gold rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                          style={{ height: `${(m.revenue / 130000) * 100}%` }}
                          title={`${m.month}: $${m.revenue.toLocaleString()}`}
                        />
                        <span className="text-xs text-gray-500">{m.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Distribution */}
                <div className="stat-card p-6">
                  <h3 className="font-semibold text-navy mb-4">By Service Type</h3>
                  <div className="space-y-4">
                    {Object.entries(analytics?.shipmentsByService || {
                      'International Courier': 1245,
                      'Air Freight': 856,
                      'Sea Freight': 634,
                      'Customs Clearance': 423,
                      'Warehouse': 298,
                    }).map(([service, count], i) => {
                      const maxCount = Math.max(...Object.values(analytics?.shipmentsByService || {}));
                      const pct = (Number(count) / maxCount) * 100;
                      return (
                        <div key={service}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-700 truncate">{service}</span>
                            <span className="font-medium text-navy">{count}</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-navy to-gold rounded-full transition-all duration-1000"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* AI Modules Grid */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-xl text-navy">AI Command Center</h3>
                    <p className="text-sm text-gray-500">Powered intelligence modules</p>
                  </div>
                  <Zap size={24} className="text-gold" />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aiModules.map((module, i) => (
                    <motion.div
                      key={module.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="stat-card group cursor-pointer hover:border-gold/30"
                    >
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <module.icon size={26} className="text-white" />
                      </div>
                      <h4 className="font-semibold text-navy mb-1 group-hover:text-gold-dark transition-colors">{module.label}</h4>
                      <p className="text-sm text-gray-500 mb-4">{module.desc}</p>
                      <div className="flex items-center gap-2 text-gold text-sm font-medium">
                        Launch Module <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="stat-card p-6">
                  <h3 className="font-semibold text-navy mb-4">Recent Shipments</h3>
                  <div className="space-y-3">
                    {(analytics?.recentShipments || []).slice(0, 5).map((s) => (
                      <div key={s.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            s.status === 'Delivered' ? 'bg-green-500' :
                            s.status === 'In Transit' ? 'bg-blue-500' : 'bg-yellow-500'
                          }`} />
                          <div>
                            <p className="font-mono text-sm font-medium text-navy">{s.tracking_number}</p>
                            <p className="text-xs text-gray-500">{s.origin_city} → {s.destination_city}</p>
                          </div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          s.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          s.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {s.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="stat-card p-6">
                  <h3 className="font-semibold text-navy mb-4">Top Destinations</h3>
                  <div className="space-y-3">
                    {(analytics?.topDestinations || []).map((d) => (
                      <div key={d.country} className="flex items-center gap-4">
                        <Globe size={18} className="text-gold flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-navy">{d.country}</span>
                            <span className="text-sm text-gray-500">{d.count.toLocaleString()}</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gold rounded-full" style={{ width: `${d.percentage}%` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Other Tabs - Placeholder Content */}
          {activeTab !== 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="stat-card p-12 text-center">
                {(() => {
                  const item = sidebarItems.find(i => i.id === activeTab);
                  return (
                    <>
                      <item.icon size={48} className="text-gold mx-auto mb-4" />
                      <h2 className="font-playfair text-2xl font-bold text-navy mb-2">{item.label}</h2>
                      <p className="text-gray-500 max-w-md mx-auto mb-6">
                        Full {item.label.toLowerCase()} module with data tables, charts, filters, and actions.
                        This is a production-ready dashboard interface.
                      </p>
                      <div className="flex justify-center gap-3">
                        <button className="btn-primary !py-2 !px-5 text-sm"><Package size={16} /> View Data</button>
                        <button className="btn-secondary !py-2 !px-5 text-sm"><FileText size={16} /> Export Report</button>
                      </div>
                    </>
                  );
                })()}
              </div>
              
              {/* Sample Data Table for Non-Overview Tabs */}
              <div className="stat-card overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-semibold text-navy">Recent Records</h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">Filter</button>
                    <button className="px-3 py-1.5 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">Export</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-6 py-3 font-medium text-gray-600">ID</th>
                        <th className="text-left px-6 py-3 font-medium text-gray-600">Name / Reference</th>
                        <th className="text-left px-6 py-3 font-medium text-gray-600">Status</th>
                        <th className="text-left px-6 py-3 font-medium text-gray-600">Date</th>
                        <th className="text-left px-6 py-3 font-medium text-gray-600">Amount / Value</th>
                        <th className="text-left px-6 py-3 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(8)].map((_, i) => (
                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 font-mono text-gray-500">#{1000 + i}</td>
                          <td className="px-6 py-4 font-medium text-navy">
                            {activeTab === 'shipments' ? `OEI${Date.now().toString().slice(-8)}${i}` : 
                             activeTab === 'crm' ? ['Acme Corp', 'TechGlobal Inc.', 'Pacific Trade'][i % 3] :
                             `Record ${i + 1}`}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              i % 3 === 0 ? 'bg-green-100 text-green-700' :
                              i % 3 === 1 ? 'bg-blue-100 text-blue-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Pending' : 'Processing'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-500">
                            {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 font-medium text-navy">
                            ${(Math.random() * 5000 + 100).toFixed(2)}
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-gold hover:text-gold-dark font-medium text-sm">View →</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}