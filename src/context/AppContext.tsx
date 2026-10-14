import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, ServiceProvider, Customer, ServiceCategory, Booking, Review, BookingStatus, UserRole } from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_PROVIDERS,
  INITIAL_CUSTOMERS,
  INITIAL_ADMIN,
  INITIAL_BOOKINGS,
  INITIAL_REVIEWS,
} from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'danger' | 'info' | 'warning';
}

interface AppContextType {
  currentUser: User | null;
  categories: ServiceCategory[];
  providers: ServiceProvider[];
  customers: Customer[];
  bookings: Booking[];
  reviews: Review[];
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'danger' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  login: (email: string, password?: string) => boolean;
  demoLogin: (role: UserRole, specificId?: string) => void;
  register: (data: {
    role: UserRole;
    username: string;
    email: string;
    fullName: string;
    phone: string;
    address: string;
    category?: string;
    hourlyRate?: number;
    experienceYears?: number;
    bio?: string;
  }) => boolean;
  logout: () => void;
  createBooking: (data: {
    providerId: string;
    serviceCategory: string;
    date: string;
    time: string;
    address: string;
    notes?: string;
    amount: number;
  }) => string;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  cancelBooking: (bookingId: string) => void;
  addReview: (data: { bookingId: string; providerId: string; rating: number; comment: string }) => void;
  addCategory: (data: { name: string; icon: string; description: string; basePrice: number }) => void;
  updateCategory: (category: ServiceCategory) => void;
  deleteCategory: (id: string) => void;
  toggleProviderActive: (id: string) => void;
  toggleProviderAvailability: (id: string) => void;
  updateProviderProfile: (id: string, data: Partial<ServiceProvider>) => void;
  updateCustomerProfile: (id: string, data: Partial<Customer>) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CURRENT_USER: 'homehelp_user',
  CATEGORIES: 'homehelp_categories',
  PROVIDERS: 'homehelp_providers',
  CUSTOMERS: 'homehelp_customers',
  BOOKINGS: 'homehelp_bookings',
  REVIEWS: 'homehelp_reviews',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS[0]; // Default logged-in as customer Rahul for presentation ease
    } catch {
      return INITIAL_CUSTOMERS[0];
    }
  });

  const [categories, setCategories] = useState<ServiceCategory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [providers, setProviders] = useState<ServiceProvider[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROVIDERS);
      return saved ? JSON.parse(saved) : INITIAL_PROVIDERS;
    } catch {
      return INITIAL_PROVIDERS;
    }
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync with localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROVIDERS, JSON.stringify(providers));
  }, [providers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  const showToast = (message: string, type: 'success' | 'danger' | 'info' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const login = (email: string, _password?: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === INITIAL_ADMIN.email.toLowerCase() || cleanEmail === 'admin') {
      setCurrentUser(INITIAL_ADMIN);
      showToast(`Logged in as Administrator (${INITIAL_ADMIN.fullName})`, 'success');
      return true;
    }

    const providerMatch = providers.find((p) => p.email.toLowerCase() === cleanEmail || p.username.toLowerCase() === cleanEmail);
    if (providerMatch) {
      if (!providerMatch.isActive) {
        showToast('Your provider account has been deactivated by the Administrator.', 'danger');
        return false;
      }
      setCurrentUser(providerMatch);
      showToast(`Welcome back, ${providerMatch.fullName} (Provider)!`, 'success');
      return true;
    }

    const customerMatch = customers.find((c) => c.email.toLowerCase() === cleanEmail || c.username.toLowerCase() === cleanEmail);
    if (customerMatch) {
      setCurrentUser(customerMatch);
      showToast(`Welcome back, ${customerMatch.fullName}!`, 'success');
      return true;
    }

    showToast('Invalid credentials. Try rahul@example.com or demo buttons.', 'danger');
    return false;
  };

  const demoLogin = (role: UserRole, specificId?: string) => {
    if (role === 'admin') {
      setCurrentUser(INITIAL_ADMIN);
      showToast('Switched to Administrator session.', 'success');
    } else if (role === 'provider') {
      const prov = specificId ? providers.find((p) => p.id === specificId) || providers[0] : providers[0];
      setCurrentUser(prov);
      showToast(`Switched to Provider: ${prov.fullName} (${prov.category})`, 'success');
    } else {
      const cust = specificId ? customers.find((c) => c.id === specificId) || customers[0] : customers[0];
      setCurrentUser(cust);
      showToast(`Switched to Customer: ${cust.fullName}`, 'success');
    }
  };

  const register = (data: {
    role: UserRole;
    username: string;
    email: string;
    fullName: string;
    phone: string;
    address: string;
    category?: string;
    hourlyRate?: number;
    experienceYears?: number;
    bio?: string;
  }): boolean => {
    const emailLower = data.email.toLowerCase();
    const isExisting =
      providers.some((p) => p.email.toLowerCase() === emailLower || p.username.toLowerCase() === data.username.toLowerCase()) ||
      customers.some((c) => c.email.toLowerCase() === emailLower || c.username.toLowerCase() === data.username.toLowerCase()) ||
      emailLower === INITIAL_ADMIN.email.toLowerCase();

    if (isExisting) {
      showToast('Email or username is already registered.', 'danger');
      return false;
    }

    const newId = `usr-${Date.now().toString(36)}`;

    if (data.role === 'provider') {
      const newProvider: ServiceProvider = {
        id: newId,
        username: data.username,
        email: data.email,
        role: 'provider',
        fullName: data.fullName,
        phone: data.phone,
        address: data.address,
        category: data.category || 'Plumbing',
        experienceYears: data.experienceYears || 2,
        rating: 5.0,
        reviewCount: 0,
        hourlyRate: data.hourlyRate || 350,
        bio: data.bio || 'Professional home service provider ready to assist with residential repairs.',
        skills: [data.category || 'General Repair'],
        isAvailable: true,
        isActive: true,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setProviders((prev) => [newProvider, ...prev]);
      setCurrentUser(newProvider);
      showToast(`Service Provider account created! Welcome, ${newProvider.fullName}.`, 'success');
    } else {
      const newCustomer: Customer = {
        id: newId,
        username: data.username,
        email: data.email,
        role: 'customer',
        fullName: data.fullName,
        phone: data.phone,
        address: data.address,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setCustomers((prev) => [newCustomer, ...prev]);
      setCurrentUser(newCustomer);
      showToast(`Customer account registered successfully! Welcome, ${newCustomer.fullName}.`, 'success');
    }
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('You have been logged out safely.', 'info');
  };

  const createBooking = (data: {
    providerId: string;
    serviceCategory: string;
    date: string;
    time: string;
    address: string;
    notes?: string;
    amount: number;
  }): string => {
    if (!currentUser) {
      showToast('Please login as a customer to book services.', 'warning');
      return '';
    }

    const provider = providers.find((p) => p.id === data.providerId);
    const bookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: Booking = {
      id: bookingId,
      customerId: currentUser.id,
      customerName: currentUser.fullName,
      customerPhone: currentUser.phone || '+91 99999 88888',
      providerId: data.providerId,
      providerName: provider ? provider.fullName : 'Service Professional',
      serviceCategory: data.serviceCategory,
      date: data.date,
      time: data.time,
      address: data.address,
      notes: data.notes || '',
      status: 'Pending',
      amount: data.amount,
      createdAt: new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    };

    setBookings((prev) => [newBooking, ...prev]);
    showToast(`Booking ${bookingId} submitted! Provider notified.`, 'success');
    return bookingId;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            status,
            completedAt: status === 'Completed' ? new Date().toLocaleString() : b.completedAt,
          };
        }
        return b;
      })
    );
    showToast(`Booking ${bookingId} status marked as ${status}.`, 'info');
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return { ...b, status: 'Cancelled' as BookingStatus };
        }
        return b;
      })
    );
    showToast(`Booking ${bookingId} has been cancelled.`, 'warning');
  };

  const addReview = (data: { bookingId: string; providerId: string; rating: number; comment: string }) => {
    if (!currentUser) return;
    const newReview: Review = {
      id: `rev-${Date.now().toString(36)}`,
      bookingId: data.bookingId,
      providerId: data.providerId,
      customerId: currentUser.id,
      customerName: currentUser.fullName,
      rating: data.rating,
      comment: data.comment,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setReviews((prev) => [newReview, ...prev]);

    // Recalculate provider average rating
    setProviders((prev) =>
      prev.map((p) => {
        if (p.id === data.providerId) {
          const providerReviews = [...reviews.filter((r) => r.providerId === p.id), newReview];
          const avg = providerReviews.reduce((acc, curr) => acc + curr.rating, 0) / providerReviews.length;
          return {
            ...p,
            rating: Number(avg.toFixed(1)),
            reviewCount: providerReviews.length,
          };
        }
        return p;
      })
    );

    // Mark booking reviewGiven
    setBookings((prev) =>
      prev.map((b) => (b.id === data.bookingId ? { ...b, reviewGiven: true } : b))
    );

    showToast('Thank you! Your feedback has been published.', 'success');
  };

  const addCategory = (data: { name: string; icon: string; description: string; basePrice: number }) => {
    const newCat: ServiceCategory = {
      id: `cat-${Date.now().toString(36)}`,
      name: data.name,
      icon: data.icon || 'Wrench',
      description: data.description,
      basePrice: data.basePrice,
      popular: false,
    };
    setCategories((prev) => [...prev, newCat]);
    showToast(`Category "${data.name}" added successfully.`, 'success');
  };

  const updateCategory = (updated: ServiceCategory) => {
    setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    showToast(`Category "${updated.name}" updated.`, 'info');
  };

  const deleteCategory = (id: string) => {
    const cat = categories.find((c) => c.id === id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast(`Category "${cat?.name || id}" removed.`, 'warning');
  };

  const toggleProviderActive = (id: string) => {
    setProviders((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newStatus = !p.isActive;
          showToast(`Provider ${p.fullName} ${newStatus ? 'Activated' : 'Deactivated'}.`, newStatus ? 'success' : 'warning');
          return { ...p, isActive: newStatus };
        }
        return p;
      })
    );
  };

  const toggleProviderAvailability = (id: string) => {
    setProviders((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const next = !p.isAvailable;
          showToast(`Availability set to ${next ? 'Online / Accepting Requests' : 'Busy / Away'}.`, 'info');
          return { ...p, isAvailable: next };
        }
        return p;
      })
    );
  };

  const updateProviderProfile = (id: string, data: Partial<ServiceProvider>) => {
    setProviders((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
    if (currentUser?.id === id) {
      setCurrentUser((prev) => (prev ? ({ ...prev, ...data } as User) : null));
    }
    showToast('Provider profile updated successfully.', 'success');
  };

  const updateCustomerProfile = (id: string, data: Partial<Customer>) => {
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
    if (currentUser?.id === id) {
      setCurrentUser((prev) => (prev ? ({ ...prev, ...data } as User) : null));
    }
    showToast('Customer profile updated.', 'success');
  };

  const resetDemoData = () => {
    setCategories(INITIAL_CATEGORIES);
    setProviders(INITIAL_PROVIDERS);
    setCustomers(INITIAL_CUSTOMERS);
    setBookings(INITIAL_BOOKINGS);
    setReviews(INITIAL_REVIEWS);
    setCurrentUser(INITIAL_CUSTOMERS[0]);
    localStorage.clear();
    showToast('Reset system to default college demo data.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        categories,
        providers,
        customers,
        bookings,
        reviews,
        toasts,
        showToast,
        removeToast,
        login,
        demoLogin,
        register,
        logout,
        createBooking,
        updateBookingStatus,
        cancelBooking,
        addReview,
        addCategory,
        updateCategory,
        deleteCategory,
        toggleProviderActive,
        toggleProviderAvailability,
        updateProviderProfile,
        updateCustomerProfile,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
