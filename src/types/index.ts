export type UserRole = 'customer' | 'provider' | 'admin';

export type BookingStatus = 'Pending' | 'Accepted' | 'Completed' | 'Cancelled';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  fullName: string;
  phone: string;
  address: string;
  avatar?: string;
  createdAt: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  basePrice: number;
  popular?: boolean;
}

export interface ServiceProvider extends User {
  role: 'provider';
  category: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  bio: string;
  skills: string[];
  isAvailable: boolean;
  isActive: boolean; // Admin can activate/deactivate
}

export interface Customer extends User {
  role: 'customer';
  preferredAddress?: string;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  providerId: string;
  providerName: string;
  serviceCategory: string;
  date: string;
  time: string;
  address: string;
  notes?: string;
  status: BookingStatus;
  amount: number;
  createdAt: string;
  completedAt?: string;
  reviewGiven?: boolean;
}

export interface Review {
  id: string;
  bookingId: string;
  providerId: string;
  customerId: string;
  customerName: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
}

export interface FlaskProjectFile {
  path: string;
  description: string;
  language: string;
  content: string;
}

export interface VivaQuestion {
  question: string;
  category: 'Flask & Python' | 'Database & SQLite' | 'Architecture & Security' | 'Project Lifecycle';
  answer: string;
}
