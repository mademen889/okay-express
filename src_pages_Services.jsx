import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Globe, Plane, Ship, FileText, Warehouse, Truck, ArrowRight, 
  CheckCircle, Clock, Shield, Zap, Users, TrendingUp
} from 'lucide-react';

const allServices = [
  {
    icon: Globe, title: 'International Courier', 
    desc: 'Express door-to-door delivery to 220+ countries with real-time GPS tracking and proof of delivery.',
    features: ['Next-day delivery available', 'Real-time GPS tracking', 'Insurance up to $100K', 'Customs handling included'],
    path: '/services/international-courier', color: 'from-blue-500 to-blue-600', image: '/images/courier.jpg'
  },
  {
    icon: Plane, title: 'Air Freight', 
    desc: 'Fast and reliable air cargo solutions for time-sensitive shipments worldwide.',
    features: ['Direct flights to 180+ airports', 'Temperature-controlled options', 'Dangerous goods certified', 'Charter services available'],
    path: '/services/air-freight', color: 'from-sky-500 to-sky-600', image: '/images/airfreight.jpg'
  },
  {
    icon: Ship, title: 'Sea Freight', 
    desc: 'Cost-effective ocean freight for FCL, LCL, breakbulk, and project cargo.',
    features: ['FCL & LCL options', 'Port-to-port & door-to-door', 'Reefer containers available', 'Project cargo specialists'],
    path: '/services/sea-freight', color: 'from-indigo-500 to-indigo-600', image: '/images/shipping.jpg'
  },
  {
    icon: FileText, title: 'Customs Clearance', 
    desc: 'Expert customs brokerage ensuring smooth clearance across all borders.',
    features: ['Licensed customs brokers', 'Duty optimization', 'Compliance guarantee', 'Documentation assistance'],
    path: '/services/customs-clearance', color: 'from-violet-500 to-violet-600', image: '/images/shipping.jpg'
  },
  {
    icon: Warehouse, title: 'Warehouse Services', 
    desc: 'Secure warehousing, inventory management, and fulfillment solutions globally.',
    features: ['Climate-controlled storage', '24/7 security monitoring', 'Pick & pack services', 'Returns processing'],
    path: '/services/warehouse', color: 'from-purple-500 to-purple-600', image: '/images/warehouse.jpg'
  },
  {
    icon: Truck, title: 'E-commerce Fulfillment', 
    desc: 'End-to-end e-commerce logistics including last-mile delivery and returns.',
    features: ['API integration ready', 'Same-day dispatch', 'Multi-channel fulfillment', 'Real-time inventory sync'],
    path: '/services', color: 'from-pink-500 to-pink-600', image: '/images/warehouse.jpg'
  },
];

export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy" />
        <div className="relative container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wider mb-4">
              <Zap size={16} /> Our Services
            </span>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6">
              Complete Logistics <span className="text-gold">Solutions</span>
            </h1>
            <p className="text-white/70 text-xl max-w-3xl mx-auto">
              From express courier to complex supply chain management, we offer comprehensive 
              services designed to meet every shipping need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-16">
            {allServices.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`premium-card overflow-hidden ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                  <div className="lg:w-1/2">
                    <img src={service.image} alt={service.title} className="w-full h-72 lg:h-full object-cover" />
                  </div>
                  <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
                      <service.icon size={30} className="text-white" />
                    </div>
                    <h2 className="font-playfair text-3xl font-bold text-navy mb-4">{service.title}</h2>
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">{service.desc}</p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {service.features.map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <CheckCircle size={18} className="text-gold flex-shrink-0" />
                          <span className="text-sm text-gray-700">{f}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Link to={service.path} className="btn-navy w-fit">
                      Learn More <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-navy to-navy-light">
        <div className="container-custom text-center">
          <h2 className="font-playfair text-4xl font-bold text-white mb-6">
            Need a Custom Solution?
          </h2>
          <p className="text-white/70 text-xl max-w-2xl mx-auto mb-10">
            Our logistics experts will design a tailored solution for your unique requirements.
          </p>
          <Link to="/quote" className="btn-primary text-lg !py-4 !px-10">
            Request Custom Quote <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}