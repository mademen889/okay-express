import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, Clock, CheckCircle, MessageSquare, Loader } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', inquiry_type: 'General', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
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
              <MessageSquare size={16} /> Contact Us
            </span>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6">
              Get In <span className="text-gold">Touch</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mx-auto">
              Have a question or need a custom solution? Our team is here to help 24/7.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
              <div className="premium-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-1">Headquarters</h4>
                    <p className="text-gray-600 text-sm">1250 Global Logistics Boulevard<br />Suite 500, New York, NY 10001<br />United States</p>
                  </div>
                </div>
              </div>
              
              <div className="premium-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-1">Phone</h4>
                    <p className="text-gray-600 text-sm">+1 (800) OEI-SHIP (634-7447)</p>
                    <p className="text-gray-600 text-sm">+1 (212) 555-0100</p>
                  </div>
                </div>
              </div>
              
              <div className="premium-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-1">Email</h4>
                    <p className="text-gray-600 text-sm">info@okayexpressinternational.com</p>
                    <p className="text-gray-600 text-sm">support@okayexpressinternational.com</p>
                  </div>
                </div>
              </div>
              
              <div className="premium-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={24} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-1">Business Hours</h4>
                    <p className="text-gray-600 text-sm">Monday – Friday: 8:00 AM – 8:00 PM EST</p>
                    <p className="text-gray-600 text-sm">Saturday: 9:00 AM – 5:00 PM EST</p>
                    <p className="text-gray-600 text-sm">Sunday: Emergency support only</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
              <div className="premium-card p-8 md:p-10">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="font-poppins font-semibold text-xl text-navy mb-6">Send Us a Message</h3>
                    
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder="John Doe" className="input-premium" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <input type="email" required value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} placeholder="john@company.com" className="input-premium" />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input type="tel" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} placeholder="+1 (555) 000-0000" className="input-premium" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Inquiry Type</label>
                        <select value={formData.inquiry_type} onChange={(e) => setFormData(prev => ({ ...prev, inquiry_type: e.target.value }))} className="select-premium">
                          <option value="General">General Inquiry</option>
                          <option value="Sales">Sales & Pricing</option>
                          <option value="Support">Customer Support</option>
                          <option value="Partnership">Partnership</option>
                          <option value="Press">Media & Press</option>
                          <option value="Careers">Careers</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                      <input type="text" required value={formData.subject} onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))} placeholder="How can we help?" className="input-premium" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                      <textarea required rows={6} value={formData.message} onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))} placeholder="Tell us about your needs..." className="input-premium resize-none" />
                    </div>
                    
                    <button type="submit" disabled={loading} className="btn-navy !py-4 !px-10 !text-base">
                      {loading ? (
                        <><Loader size={20} className="animate-spin" /> Sending...</>
                      ) : (
                        <><Send size={20} /> Send Message</>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} className="text-green-600" />
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-navy mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">Thank you for reaching out. Our team will respond within 24 hours.</p>
                    <button onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', subject: '', inquiry_type: 'General', message: '' }); }} className="text-gold font-medium hover:underline">
                      Send another message
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-100">
        <div className="container-custom py-0">
          <div className="rounded-t-3xl overflow-hidden h-[400px] bg-gradient-to-br from-navy/5 to-gold/5 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="text-gold mx-auto mb-4" />
              <p className="text-navy font-semibold text-lg">1250 Global Logistics Boulevard, New York, NY 10001</p>
              <p className="text-gray-500 mt-2">Interactive map would be displayed here</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}