import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Clock, CheckCircle, ArrowRight, Send, Loader } from 'lucide-react';

const serviceTypes = [
  'International Courier',
  'Air Freight',
  'Sea Freight',
  'Customs Clearance',
  'Warehouse Storage',
];

const urgencyLevels = [
  { value: 'Standard', desc: '5-10 business days', priceMult: 1 },
  { value: 'Express', desc: '2-5 business days', priceMult: 1.8 },
  { value: 'Same Day', desc: 'Same day delivery*', priceMult: 3 },
];

export default function Quote() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service_type: '', origin: '', destination: '', weight: '', dimensions: '', urgency: 'Standard',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResult(data);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy" />
        <div className="relative container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wider mb-4">
              <Calculator size={16} /> Instant Quote
            </span>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6">
              Get Your <span className="text-gold">Free Quote</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mx-auto">
              Receive an instant shipping estimate. Fill in your details below for accurate pricing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="section-padding -mt-4">
        <div className="container-custom max-w-5xl">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-3">
              <div className="premium-card p-8 md:p-10">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="font-poppins font-semibold text-xl text-navy mb-6">Shipment Details</h3>
                    
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input type="text" required value={formData.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="John Doe" className="input-premium" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <input type="email" required value={formData.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="john@company.com" className="input-premium" />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="+1 (555) 000-0000" className="input-premium" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Service Type *</label>
                        <select required value={formData.service_type} onChange={(e) => handleChange('service_type', e.target.value)} className="select-premium">
                          <option value="">Select service...</option>
                          {serviceTypes.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Origin City *</label>
                        <input type="text" required value={formData.origin} onChange={(e) => handleChange('origin', e.target.value)} placeholder="Dubai, UAE" className="input-premium" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Destination City *</label>
                        <input type="text" required value={formData.destination} onChange={(e) => handleChange('destination', e.target.value)} placeholder="New York, USA" className="input-premium" />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg) *</label>
                        <input type="number" required min="0.1" step="0.1" value={formData.weight} onChange={(e) => handleChange('weight', e.target.value)} placeholder="5.0" className="input-premium" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions (cm)</label>
                        <input type="text" value={formData.dimensions} onChange={(e) => handleChange('dimensions', e.target.value)} placeholder="30x20x15" className="input-premium" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Urgency</label>
                        <select value={formData.urgency} onChange={(e) => handleChange('urgency', e.target.value)} className="select-premium">
                          {urgencyLevels.map(u => <option key={u.value} value={u.value}>{u.value} ({u.desc})</option>)}
                        </select>
                      </div>
                    </div>
                    
                    <button type="submit" disabled={loading} className="btn-navy w-full !py-4 !text-base justify-center">
                      {loading ? (
                        <><Loader size={20} className="animate-spin" /> Calculating...</>
                      ) : (
                        <><Calculator size={20} /> Get Instant Quote</>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} className="text-green-600" />
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-navy mb-2">Quote Generated!</h3>
                    <p className="text-gray-600 mb-8">Your instant shipping estimate is ready.</p>
                    <button onClick={() => { setSubmitted(false); setResult(null); }} className="text-gold font-medium hover:underline">
                      Calculate another quote →
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Result Panel */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
              <div className="premium-card p-8 bg-gradient-to-br from-navy to-navy-light text-white sticky top-28 h-fit">
                <h3 className="font-poppins font-semibold text-xl text-gold mb-6">Your Quote</h3>
                
                {result ? (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="text-center mb-8">
                      <p className="text-white/60 text-sm mb-2">Estimated Cost</p>
                      <p className="font-playfair text-5xl font-bold text-gold">
                        ${typeof result.estimated_cost === 'number' ? result.estimated_cost.toLocaleString('en-US', { minimumFractionDigits: 2 }) : result.estimated_cost}
                      </p>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between py-3 border-b border-white/10">
                        <span className="text-white/60">Service Type</span>
                        <span className="font-medium">{result.service_type}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-white/10">
                        <span className="text-white/60">Route</span>
                        <span className="font-medium text-right text-sm">{result.origin} → {result.destination}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-white/10">
                        <span className="text-white/60">Weight</span>
                        <span className="font-medium">{result.weight} kg</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-white/10">
                        <span className="text-white/60">Urgency</span>
                        <span className="font-medium">{result.urgency}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-white/10">
                        <span className="text-white/60">Transit Time</span>
                        <span className="font-medium text-gold">{result.transit_days || '3-7 days'}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <a href={`mailto:info@okayexpressinternational.com?subject=Quote Inquiry - ${result.id || ''}`} className="btn-primary w-full justify-center">
                        <Send size={18} /> Confirm Booking
                      </a>
                      <a href="tel:+1234567890" className="btn-secondary w-full justify-center">
                        Call to Discuss
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center py-12">
                    <DollarSign size={48} className="text-white/20 mx-auto mb-4" />
                    <p className="text-white/40">Complete the form to see your quote</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}