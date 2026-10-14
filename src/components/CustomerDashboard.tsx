import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CalendarCheck,
  Clock,
  MapPin,
  XCircle,
  Star,
  PlusCircle,
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  FileText,
  Edit2,
  Save,
} from 'lucide-react';
import { Booking, BookingStatus } from '../types';

interface CustomerDashboardProps {
  onOpenBooking: () => void;
  onOpenReview: (booking: Booking) => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ onOpenBooking, onOpenReview }) => {
  const { currentUser, bookings, cancelBooking, updateCustomerProfile } = useApp();
  const [statusFilter, setStatusFilter] = useState<'All' | BookingStatus>('All');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: currentUser?.fullName || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
  });

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-slate-900">Please Sign In</h2>
        <p className="text-sm text-slate-600 mt-1">Log in as a customer to manage your bookings and profile.</p>
      </div>
    );
  }

  // Filter bookings belonging to this customer
  const customerBookings = bookings.filter((b) => b.customerId === currentUser.id);

  const filteredBookings =
    statusFilter === 'All'
      ? customerBookings
      : customerBookings.filter((b) => b.status === statusFilter);

  const stats = {
    total: customerBookings.length,
    pending: customerBookings.filter((b) => b.status === 'Pending').length,
    accepted: customerBookings.filter((b) => b.status === 'Accepted').length,
    completed: customerBookings.filter((b) => b.status === 'Completed').length,
    totalSpent: customerBookings
      .filter((b) => b.status === 'Completed')
      .reduce((sum, b) => sum + b.amount, 0),
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomerProfile(currentUser.id, profileForm);
    setIsEditingProfile(false);
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            Pending Approval
          </span>
        );
      case 'Accepted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
            <CheckCircle2 className="w-3 h-3 text-blue-600" />
            Accepted / Confirmed
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200">
            <XCircle className="w-3 h-3 text-rose-600" />
            Cancelled
          </span>
        );
    }
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header & Fast Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                Customer Portal
              </span>
              <span className="text-xs text-slate-500 font-mono">ID: {currentUser.id}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
              Welcome, {currentUser.fullName}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage your home service requests, track service arrival, and review completed work.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            Book a New Service
          </button>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Total Bookings</span>
            <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">{stats.total}</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">In-Progress / Pending</span>
            <div className="text-2xl font-bold text-amber-600 mt-1 tabular-nums">
              {stats.pending + stats.accepted}
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Completed Jobs</span>
            <div className="text-2xl font-bold text-emerald-600 mt-1 tabular-nums">{stats.completed}</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Total Amount Spent</span>
            <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">₹{stats.totalSpent}</div>
          </div>
        </div>

        {/* Main Grid: Bookings on Left (70%), Profile Card on Right (30%) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bookings View (Col-span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Your Booking History</h2>
                  <p className="text-xs text-slate-500">Live booking status and service provider notes</p>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto text-xs font-medium text-slate-600">
                  {(['All', 'Pending', 'Accepted', 'Completed', 'Cancelled'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setStatusFilter(tab)}
                      className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                        statusFilter === tab
                          ? 'bg-white text-slate-900 shadow-sm font-semibold'
                          : 'hover:text-slate-900'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bookings List */}
              <div className="mt-6 space-y-4">
                {filteredBookings.length === 0 ? (
                  <div className="py-12 text-center">
                    <CalendarCheck className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-700">No bookings in this category</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {statusFilter === 'All'
                        ? 'You haven’t booked any services yet. Click "Book a New Service" above.'
                        : `No bookings currently marked as ${statusFilter}.`}
                    </p>
                  </div>
                ) : (
                  filteredBookings.map((b) => (
                    <div
                      key={b.id}
                      className="border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-all bg-white"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-blue-600">{b.id}</span>
                            <span className="text-xs font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                              {b.serviceCategory}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-slate-800 mt-1">
                            Assigned to: <span className="text-blue-600">{b.providerName}</span>
                          </h3>
                        </div>

                        <div className="flex items-center gap-2">
                          {getStatusBadge(b.status)}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3 text-xs text-slate-600">
                        <div className="flex items-center gap-2">
                          <CalendarCheck className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>
                            {b.date} at {b.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 sm:col-span-2">
                          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                          <span className="truncate">{b.address}</span>
                        </div>
                      </div>

                      {b.notes && (
                        <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg mb-3 flex items-start gap-2">
                          <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span>Instructions: {b.notes}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <div className="text-xs text-slate-600">
                          Estimated Cost:{' '}
                          <span className="font-bold text-slate-900 text-sm tabular-nums">₹{b.amount}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Cancel button if pending or accepted */}
                          {(b.status === 'Pending' || b.status === 'Accepted') && (
                            <button
                              onClick={() => cancelBooking(b.id)}
                              className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-200 transition-colors"
                            >
                              Cancel Booking
                            </button>
                          )}

                          {/* Rate & Review button if completed */}
                          {b.status === 'Completed' && (
                            <button
                              onClick={() => onOpenReview(b)}
                              disabled={b.reviewGiven}
                              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors ${
                                b.reviewGiven
                                  ? 'bg-slate-100 text-slate-400 cursor-default'
                                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                              }`}
                            >
                              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                              {b.reviewGiven ? 'Reviewed' : 'Leave Review'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Profile Card & Info (Col-span 1) */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  Customer Profile
                </h3>
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  {isEditingProfile ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.fullName}
                      onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                      required
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      required
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Default Service Address</label>
                    <textarea
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                      rows={3}
                      required
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Full Name</span>
                    <span className="font-semibold text-slate-900 text-sm">{currentUser.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Email Address</span>
                    <span className="font-semibold text-slate-800">{currentUser.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Phone</span>
                    <span className="font-semibold text-slate-800">{currentUser.phone || 'Not provided'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Home Address</span>
                    <span className="font-semibold text-slate-800 leading-relaxed block">
                      {currentUser.address || 'No default address specified.'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick College Viva Feature Callout */}
            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200/80">
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">
                TY BCA Viva Quick Check:
              </h4>
              <p className="text-xs text-blue-800 leading-relaxed">
                Notice how booking records link the customer's foreign key (`customer_id`) with the selected service provider's ID in the SQLite relational model. Try booking another service or switching to the Provider view to accept it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
