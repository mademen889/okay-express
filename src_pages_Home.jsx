import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Globe, Plane, Ship, Truck, Warehouse, FileText, ArrowRight, Star,
  Package, MapPin, Clock, Shield, Zap, Users, Award, TrendingUp,
  Search, CheckCircle, Play, ChevronRight, Phone, Mail
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } }),
};

const services = [
  { icon: Globe, title: 'International Courier', desc: 'Express delivery to 220+ countries with real-time tracking', color: 'from-blue-500 to-blue-600', path: '/services/international-courier' },
  { icon: Plane, title: 'Air Freight', desc: 'Fast air cargo solutions for time-sensitive shipments', color: 'from-sky-500 to-sky-600', path: '/services/air-freight' },
  { icon: Ship, title: 'Sea Freight', desc: 'Cost-effective ocean freight for large-volume cargo', color: 'from-indigo-500 to-indigo-600', path: '/services/sea-freight' },
  { icon: FileText, title: 'Customs Clearance', desc: 'Expert customs brokerage and documentation services', color: 'from-violet-500 to-violet-600', path: '/services/customs-clearance' },
  { icon: Warehouse, title: 'Warehouse', desc: 'Secure warehousing and fulfillment solutions globally', color: 'from-purple-500 to-purple-600', path: '/services/warehouse' },
  { icon: Truck, title: 'E-commerce', desc: 'End-to-end e-commerce logistics and last-mile delivery', color: 'from-pink-500 to-pink-600', path: '/services' },
];

const stats = [
  { icon: Globe, value: '220+', label: 'Countries Served', suffix: '' },
  { icon: Package, value: '15M+', label: 'Shipments Delivered', suffix: '' },
  { icon: Users, value: '50K+', label: 'Happy Clients', suffix: '' },
  { icon: Award, value: '99.8%', label: 'On-Time Delivery', suffix: '' },
];

const testimonials = [
  { name: 'Sarah Mitchell', company: 'TechGlobal Inc.', role: 'Supply Chain Director', rating: 5, review: "Okay Express has transformed our international shipping operations. Their real-time tracking and dedicated account management are exceptional.", avatar: 'SM' },
  { name: 'James Chen', company: 'Pacific Trade Co.', role: 'CEO', rating: 5, review: "The air freight team delivered our urgent shipment from Shanghai to New York in just 48 hours. Unbelievable service!", avatar: 'JC' },
  { name: 'Amira Hassan', company: 'Luxury Brands Ltd.', role: 'Operations Manager', rating: 5, review: "Their customs clearance expertise saved us thousands in duties and prevented costly delays. Truly a premium logistics partner.", avatar: 'AH' },
];

const partners = ['DHL', 'FedEx', 'UPS', 'Maersk', 'Emirates', 'CMA CGM', 'Hapag-Lloyd', 'DB Schenker'];

export default function Home() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackResult, setTrackResult] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [testimonialsData, setTestimonialsData] = useState([]);

  useEffect(() => {
    fetch('/api/testimonials').then(r => r.json()).then(setTestimonialsData).catch(() => {});
  }, []);

  const displayTestimonials = testimonialsData.length > 0 ? testimonialsData : testimonials;

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    setIsTracking(true);
    try {
      const res = await fetch(`/api/shipments?tracking_number=${encodeURIComponent(trackingNumber)}`);
      const data = await res.json();
      setTrackResult(data.length > 0 ? data[0] : null);
    } catch {
      setTrackResult(null);
    } finally {
      setIsTracking(false);
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src="/images/hero-bg.jpg" 
            alt="Global Logistics" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white/5 rounded-full" />
        </div>

        <div className="relative container-custom pt-32 pb-20">
          <div className="max-w-4xl">
            <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-5 py-2 mb-8">
                <Globe size={16} className="text-gold" />
                <span className="text-gold font-medium text-sm">Trusted by 50,000+ Businesses Worldwide</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="font-playfair text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                Worldwide Courier &{' '}
                <span className="text-gradient-gold">Logistics</span>{' '}
                Services
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl text-white/80 max-w-2xl mb-10 leading-relaxed">
                Delivering excellence across continents. Premium international courier, air freight, sea freight, 
                and supply chain solutions powered by cutting-edge technology.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-16">
                <Link to="/quote" className="btn-primary text-lg !py-4 !px-8">
                  Get Instant Quote
                  <ArrowRight size={20} />
                </Link>
                <Link to="/services" className="btn-secondary text-lg !py-4 !px-8">
                  Explore Services
                </Link>
                <a href="#tracking" className="btn-secondary text-lg !py-4 !px-8">
                  Track Shipment
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Floating Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass rounded-2xl p-5 md:p-6 text-center group cursor-pointer"
              >
                <stat.icon size={28} className="text-gold mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-bold text-2xl md:text-3xl text-white mb-1">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Live Tracking Section */}
      <section id="tracking" className="relative -mt-20 z-10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="premium-card p-8 md:p-12 max-w-4xl mx-auto"
          >
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                    <Search size={24} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-2xl font-bold text-navy">Track Your Shipment</h3>
                    <p className="text-gray-500 text-sm">Real-time global tracking</p>
                  </div>
                </div>
                <form onSubmit={handleTrack} className="flex gap-3">
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracking number (e.g., OEI..."
                    className="flex-1 input-premium !text-base"
                  />
                  <button type="submit" disabled={isTracking} className="btn-navy !px-8 whitespace-nowrap">
                    {isTracking ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <><Search size={18} /> Track</>
                    )}
                  </button>
                </form>
                
                {/* Track Result */}
                {trackResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 p-5 bg-navy/5 rounded-xl border border-navy/10"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-sm text-navy font-medium">{trackResult.tracking_number}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        trackResult.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        trackResult.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {trackResult.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {trackResult.origin_city} → {trackResult.destination_city}, {trackResult.destination_country}
                    </p>
                  </motion.div>
                )}
                {trackResult === null && trackingNumber && !isTracking && (
                  <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100 text-red-600 text-sm">
                    No shipment found with this tracking number. Please check and try again.
                  </div>
                )}
              </div>
              
              <div className="lg:w-72 bg-gradient-to-br from-navy to-navy-light rounded-2xl p-6 text-white">
                <h4 className="font-semibold mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  {[
                    { label: 'New Shipment', icon: Package, link: '/quote' },
                    { label: 'View Rates', icon: TrendingUp, link: '/quote' },
                    { label: 'Schedule Pickup', icon: Clock, link: '/contact' },
                    { label: 'Get Support', icon: Phone, link: '/contact' },
                  ].map((action) => (
                    <Link key={action.label} to={action.link} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group">
                      <action.icon size={18} className="text-gold" />
                      <span className="text-sm group-hover:text-gold transition-colors">{action.label}</span>
                      <ChevronRight size={14} className="ml-auto text-white/40 group-hover:text-gold" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gray-50/50">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wider mb-4">
              <Zap size={16} /> Our Services
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-playfair text-4xl md:text-5xl font-bold text-navy mb-6">
              Comprehensive Logistics Solutions
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto text-lg">
              From express courier to complex supply chain management, we deliver end-to-end solutions 
              tailored to your business needs.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={fadeInUp}>
                <Link to={service.path} className="block premium-card p-8 h-full group">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon size={28} className="text-white" />
                  </div>
                  <h3 className="font-poppins font-semibold text-xl text-navy mb-3 group-hover:text-gold-dark transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{service.desc}</p>
                  <span className="inline-flex items-center gap-2 text-gold font-medium text-sm group-hover:gap-3 transition-all">
                    Learn More <ArrowRight size={16} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Global Coverage Map Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy" />
        <div className="absolute inset-0 opacity-10">
          <img src="/images/global-map.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        
        <div className="relative container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wider mb-4">
                <Globe size={16} /> Global Network
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
                Connecting <span className="text-gold">220+ Countries</span> & Territories
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Our extensive global network ensures your shipments reach every corner of the world. 
                With strategic partnerships and owned operations across six continents, we offer 
                unparalleled coverage and reliability.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { label: 'North America', count: '3,500+' },
                  { label: 'Europe', count: '5,200+' },
                  { label: 'Asia Pacific', count: '4,800+' },
                  { label: 'Middle East', count: '1,900+' },
                  { label: 'Africa', count: '1,200+' },
                  { label: 'South America', count: '1,500+' },
                ].map((region) => (
                  <div key={region.label} className="flex items-center gap-3">
                    <MapPin size={18} className="text-gold flex-shrink-0" />
                    <div>
                      <div className="text-white font-semibold">{region.count}</div>
                      <div className="text-white/50 text-sm">{region.label}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link to="/about" className="btn-primary">
                Explore Our Network <ArrowRight size={18} />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-3xl" />
                <img 
                  src="/images/global-map.jpg" 
                  alt="Global Network Map" 
                  className="rounded-3xl shadow-2xl w-full h-full object-cover opacity-80"
                />
                {/* Animated dots on map */}
                {[
                  { top: '25%', left: '20%' },
                  { top: '35%', left: '48%' },
                  { top: '45%', left: '75%' },
                  { top: '65%', left: '55%' },
                  { top: '55%', left: '25%' },
                  { top: '30%', left: '85%' },
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    style={{ top: pos.top, left: pos.left }}
                    className="absolute w-4 h-4 bg-gold rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gold/30 rounded-full animate-ping" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <img 
                src="/images/courier.jpg" 
                alt="Professional Delivery" 
                className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wider mb-4">
                <Shield size={16} /> Why Choose Us
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-navy mb-6">
                The OEI Advantage
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                We combine decades of logistics expertise with cutting-edge technology to deliver 
                unmatched service quality and operational excellence.
              </p>
              
              <div className="space-y-5">
                {[
                  { icon: Zap, title: 'Lightning-Fast Delivery', desc: 'Express options with guaranteed transit times' },
                  { icon: Shield, title: 'Full Insurance Coverage', desc: 'Comprehensive protection for every shipment' },
                  { icon: Clock, title: '24/7 Support', desc: 'Round-the-clock customer service in 30+ languages' },
                  { icon: TrendingUp, title: 'AI-Powered Operations', desc: 'Smart routing and predictive analytics' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                      <item.icon size={22} className="text-gold" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gray-50/50">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wider mb-4">
              <Star size={16} /> Testimonials
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-playfair text-4xl md:text-5xl font-bold text-navy mb-6">
              Trusted by Industry Leaders
            </motion.h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {displayTestimonials.slice(0, 3).map((t, i) => (
              <motion.div
                key={t.id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="premium-card p-8"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating || 5)].map((_, j) => (
                    <Star key={j} size={18} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 italic">"{t.review}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-navy to-gold rounded-full flex items-center justify-center text-white font-bold">
                    {t.avatar || t.name?.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-navy">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.company} • {t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners / Trust Badges */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container-custom">
          <p className="text-center text-gray-400 text-sm uppercase tracking-widest mb-8">Trusted By Leading Organizations</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
            {partners.map((partner) => (
              <div key={partner} className="text-2xl font-bold text-gray-400 hover:text-navy transition-colors cursor-pointer">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy-light to-navy" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to Ship <span className="text-gold">Worldwide?</span>
            </h2>
            <p className="text-white/70 text-xl max-w-2xl mx-auto mb-10">
              Join thousands of businesses that trust Okay Express International for their 
              global logistics needs. Get started today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/quote" className="btn-primary text-lg !py-4 !px-10">
                Get Free Quote <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="btn-secondary text-lg !py-4 !px-10">
                Contact Sales Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}