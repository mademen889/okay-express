import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    fetch(`/api/blog?slug=${slug}`)
      .then(r => r.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    
    fetch('/api/blog?limit=3')
      .then(r => r.json())
      .then(data => setRelatedPosts(data.filter(p => p.slug !== slug)));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container-custom max-w-3xl">
          <div className="skeleton h-96 rounded-2xl mb-8" />
          <div className="skeleton h-12 rounded-xl w-3/4 mb-4" />
          <div className="skeleton h-6 rounded-xl w-1/2 mb-8" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton h-4 rounded" style={{ width: `${Math.random() * 30 + 70}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-20 text-center">
        <h1 className="font-playfair text-4xl font-bold text-navy mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
        <Link to="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div>
      <article className="pt-32 pb-20">
        <div className="container-custom max-w-3xl">
          {/* Back Link */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-gold transition-colors mb-8">
              <ArrowLeft size={18} /> Back to Blog
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span className="flex items-center gap-1.5"><User size={14} /> {post.author || 'OEI Team'}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> {post.read_time || '5 min read'}</span>
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-navy leading-tight mb-6">{post.title}</h1>
            <div className="flex items-center gap-4">
              <span className="text-gold font-medium">Share:</span>
              {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                <button key={i} className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-navy hover:text-white transition-colors">
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </motion.header>

          {/* Featured Image */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="aspect-video bg-gradient-to-br from-navy/10 to-gold/10 rounded-2xl flex items-center justify-center mb-10">
            <span className="text-8xl">📄</span>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg prose-navy max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><h2>Key Takeaways</h2><ul><li>Understanding global logistics trends is essential for modern businesses</li><li>Technology continues to transform supply chain operations</li><li>Sustainability is becoming a core focus for logistics providers</li></ul><p>The future of logistics lies in the seamless integration of artificial intelligence, automation, and human expertise. Companies that embrace these changes will be best positioned to succeed in an increasingly competitive global marketplace.</p>` }}
          />

          {/* Tags */}
          {post.tags && (
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-200">
              {post.tags.split(',').map(tag => (
                <span key={tag} className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm">{tag.trim()}</span>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="pb-20 bg-gray-50/50">
          <div className="container-custom max-w-5xl">
            <h2 className="font-playfair text-3xl font-bold text-navy mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map(rp => (
                <Link key={rp.id} to={`/blog/${rp.slug}`} className="premium-card overflow-hidden group">
                  <div className="aspect-video bg-gradient-to-br from-navy/5 to-gold/5 flex items-center justify-center">
                    <span className="text-4xl">📰</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-navy group-hover:text-gold-dark transition-colors line-clamp-2">{rp.title}</h3>
                    <p className="text-sm text-gray-500 mt-2">{new Date(rp.published_at).toLocaleDateString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}