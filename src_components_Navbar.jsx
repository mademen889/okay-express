import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  {
    name: 'Services',
    path: '/services',
    children: [
      { name: 'International Courier', path: '/services/international-courier' },
      { name: 'Air Freight', path: '/services/air-freight' },
      { name: 'Sea Freight', path: '/services/sea-freight' },
      { name: 'Customs Clearance', path: '/services/customs-clearance' },
      { name: 'Warehouse Services', path: '/services/warehouse' },
    ],
  },
  { name: 'Track Shipment', path: '/tracking' },
  { name: 'Get Quote', path: '/quote' },
  { name: 'Wellness Store', path: '/store' },
  { name: 'Blog', path: '/blog' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-navy/95 backdrop-blur-xl shadow-2xl shadow-navy/20' : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/images/logo-main.png" 
              alt="Okay Express International" 
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.path}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    location.pathname === link.path || location.pathname.startsWith(link.path + '/')
                      ? 'text-gold bg-white/10'
                      : 'text-white/90 hover:text-gold hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {link.children && <ChevronDown size={14} className={`transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                </Link>
                
                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl shadow-navy/20 overflow-hidden border border-gray-100"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-5 py-3 text-sm text-navy hover:bg-gold/10 hover:text-gold-dark transition-colors border-b border-gray-50 last:border-0"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+1234567890" className="flex items-center gap-2 text-white/80 hover:text-gold transition-colors text-sm">
              <Phone size={16} />
              <span>1-800-OEI-SHIP</span>
            </a>
            <Link to="/login" className="btn-primary text-sm !py-2.5 !px-5">
              Customer Portal
            </Link>
            <Link to="/dashboard" className="btn-secondary text-sm !py-2.5 !px-5">
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:text-gold transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-navy/98 backdrop-blur-xl border-t border-white/10"
          >
            <div className="container-custom py-6 space-y-1">
              {navLinks.map((link) => (
                <div key={link.path}>
                  <Link
                    to={link.path}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      location.pathname === link.path ? 'text-gold bg-white/10' : 'text-white/90 hover:text-gold'
                    }`}
                  >
                    {link.name}
                  </Link>
                  {link.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-2 text-sm text-white/70 hover:text-gold transition-colors rounded-lg"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <a href="tel:+1234567890" className="flex items-center gap-2 text-white/80 px-4">
                  <Phone size={16} />
                  <span>1-800-OEI-SHIP</span>
                </a>
                <Link to="/login" className="btn-primary w-full justify-center text-sm">
                  Customer Portal
                </Link>
                <Link to="/dashboard" className="btn-secondary w-full justify-center text-sm">
                  Dashboard
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}