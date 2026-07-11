import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Heart, ShoppingCart, Search, Filter, X, Plus, Minus, Truck, Shield, RotateCcw } from 'lucide-react';

const categories = ['All', 'Supplements', 'Vitamins', 'Wellness Kits', 'Health Foods', 'Personal Care'];

export default function Store() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = products;
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, products]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item).filter(i => i.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-gray-50/50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="premium-card p-6 skeleton h-96 rounded-2xl" />
            ))}
          </div>
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
          <img src="/images/wellness.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wider mb-4">
              <ShoppingBag size={16} /> Wellness Store
            </span>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6">
              Premium <span className="text-gold">Wellness</span> Products
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mx-auto">
              Curated selection of premium health supplements and wellness products, delivered worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Store Content */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat ? 'bg-navy text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-auto">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="!pl-11 input-premium w-full md:w-72"
              />
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="premium-card group overflow-hidden"
                >
                  <div className="relative aspect-square bg-gray-50 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <img src={product.image || '/images/wellness.jpg'} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {product.featured && (
                      <span className="absolute top-3 left-3 bg-gold text-navy text-xs font-bold px-3 py-1 rounded-full">Featured</span>
                    )}
                    <button className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-500">
                      <Heart size={16} />
                    </button>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-gold font-medium uppercase tracking-wider mb-1">{product.category}</p>
                    <h3 className="font-semibold text-navy mb-2 line-clamp-1 group-hover:text-gold-dark transition-colors">{product.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-navy">${parseFloat(product.price).toFixed(2)}</span>
                        {product.original_price && (
                          <span className="text-sm text-gray-400 line-through ml-2">${parseFloat(product.original_price).toFixed(2)}</span>
                        )}
                      </div>
                      <button onClick={() => addToCart(product)} className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center text-white hover:bg-gold hover:text-navy transition-colors">
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-navy mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={e => e.stopPropagation()} className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="grid md:grid-cols-2">
              <div className="aspect-square bg-gray-50">
                <img src={selectedProduct.image || '/images/wellness.jpg'} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-8">
                <button onClick={() => setSelectedProduct(null)} className="float-right p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <X size={20} className="text-gray-500" />
                </button>
                <p className="text-gold font-medium uppercase text-xs tracking-wider mb-2">{selectedProduct.category}</p>
                <h2 className="font-playfair text-2xl font-bold text-navy mb-3">{selectedProduct.name}</h2>
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-gold text-gold" />)}
                  <span className="text-sm text-gray-500">(128 reviews)</span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">{selectedProduct.full_description || selectedProduct.description}</p>
                <div className="text-3xl font-bold text-navy mb-6">${parseFloat(selectedProduct.price).toFixed(2)}</div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600"><Truck size={16} className="text-gold" /> Free worldwide shipping on orders over $100</div>
                  <div className="flex items-center gap-2 text-sm text-gray-600"><Shield size={16} className="text-gold" /> 100% authentic products guaranteed</div>
                  <div className="flex items-center gap-2 text-sm text-gray-600"><RotateCcw size={16} className="text-gold" /> 30-day hassle-free returns</div>
                </div>
                
                <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} className="btn-primary w-full !py-4 justify-center">
                  <ShoppingCart size={20} /> Add to Cart — ${parseFloat(selectedProduct.price).toFixed(2)}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}


      {/* Floating Cart */}
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: showCart ? 0 : 400 }}
        transition={{ type: 'spring', damping: 25 }}
        className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-poppins font-semibold text-lg text-navy">Shopping Cart ({cartCount})</h3>
          <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={48} className="text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl">
                <img src={item.image || '/images/wellness.jpg'} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-navy truncate">{item.name}</p>
                  <p className="text-gold font-semibold text-sm">${parseFloat(item.price).toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 bg-white border rounded flex items-center justify-center text-xs hover:bg-gray-100"><Minus size={12} /></button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 bg-white border rounded flex items-center justify-center text-xs hover:bg-gray-100"><Plus size={12} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-navy">${cartTotal.toFixed(2)}</span>
            </div>
            <button className="btn-primary w-full justify-center !py-4">
              <ShoppingCart size={18} /> Checkout
            </button>
            <p className="text-xs text-center text-gray-400">Shipping calculated at checkout</p>
          </div>
        )}
      </motion.div>

      {/* Cart Toggle Button */}
      {cartCount > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowCart(!showCart)}
          className="fixed bottom-6 left-6 z-40 bg-navy text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 hover:bg-navy-light transition-colors"
        >
          <ShoppingCart size={22} />
          <span className="font-semibold">{cartCount} items</span>
          <span className="bg-gold text-navy text-xs font-bold px-2 py-0.5 rounded-full">${cartTotal.toFixed(2)}</span>
        </motion.button>
      )}
    </div>
  );
}