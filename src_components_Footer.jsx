import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Globe, Facebook, Twitter, Instagram, Linkedin, Youtube,
  Send, ArrowRight, Plane, Ship, Truck, Warehouse
} from 'lucide-react';

const footerLinks = {
  services: [
    { name: 'International Courier', path: '/services/international-courier' },
    { name: 'Air Freight', path: '/services/air-freight' },
    { name: 'Sea Freight', path: '/services/sea-freight' },
    { name: 'Customs Clearance', path: '/services/customs-clearance' },
    { name: 'Warehouse Solutions', path: '/services/warehouse' },
    { name: 'E-commerce Fulfillment', path: '/services' },
  ],
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Our Team', path: '/about#team' },
    { name: 'Careers', path: '/about#careers' },
    { name: 'Blog & News', path: '/blog' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Partner With Us', path: '/contact' },
  ],
  support: [
    { name: 'Track Shipment', path: '/tracking' },
    { name: 'Get a Quote', path: '/quote' },
    { name: 'Customer Portal', path: '/login' },
    { name: 'Help Center', path: '/contact' },
    { name: 'Shipping Guidelines', path: '/services' },
    { name: 'FAQs', path: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Main Footer */}
      <div className="container-custom section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img src="/images/logo-main.png" alt="Okay Express International" className="h-14 w-auto brightness-200" />
            </Link>
            <p className="text-white/70 leading-relaxed mb-6 max-w-md">
              Your trusted partner for global logistics excellence. We deliver promises across 
              continents with precision, speed, and unwavering commitment to quality.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <a href="tel:+1234567890" className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors">
                <Phone size={18} className="text-gold flex-shrink-0" />
                <span>+1 (800) OEI-SHIP (634-7447)</span>
              </a>
              <a href="mailto:info@okayexpressinternational.com" className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors">
                <Mail size={18} className="text-gold flex-shrink-0" />
                <span>info@okayexpressinternational.com</span>
              </a>
              <div className="flex items-start gap-3 text-white/70">
                <MapPin size={18} className="text-gold flex-shrink-0 mt-0.5" />
                <span>1250 Global Logistics Boulevard, Suite 500<br />New York, NY 10001, USA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6 text-gold">Our Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-white/70 hover:text-gold transition-colors flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6 text-gold">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-white/70 hover:text-gold transition-colors flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6 text-gold">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-white/70 hover:text-gold transition-colors flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Bar */}
      <div className="border-t border-b border-white/10">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-playfair text-xl font-semibold text-white mb-1">Subscribe to Our Newsletter</h4>
              <p className="text-white/60 text-sm">Get the latest shipping updates and exclusive offers.</p>
            </div>
            <form className="flex w-full md:w-auto gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="!bg-white/10 !border-white/20 !text-white placeholder:text-white/40 !rounded-lg md:w-80 input-premium"
              />
              <button type="submit" className="btn-primary !px-6 whitespace-nowrap">
                <Send size={18} />
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <p>© {new Date().getFullYear()} Okay Express International. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="#" className="hover:text-gold transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-gold transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-gold transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}