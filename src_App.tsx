import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Tracking from './pages/Tracking';
import Quote from './pages/Quote';
import Store from './pages/Store';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  useEffect(() => {
    // Handle Google OAuth redirect after mount (avoids top-level await runtime issues)
    (async () => {
      try {
        const mod = await import('./lib/googleAuth');
        if (typeof mod.handleGoogleRedirect === 'function') mod.handleGoogleRedirect();
      } catch {
        // Silently skip if not available
      }
    })();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/store" element={<Store />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}