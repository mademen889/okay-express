import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Target, Eye, Heart, Award, Users, Globe, TrendingUp, Shield, 
  ArrowRight, CheckCircle, Lightbulb, Rocket, Handshake
} from 'lucide-react';

const values = [
  { icon: Shield, title: 'Integrity', desc: 'Transparent operations and honest communication in everything we do.' },
  { icon: Rocket, title: 'Innovation', desc: 'Continuously advancing our technology and processes.' },
  { icon: Heart, title: 'Customer First', desc: 'Every decision starts with how it impacts our customers.' },
  { icon: Handshake, title: 'Partnership', desc: 'Building long-term relationships based on trust and mutual success.' },
  { icon: Lightbulb, title: 'Excellence', desc: 'Setting the highest standards in logistics and delivery.' },
  { icon: Globe, title: 'Sustainability', desc: 'Committed to reducing environmental impact across operations.' },
];

const timeline = [
  { year: '2010', event: 'Founded in New York City as a regional courier service' },
  { year: '2013', event: 'Expanded to international shipping with 15 countries' },
  { year: '2016', event: 'Launched Air Freight division with major airline partnerships' },
  { year: '2018', event: 'Reached 100 countries served milestone' },
  { year: '2020', event: 'Introduced AI-powered tracking and route optimization' },
  { year: '2022', event: 'Launched Sea Freight and Customs Clearance services' },
  { year: '2024', event: 'Now serving 220+ countries with 15M+ deliveries' },
];

const team = [
  { name: 'Robert Anderson', role: 'CEO & Founder', bio: '25+ years in global logistics', initials: 'RA' },
  { name: 'Maria Santos', role: 'Chief Operations Officer', bio: 'Former VP at DHL Global', initials: 'MS' },
  { name: 'David Kim', role: 'CTO', bio: 'AI & Supply Chain Tech Expert', initials: 'DK' },
  { name: 'Priya Patel', role: 'VP of Sales', bio: 'Enterprise Logistics Specialist', initials: 'PP' },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy" />
        <div className="absolute inset-0 opacity-10">
          <img src="/images/about-team.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wider mb-4">
              <Heart size={16} /> About Us
            </span>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6">
              The Story Behind <span className="text-gold">OEI</span>
            </h1>
            <p className="text-white/70 text-xl max-w-3xl mx-auto">
              Pioneering global logistics since 2010, we've grown from a small courier service 
              into a world-class enterprise trusted by thousands of businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="premium-card p-10">
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-6">
                <Target size={32} className="text-gold" />
              </div>
              <h3 className="font-playfair text-3xl font-bold text-navy mb-4">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To connect businesses and individuals worldwide through reliable, efficient, and innovative 
                logistics solutions. We strive to make global shipping accessible, transparent, and sustainable 
                for everyone.
              </p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="premium-card p-10">
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-6">
                <Eye size={32} className="text-gold" />
              </div>
              <h3 className="font-playfair text-3xl font-bold text-navy mb-4">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To be the world's most trusted logistics partner, setting new standards in speed, 
                reliability, and customer experience. We envision a seamlessly connected world where 
                distance is no barrier to commerce.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50/50">
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.span className="inline-flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wider mb-4">
              <Heart size={16} /> Core Values
            </motion.span>
            <motion.h2 className="font-playfair text-4xl md:text-5xl font-bold text-navy">
              What Drives Us Forward
            </motion.h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="premium-card p-8 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-navy to-navy-light rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <v.icon size={26} className="text-gold" />
                </div>
                <h3 className="font-poppins font-semibold text-xl text-navy mb-3">{v.title}</h3>
                <p className="text-gray-600">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.span className="inline-flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wider mb-4">
              <TrendingUp size={16} /> Our Journey
            </motion.span>
            <motion.h2 className="font-playfair text-4xl md:text-5xl font-bold text-navy">
              A Legacy of Growth
            </motion.h2>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-8 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-24">
                  <span className="font-playfair text-2xl font-bold text-gold">{item.year}</span>
                </div>
                <div className="relative pb-8 flex-1">
                  <div className="absolute left-0 top-2 w-4 h-4 bg-gold rounded-full border-4 border-white shadow" />
                  {i < timeline.length - 1 && <div className="absolute left-[7px] top-4 w-0.5 h-full bg-gold/20" />}
                  <p className="text-gray-700 pl-6 text-lg">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section-padding bg-gray-50/50">
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.span className="inline-flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wider mb-4">
              <Users size={16} /> Leadership Team
            </motion.span>
            <motion.h2 className="font-playfair text-4xl md:text-5xl font-bold text-navy">
              Meet Our Experts
            </motion.h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="premium-card p-8 text-center group"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-navy to-gold rounded-full flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                  {member.initials}
                </div>
                <h3 className="font-poppins font-semibold text-lg text-navy">{member.name}</h3>
                <p className="text-gold font-medium text-sm mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-navy to-navy-light">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-playfair text-4xl font-bold text-white mb-6">
              Partner With Us Today
            </h2>
            <p className="text-white/70 text-xl max-w-2xl mx-auto mb-10">
              Let's discuss how we can optimize your supply chain and accelerate your growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary text-lg !py-4 !px-10">
                Get In Touch <ArrowRight size={20} />
              </Link>
              <Link to="/quote" className="btn-secondary text-lg !py-4 !px-10">
                Request a Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}