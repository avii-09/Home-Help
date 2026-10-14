import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Phone,
  DollarSign,
  Star,
  Settings,
  Power,
  Calendar,
  AlertTriangle,
  Save,
  Check,
} from 'lucide-react';
import { ServiceProvider, BookingStatus } from '../types';

export const ProviderDashboard: React.FC = () => {
  const {
    currentUser,
    bookings,
    updateBookingStatus,
    toggleProviderAvailability,
    updateProviderProfile,
    categories,
  } = useApp();

  const provider = currentUser as ServiceProvider;

  const [activeTab, setActiveTab] = useState<'requests' | 'active' | 'completed' | 'profile'>('requests');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: provider?.fullName || '',
    phone: provider?.phone || '',
    address: provider?.address || '',
    category: provider?.category || 'Plumbing',
    hourlyRate: provider?.hourlyRate || 350,
    experienceYears: provider?.experienceYears || 5,
    bio: provider?.bio || '',
  });

  if (!provider || provider.role !== 'provider') {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-slate-900">Provider Access Required</h2>
        <p className="text-sm text-slate-600 mt-1">Please sign in as a registered service provider.</p>
      </div>
    );
  }

  // Get bookings assigned to this provider
  const providerBookings = bookings.filter((b) => b.providerId === provider.id);

  const pendingRequests = providerBookings.filter((b) => b.status === 'Pending');
  const acceptedJobs = providerBookings.filter((b) => b.status === 'Accepted');
  const completedJobs = providerBookings.filter((b) => b.status === 'Completed');

  const totalEarnings = completedJobs.reduce((sum, b) => sum + b.amount, 0);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProviderProfile(provider.id, profileForm);
    setIsEditingProfile(false);
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Ribbon */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
              {provider.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                  Service Provider Portal
                </span>
                <span className="text-xs text-slate-500 font-mono">ID: {provider.id}</span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 mt-1">{provider.fullName}</h1>
              <p className="text-xs text-slate-500">
                Specialization: <span className="font-semibold text-slate-800">{provider.category}</span> ·{' '}
                {provider.experienceYears} Years Experience
              </p>
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block font-medium">Duty Status</span>
              <span
                className={`text-xs font-bold ${
                  provider.isAvailable ? 'text-emerald-600' : 'text-slate-500'
                }`}
              >
                {provider.isAvailable ? 'Accepting Requests' : 'Busy / Offline'}
              </span>
            </div>
            <button
              onClick={() => toggleProviderAvailability(provider.id)}
              className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 text-xs font-semibold ${
                provider.isAvailable
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
              }`}
            >
              <Power className="w-4 h-4" />
              {provider.isAvailable ? 'Go Offline' : 'Go Online'}
            </button>
          </div>
        </div>

        {/* 4 Stat KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Pending Requests</span>
            <div className="text-2xl font-bold text-amber-600 mt-1 tabular-nums">
              {pendingRequests.length}
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Active Jobs in Progress</span>
            <div className="text-2xl font-bold text-blue-600 mt-1 tabular-nums">
              {acceptedJobs.length}
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Completed Jobs</span>
            <div className="text-2xl font-bold text-emerald-600 mt-1 tabular-nums">
              {completedJobs.length}
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Gross Earnings</span>
            <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
              ₹{totalEarnings}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold text-slate-500">
          <button
            onClick={() => setActiveTab('requests')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'requests'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            Incoming Requests ({pendingRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'active'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Confirmed & Active ({acceptedJobs.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'completed'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            Completed History ({completedJobs.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            Profile & Rates
          </button>
        </div>

        {/* Tab 1: Incoming Pending Requests */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            {pendingRequests.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
                <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No Pending Requests</h3>
                <p className="text-xs text-slate-500 mt-1">
                  New home service requests submitted by customers will appear here for your approval.
                </p>
              </div>
            ) : (
              pendingRequests.map((b) => (
                <div
                  key={b.id}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-600">{b.id}</span>
                      <span className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                        Pending Your Approval
                      </span>
                      <span className="text-xs text-slate-400">· Placed on {b.createdAt}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">
                      Customer: {b.customerName}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {b.date} at {b.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{b.customerPhone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:col-span-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{b.address}</span>
                      </div>
                    </div>

                    {b.notes && (
                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <span className="font-semibold text-slate-700">Problem description:</span> {b.notes}
                      </p>
                    )}
                  </div>

                  {/* Accept / Reject actions */}
                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Service Payment</span>
                      <span className="text-lg font-bold text-slate-900 tabular-nums">₹{b.amount}</span>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <button
                        onClick={() => updateBookingStatus(b.id, 'Cancelled')}
                        className="px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Decline
                      </button>
                      <button
                        onClick={() => updateBookingStatus(b.id, 'Accepted')}
                        className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Accept Job
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Confirmed & Active Jobs */}
        {activeTab === 'active' && (
          <div className="space-y-4">
            {acceptedJobs.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
                <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No Active Jobs</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Once you accept incoming requests, they appear here until completed.
                </p>
              </div>
            ) : (
              acceptedJobs.map((b) => (
                <div
                  key={b.id}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-600">{b.id}</span>
                      <span className="text-xs font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                        Confirmed & Scheduled
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">{b.customerName}</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-semibold text-slate-800">
                          {b.date} at {b.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{b.customerPhone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:col-span-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{b.address}</span>
                      </div>
                    </div>

                    {b.notes && (
                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        {b.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Payout Value</span>
                      <span className="text-lg font-bold text-slate-900 tabular-nums">₹{b.amount}</span>
                    </div>

                    <button
                      onClick={() => updateBookingStatus(b.id, 'Completed')}
                      className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Mark Service Completed
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Completed History */}
        {activeTab === 'completed' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Completed Service Records</h3>
                <p className="text-xs text-slate-500">History of all successfully serviced customer requests</p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                Total Jobs: {completedJobs.length}
              </span>
            </div>

            {completedJobs.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500">
                No completed service history recorded yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3.5">Booking ID</th>
                      <th className="px-5 py-3.5">Customer</th>
                      <th className="px-5 py-3.5">Date & Time</th>
                      <th className="px-5 py-3.5">Location</th>
                      <th className="px-5 py-3.5 text-right">Amount Earned</th>
                      <th className="px-5 py-3.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {completedJobs.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/50">
                        <td className="px-5 py-3.5 font-mono font-bold text-blue-600">{b.id}</td>
                        <td className="px-5 py-3.5 font-semibold text-slate-900">{b.customerName}</td>
                        <td className="px-5 py-3.5 font-mono tabular-nums">{b.date} · {b.time}</td>
                        <td className="px-5 py-3.5 max-w-xs truncate">{b.address}</td>
                        <td className="px-5 py-3.5 text-right font-bold text-slate-900 tabular-nums">
                          ₹{b.amount}
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Completed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Profile & Rates Editor */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Provider Service Profile</h3>
                <p className="text-xs text-slate-500">Update your public category, base visit fee, and professional bio</p>
              </div>
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                {isEditingProfile ? 'Cancel' : 'Edit Details'}
              </button>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 disabled:bg-slate-50 disabled:text-slate-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 disabled:bg-slate-50 disabled:text-slate-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Primary Category</label>
                  <select
                    disabled={!isEditingProfile}
                    value={profileForm.category}
                    onChange={(e) => setProfileForm({ ...profileForm, category: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 disabled:bg-slate-50 disabled:text-slate-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Visit Rate (₹)</label>
                  <input
                    type="number"
                    disabled={!isEditingProfile}
                    value={profileForm.hourlyRate}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, hourlyRate: Number(e.target.value) })
                    }
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 disabled:bg-slate-50 disabled:text-slate-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    disabled={!isEditingProfile}
                    value={profileForm.experienceYears}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, experienceYears: Number(e.target.value) })
                    }
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 disabled:bg-slate-50 disabled:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Operating Address / Service Area</label>
                <input
                  type="text"
                  disabled={!isEditingProfile}
                  value={profileForm.address}
                  onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Professional Bio</label>
                <textarea
                  rows={3}
                  disabled={!isEditingProfile}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>

              {isEditingProfile && (
                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Profile Updates
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
