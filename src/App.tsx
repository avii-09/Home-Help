import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceCategories } from './components/ServiceCategories';
import { FeaturedProviders } from './components/FeaturedProviders';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { ServicesView } from './components/ServicesView';
import { CustomerDashboard } from './components/CustomerDashboard';
import { ProviderDashboard } from './components/ProviderDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { BookingModal } from './components/BookingModal';
import { ReviewModal } from './components/ReviewModal';
import { AuthModals } from './components/AuthModals';
import { ProjectHubModal } from './components/ProjectHubModal';
import { ToastContainer } from './components/ToastContainer';
import { Booking, ServiceProvider } from './types';

function MainApp() {
  const { currentUser } = useApp();

  const [activeView, setActiveView] = useState<'home' | 'services' | 'customer' | 'provider' | 'admin'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  // Modals state
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isProjectHubOpen, setIsProjectHubOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingCategory, setBookingCategory] = useState<string | undefined>(undefined);
  const [bookingProvider, setBookingProvider] = useState<ServiceProvider | undefined>(undefined);
  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);

  const handleOpenBooking = (categoryName?: string) => {
    setBookingCategory(categoryName);
    setBookingProvider(undefined);
    setIsBookingOpen(true);
  };

  const handleBookProvider = (provider: ServiceProvider) => {
    setBookingCategory(provider.category);
    setBookingProvider(provider);
    setIsBookingOpen(true);
  };

  const handleCategorySelectFromHome = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setActiveView('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string, category?: string) => {
    setSelectedCategory(category);
    setActiveView('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenProjectHub={() => setIsProjectHubOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <Hero
              onSearch={handleSearch}
              onSelectCategory={handleCategorySelectFromHome}
              onOpenBooking={handleOpenBooking}
            />
            <ServiceCategories
              onSelectCategory={handleCategorySelectFromHome}
              onBookCategory={handleOpenBooking}
            />
            <FeaturedProviders onBookProvider={handleBookProvider} />
            <HowItWorks />
            <Testimonials />
          </>
        )}

        {activeView === 'services' && (
          <ServicesView
            initialCategory={selectedCategory}
            onBookProvider={handleBookProvider}
            onBookCategory={handleOpenBooking}
          />
        )}

        {activeView === 'customer' && (
          <CustomerDashboard
            onOpenBooking={() => handleOpenBooking()}
            onOpenReview={(b) => setReviewBooking(b)}
          />
        )}

        {activeView === 'provider' && <ProviderDashboard />}

        {activeView === 'admin' && <AdminDashboard />}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={handleCategorySelectFromHome}
        onOpenProjectHub={() => setIsProjectHubOpen(true)}
      />

      {/* Global Interactive Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialCategory={bookingCategory}
        initialProvider={bookingProvider}
        onSuccess={() => {
          if (currentUser?.role === 'customer') {
            setActiveView('customer');
          }
        }}
      />

      <ReviewModal
        booking={reviewBooking}
        onClose={() => setReviewBooking(null)}
      />

      <AuthModals
        loginOpen={isLoginOpen}
        registerOpen={isRegisterOpen}
        onCloseLogin={() => setIsLoginOpen(false)}
        onCloseRegister={() => setIsRegisterOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />

      <ProjectHubModal
        isOpen={isProjectHubOpen}
        onClose={() => setIsProjectHubOpen(false)}
      />

      {/* Toast Flash System */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
