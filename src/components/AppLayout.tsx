import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import UploadSection from '@/components/UploadSection';
import PricingSection from '@/components/PricingSection';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import AdminPanel from '@/components/AdminPanel';
import UserDashboard from '@/components/UserDashboard';
import DiscountManager from '@/components/DiscountManager';
import { AuthProvider, useAuth } from '@/components/AuthProvider';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const { user, isAdmin } = useAuth();

  const handleNavigation = (section: string) => {
    setCurrentView(section);
  };

  // Secret admin access via URL hash
  React.useEffect(() => {
    const checkAdminAccess = () => {
      if (window.location.hash === '#admin-access-2024' && isAdmin) {
        setCurrentView('admin');
      }
    };
    
    checkAdminAccess();
    window.addEventListener('hashchange', checkAdminAccess);
    
    return () => window.removeEventListener('hashchange', checkAdminAccess);
  }, [isAdmin]);

  const renderContent = () => {
    switch (currentView) {
      case 'admin':
        return isAdmin ? <AdminPanel /> : <div className="p-6 text-center">Access denied</div>;
      case 'dashboard':
        return user ? <UserDashboard /> : <div className="p-6 text-center">Please log in</div>;
      case 'pricing':
        return (
          <div className="py-12">
            <PricingSection />
            <div className="max-w-4xl mx-auto mt-12">
              <DiscountManager showApplyInterface={true} />
            </div>
          </div>
        );
      case 'faq':
        return <div className="py-12"><FAQ /></div>;
      case 'contact':
        return (
          <div className="py-12 max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
            <div className="text-center space-y-4">
              <p>Email: support@lawdefenseai.com</p>
              <p>Phone: 1-800-LAW-HELP</p>
              <p>Hours: Monday-Friday 9AM-6PM EST</p>
            </div>
          </div>
        );
      default:
        return (
          <>
            <Hero />
            <Features />
            <UploadSection />
            <PricingSection />
            <FAQ />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={handleNavigation} />
      <main>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default AppLayout;