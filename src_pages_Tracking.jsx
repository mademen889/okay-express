import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, Clock, MapPin, CheckCircle, Truck, Plane, Ship, Home } from 'lucide-react';

const statusFlow = {
  'Processing': 1,
  'Picked Up': 2,
  'In Transit': 3,
  'Customs': 4,
  'Out for Delivery': 5,
  'Delivered': 6,
};

const statusIcons = {
  'Processing': Package,
  'Picked Up': Truck,
  'In Transit': Plane,
  'Customs': Ship,
  'Out for Delivery': Truck,
  'Delivered': Home,
};

const mockTrackingEvents = [
  { status: 'Delivered', location: 'New York, NY, USA', date: '2024-01-15 09:32 AM', desc: 'Package delivered - Signed by R. Mitchell' },
  { status: 'Out for Delivery', location: 'New York, NY, USA', date: '2024-01-15 07:15 AM', desc: 'Package out for delivery' },
  { status: 'Customs', location: 'JFK Airport, USA', date: '2024-01-14 06:45 PM', desc: 'Customs clearance completed' },
  { status: 'In Transit', location: 'London Heathrow, UK', date: '2024-01-13 02:20 PM', desc: 'Departed facility' },
  { status: 'In Transit', location: 'Frankfurt, Germany', date: '2024-01-12 11:00 PM', desc: 'Arrived at hub' },
  { status: 'Picked Up', location: 'Dubai, UAE', date: '2024-01-11 03:45 PM', desc: 'Package picked up from sender' },
  { status: 'Processing', location: 'Dubai, UAE', date: '2024-01-11 02:00 PM', desc: 'Shipment created and processed' },
];

export default function Tracking() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    setLoading(true);
    setSearched(true);
    
    try {
      const apiBase = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001').replace(/\/$/, '');
      const res = await fetch(`${apiBase}/api/shipments?tracking_number=${encodeURIComponent(trackingNumber)}`);
      const data = await res.json();
      
      if (data.length > 0) {
        const shipment = data[0];
        setResult({
          ...shipment,
          events: mockTrackingEvents.filter((_, i) => i <= Object.keys(statusFlow).indexOf(shipment.status)),
        });
      } else {
        // Demo result for testing
        setResult({
          tracking_number: trackingNumber,
          status: 'In Transit',
          origin_city: 'Dubai',
          destination_city: 'New York',
          destination_country: 'USA',
          service_type: 'International Courier',
          estimated_delivery: '2024-01-16',
          events: mockTrackingEvents.slice(0, 5),
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currentStep = result ? statusFlow[result.status] || 1 : 0;

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy" />
        <div className="relative container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wider mb-4">
              <Search size={16} /> Shipment Tracking
            </span>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6">
              Track Your <span className="text-gold">Shipment</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mx-auto">
              Real-time tracking for all your shipments. Enter your tracking number below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="-mt-10 relative z-10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="premium-card p-8 md:p-12 max-w-3xl mx-auto"
          >
            <form onSubmit={handleTrack} className="flex gap-4">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number (e.g., OEI1234567890)"
                  className="input-premium !pl-12 !text-lg !py-4"
                />
              </div>
              <button type="submit" disabled={loading} className="btn-navy !px-10 !text-base">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Track Shipment</>
                )}
              </button>
            </form>
            
            <p className="text-center text-gray-500 text-sm mt-4">
              Try demo: <button onClick={() => setTrackingNumber('OEI' + Date.now().toString().slice(-10))} className="text-gold hover:underline font-medium">OEI1234567890</button>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      {result && (
        <section className="section-padding">
          <div className="container-custom max-w-4xl mx-auto">
            {/* Shipment Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="premium-card p-8 mb-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Tracking Number</p>
                  <p className="font-mono text-xl font-bold text-navy">{result.tracking_number}</p>
                </div>
                <div className={`px-5 py-2.5 rounded-full text-sm font-semibold ${
                  result.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                  result.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {result.status}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Origin</p>
                  <p className="font-semibold text-navy">{result.origin_city || 'Dubai'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Destination</p>
                  <p className="font-semibold text-navy">{result.destination_city || 'New York'}, {result.destination_country || 'USA'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Service</p>
                  <p className="font-semibold text-navy">{result.service_type || 'International Courier'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Est. Delivery</p>
                  <p className="font-semibold text-navy">{result.estimated_delivery || 'Jan 16, 2024'}</p>
                </div>
              </div>
            </motion.div>

            {/* Progress Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="premium-card p-8 mb-8"
            >
              <h3 className="font-poppins font-semibold text-lg text-navy mb-6">Shipment Progress</h3>
              <div className="relative">
                {Object.entries(statusFlow).map(([status, step], i) => {
                  const Icon = statusIcons[status];
                  const isActive = step <= currentStep;
                  const isCurrent = step === currentStep;
                  
                  return (
                    <div key={status} className="flex items-start gap-4 mb-6 last:mb-0">
                      <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isActive ? 'bg-gradient-to-br from-navy to-gold' : 'bg-gray-200'
                      }`}>
                        <Icon size={18} className={isActive ? 'text-white' : 'text-gray-400'} />
                        {isCurrent && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full animate-pulse" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className={`font-semibold ${isActive ? 'text-navy' : 'text-gray-400'}`}>{status}</div>
                        {isActive && (
                          <div className="text-sm text-gray-500 mt-1">
                            {result.events?.find(e => e.status === status)?.desc || 'Completed'}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Timeline Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="premium-card p-8"
            >
              <h3 className="font-poppins font-semibold text-lg text-navy mb-6">Tracking History</h3>
              <div className="space-y-0">
                {(result.events || mockTrackingEvents).map((event, i) => {
                  const Icon = statusIcons[event.status] || Package;
                  return (
                    <div key={i} className="flex gap-4 pb-6 last:pb-0 relative">
                      {i < (result.events?.length || mockTrackingEvents.length) - 1 && (
                        <div className="absolute left-5 top-10 w-0.5 h-[calc(100%-16px)] bg-gray-200" />
                      )}
                      <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center flex-shrink-0 relative z-10">
                        <Icon size={16} className="text-navy" />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-semibold text-navy text-sm">{event.desc}</p>
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                              <MapPin size={13} /> {event.location}
                            </p>
                          </div>
                          <div className="text-sm text-gray-400 whitespace-nowrap flex items-center gap-1">
                            <Clock size={13} /> {event.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}