import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, Shield, Phone, Calculator, FileText } from 'lucide-react';

const serviceDetails = {
  'international-courier': {
    title: 'International Courier',
    subtitle: 'Express Door-to-Door Delivery Worldwide',
    description: 'Our International Courier service offers fast, reliable, and secure door-to-door delivery to over 220 countries and territories. Whether it\'s documents, parcels, or freight, we ensure your shipment arrives safely and on time.',
    icon: '🌐',
    color: 'from-blue-500 to-blue-600',
    image: '/images/courier.jpg',
    features: [
      { title: 'Express Delivery', desc: 'Next-day and same-day options available to major cities worldwide' },
      { title: 'Real-Time Tracking', desc: 'GPS-enabled tracking with live updates via web, app, or SMS' },
      { title: 'Full Insurance', desc: 'Comprehensive coverage up to $100,000 per shipment' },
      { title: 'Customs Handling', desc: 'Complete customs documentation and duty management included' },
      { title: 'Proof of Delivery', desc: 'Digital POD with signature and timestamp verification' },
      { title: 'Flexible Options', desc: 'Economy, Standard, Express, and Same-Day service tiers' },
    ],
    stats: [
      { label: 'Countries Covered', value: '220+' },
      { label: 'Average Transit Time', value: '2-5 Days' },
      { label: 'On-Time Rate', value: '99.8%' },
      { label: 'Max Weight', value: '70 kg' },
    ],
    process: ['Book Online or Call', 'Pickup Scheduled', 'Package Collected', 'In Transit', 'Customs Cleared', 'Out for Delivery', 'Delivered'],
  },
  'air-freight': {
    title: 'Air Freight',
    subtitle: 'Fast Air Cargo Solutions Globally',
    description: 'When speed matters, our Air Freight service delivers. With direct access to 180+ commercial airports worldwide and partnerships with major airlines, we offer the fastest cargo transportation for time-sensitive shipments.',
    icon: '✈️',
    color: 'from-sky-500 to-sky-600',
    image: '/images/airfreight.jpg',
    features: [
      { title: 'Direct Flights', desc: 'Non-stop cargo flights to 180+ destinations' },
      { title: 'Temperature Control', desc: 'Cold chain solutions for pharmaceuticals and perishables' },
      { title: 'Dangerous Goods', desc: 'IATA certified for hazardous materials transport' },
      { title: 'Charter Services', desc: 'Full and part-charter aircraft for oversized cargo' },
      { title: 'Priority Handling', desc: 'Dedicated staff and expedited processing' },
      { title: 'Consolidation', desc: 'Cost-effective consolidation for smaller shipments' },
    ],
    stats: [
      { label: 'Airports Served', value: '180+' },
      { label: 'Average Transit Time', value: '1-3 Days' },
      { label: 'Weekly Flights', value: '2,500+' },
      { label: 'Max Cargo Weight', value: 'Unlimited' },
    ],
    process: ['Booking & Documentation', 'Cargo Received', 'Security Screening', 'Loaded on Aircraft', 'In Flight', 'Arrival Processing', 'Final Delivery'],
  },
  'sea-freight': {
    title: 'Sea Freight',
    subtitle: 'Cost-Effective Ocean Shipping Solutions',
    description: 'Our Sea Freight service provides economical shipping solutions for large-volume cargo. With FCL (Full Container Load), LCL (Less than Container Load), and specialized equipment options, we handle shipments of any size.',
    icon: '🚢',
    color: 'from-indigo-500 to-indigo-600',
    image: '/images/shipping.jpg',
    features: [
      { title: 'FCL & LCL', desc: 'Full container and consolidated shipping options' },
      { title: 'Door-to-Door', desc: 'Complete inland transportation included' },
      { title: 'Reefer Containers', desc: 'Temperature-controlled containers for perishables' },
      { title: 'Project Cargo', desc: 'Specialized handling for oversized and heavy-lift cargo' },
      { title: 'Major Trade Routes', desc: 'Competitive rates on Trans-Pacific, Trans-Atlantic, and more' },
      { title: 'Documentation', desc: 'Bill of lading, customs docs, and insurance handled' },
    ],
    stats: [
      { label: 'Ports Served', value: '500+' },
      { label: 'Average Transit Time', value: '15-30 Days' },
      { label: 'Container Types', value: '20+' },
      { label: 'Annual Volume', value: '2M TEU' },
    ],
    process: ['Quote & Booking', 'Cargo Preparation', 'Container Stuffing', 'Port Loading', 'Ocean Transit', 'Port Discharge', 'Delivery'],
  },
  'customs-clearance': {
    title: 'Customs Clearance',
    subtitle: 'Expert Customs Brokerage Services',
    description: 'Navigate complex international trade regulations with confidence. Our licensed customs brokers handle all documentation, tariff classifications, duty payments, and compliance requirements to ensure smooth clearance at every border.',
    icon: '📋',
    color: 'from-violet-500 to-violet-600',
    image: '/images/shipping.jpg',
    features: [
      { title: 'Licensed Brokers', desc: 'Certified customs brokers in 50+ countries' },
      { title: 'Duty Optimization', desc: 'Strategic classification to minimize duties legally' },
      { title: 'Compliance Guarantee', desc: '100% regulatory compliance assurance' },
      { title: 'Documentation', desc: 'Complete paperwork preparation and filing' },
      { title: 'Tariff Consultation', desc: 'Expert advice on HS codes and trade agreements' },
      { title: 'Bond Management', desc: 'Customs bond setup and administration' },
    ],
    stats: [
      { label: 'Countries Covered', value: '50+' },
      { label: 'Clearance Rate', value: '99.9%' },
      { label: 'Avg. Processing', value: '< 24 Hours' },
      { label: 'Duty Savings', value: '$50M+/Year' },
    ],
    process: ['Document Collection', 'Classification', 'Duty Calculation', 'Filing', 'Payment', 'Release', 'Delivery'],
  },
  'warehouse': {
    title: 'Warehouse Services',
    subtitle: 'Secure Storage & Fulfillment Solutions',
    description: 'Our state-of-the-art warehouse facilities offer secure storage, inventory management, order fulfillment, and distribution services. Strategically located near major ports and airports for optimal efficiency.',
    icon: '🏭',
    color: 'from-purple-500 to-purple-600',
    image: '/images/warehouse.jpg',
    features: [
      { title: 'Climate Control', desc: 'Temperature and humidity controlled environments' },
      { title: '24/7 Security', desc: 'CCTV surveillance, access control, and armed guards' },
      { title: 'Inventory Management', desc: 'Real-time WMS with barcode/RFID tracking' },
      { title: 'Pick & Pack', desc: 'Efficient order fulfillment and kitting services' },
      { title: 'Returns Processing', desc: 'Inspection, restocking, and disposal management' },
      { title: 'Value-Added Services', desc: 'Labeling, packaging, assembly, and QC inspection' },
    ],
    stats: [
      { label: 'Facilities', value: '50+' },
      { label: 'Total Space', value: '5M sq ft' },
      { label: 'Locations', value: '30 Countries' },
      { label: 'Uptime', value: '99.99%' },
    ],
    process: ['Goods Receipt', 'Quality Inspection', 'Put-Away', 'Storage', 'Order Picked', 'Packaged', 'Shipped'],
  },
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = serviceDetails[slug];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-playfair text-4xl font-bold text-navy mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
          <Link to="/services" className="btn-primary">Back to Services</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy" />
        <div className="absolute inset-0 opacity-10">
          <img src={service.image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container-custom">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/services" className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors mb-6">
              ← Back to All Services
            </Link>
            <span className="text-5xl mb-4 block">{service.icon}</span>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-4">
              {service.title}
            </h1>
            <p className="text-white/70 text-xl max-w-2xl">{service.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-playfair text-3xl font-bold text-navy mb-6">Overview</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-10">{service.description}</p>
                
                <h3 className="font-poppins font-semibold text-2xl text-navy mb-6">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {service.features.map((feature) => (
                    <div key={feature.title} className="flex gap-4 p-5 rounded-xl bg-gray-50 hover:bg-gold/5 transition-colors group">
                      <CheckCircle size={24} className="text-gold flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div>
                        <h4 className="font-semibold text-navy mb-1">{feature.title}</h4>
                        <p className="text-gray-600 text-sm">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Sidebar Stats */}
            <div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="sticky top-28">
                <div className="premium-card p-8 bg-gradient-to-br from-navy to-navy-light text-white">
                  <h3 className="font-poppins font-semibold text-xl mb-6 text-gold">Quick Facts</h3>
                  <div className="space-y-5">
                    {service.stats.map((stat) => (
                      <div key={stat.label} className="border-b border-white/10 pb-4 last:border-0">
                        <div className="text-3xl font-bold text-gold">{stat.value}</div>
                        <div className="text-white/60 text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 space-y-3">
                    <Link to="/quote" className="btn-primary w-full justify-center">
                      <Calculator size={18} /> Get Quote
                    </Link>
                    <a href="tel:+1234567890" className="btn-secondary w-full justify-center">
                      <Phone size={18} /> Call Expert
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="section-padding bg-gray-50/50">
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <motion.h2 className="font-playfair text-3xl font-bold text-navy">How It Works</motion.h2>
          </motion.div>
          
          <div className="flex flex-col md:flex-row items-start justify-between gap-4 max-w-5xl mx-auto">
            {service.process.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-1 text-center"
              >
                <div className="w-12 h-12 mx-auto bg-gradient-to-br from-navy to-gold rounded-full flex items-center justify-center text-white font-bold mb-3">
                  {i + 1}
                </div>
                <p className="text-sm font-medium text-navy">{step}</p>
                {i < service.process.length - 1 && (
                  <div className="hidden md:block absolute h-0.5 w-full bg-gold/30 mt-[-24px]" style={{ marginLeft: '50%' }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-navy to-navy-light">
        <div className="container-custom text-center">
          <h2 className="font-playfair text-4xl font-bold text-white mb-6">
            Ready to Ship with {service.title}?
          </h2>
          <p className="text-white/70 text-xl max-w-2xl mx-auto mb-10">
            Get a customized quote for your specific shipping needs today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/quote" className="btn-primary text-lg !py-4 !px-10">
              Get Free Quote <ArrowRight size={20} />
            </Link>
            <Link to="/contact" className="btn-secondary text-lg !py-4 !px-10">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}