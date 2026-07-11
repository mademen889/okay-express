import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Clock, Tag, Search } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then(r => r.json())
      .then(data => { setPosts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredPost = posts.find(p => p.featured) || posts[0];
  const otherPosts = filteredPosts.filter(p => p.id !== featuredPost?.id);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="premium-card skeleton h-80 rounded-2xl" />
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
        <div className="relative container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wider mb-4">
              <Tag size={16} /> Blog & Insights
            </span>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6">
              Logistics <span className="text-gold">Insights</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mx-auto">
              Industry news, expert tips, and trends shaping the future of global logistics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search */}
      <section className="-mt-4 relative z-10">
        <div className="container-custom max-w-2xl">
          <div className="premium-card p-4 flex gap-3">
            <Search size={20} className="text-gray-400 ml-2 self-center" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="flex-1 !border-0 !ring-0 focus:!ring-0 input-premium bg-transparent"
            />
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="section-padding">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="premium-card overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-navy/10 to-gold/10 flex items-center justify-center">
                  <span className="text-8xl">📦</span>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-2 text-gold font-medium text-xs uppercase tracking-wider mb-4">
                    <Clock size={14} /> Featured Article
                  </span>
                  <h2 className="font-playfair text-3xl font-bold text-navy mb-4 leading-tight">{featuredPost.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(featuredPost.published_at || featuredPost.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span className="flex items-center gap-1.5"><User size={14} /> {featuredPost.author || 'OEI Team'}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {featuredPost.read_time || '5 min read'}</span>
                  </div>
                  <Link to={`/blog/${featuredPost.slug}`} className="btn-navy w-fit">
                    Read Full Article <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}


      {/* Posts Grid */}
      <section className="pb-20">
        <div className="container-custom">
          <h3 className="font-poppins font-semibold text-2xl text-navy mb-8">Latest Articles</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.slice(0, 6).map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="premium-card overflow-hidden group"
              >
                <div className="aspect-video bg-gradient-to-br from-navy/5 to-gold/5 flex items-center justify-center">
                  <span className="text-5xl">📰</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.published_at || post.created_at).toLocaleDateString()}</span>
                    <span>{post.read_time || '5 min'}</span>
                  </div>
                  <h3 className="font-poppins font-semibold text-lg text-navy mb-2 group-hover:text-gold-dark transition-colors line-clamp-2">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-gold font-medium text-sm group-hover:gap-2 transition-all">
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}