import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AIChatWidget from './AIChatWidget';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isDashboard = location.pathname.startsWith('/dashboard');

  if (isDashboard) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Navbar is fixed; add top padding so content doesn't render underneath it */}
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  );
}

