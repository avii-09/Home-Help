import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  Users,
  Briefcase,
  Layers,
  CalendarCheck,
  TrendingUp,
  PlusCircle,
  Trash2,
  CheckCircle,
  XCircle,
  ToggleLeft,
  ToggleRight,
  Search,
  Filter,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';
import { CategoryIcon } from './CategoryIcon';
import { BookingStatus, ServiceCategory } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    categories,
    providers,
    customers,
    bookings,
    addCategory,
    deleteCategory,
    toggleProviderActive,
    updateBookingStatus,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'customers' | 'providers' | 'categories' | 'bookings'>('overview');
  const [bookingFilter, setBookingFilter] = useState<'All' | BookingStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Category addition modal/form state
  const [showAddCatModal, setShowAddCatModal] = useState(false);
  const [newCat, setNewCat] = useState({
    name: '',
    icon: 'Wrench',
    description: '',
    basePrice: 400,
  });

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-slate-900">Administrator Privileges Required</h2>
        <p className="text-sm text-slate-600 mt-1">
          Please sign in as the administrator (admin@homehelp.com).
        </p>
      </div>
    );
  }

  const completedBookings = bookings.filter((b) => b.status === 'Completed');
  const totalVolume = completedBookings.reduce((sum, b) => sum + b.amount, 0);

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = bookingFilter === 'All' || b.status === bookingFilter;
    const matchesSearch =
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.serviceCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.name.trim()) return;
    addCategory(newCat);
    setNewCat({ name: '', icon: 'Wrench', description: '', basePrice: 400 });
    setShowAddCatModal(false);
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Ribbon */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md shadow-purple-500/20 shrink-0">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-800">
                  Master Control Panel
                </span>
                <span className="text-xs text-slate-500">Root Access</span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
                HomeHelp Administration
              </h1>
              <p className="text-xs text-slate-500">
                System telemetry, user auditing, service catalog maintenance, and platform bookings monitor.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddCatModal(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              Add Service Category
            </button>
          </div>
        </div>

        {/* 5 Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Registered Clients</span>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 tabular-nums">{customers.length}</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Service Providers</span>
              <Briefcase className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 tabular-nums">{providers.length}</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Active Categories</span>
              <Layers className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 tabular-nums">{categories.length}</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Total Bookings</span>
              <CalendarCheck className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 tabular-nums">{bookings.length}</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm col-span-2 md:col-span-1">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Total Volume</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-emerald-600 tabular-nums">₹{totalVolume}</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold text-slate-500 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-purple-600 text-purple-700 font-bold'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Platform Activity
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`pb-3 border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'border-purple-600 text-purple-700 font-bold'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            All Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('providers')}
            className={`pb-3 border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'providers'
                ? 'border-purple-600 text-purple-700 font-bold'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Manage Providers ({providers.length})
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`pb-3 border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'customers'
                ? 'border-purple-600 text-purple-700 font-bold'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            Manage Customers ({customers.length})
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`pb-3 border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'categories'
                ? 'border-purple-600 text-purple-700 font-bold'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            Service Categories ({categories.length})
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-4">Recent Bookings Stream</h3>
              <div className="space-y-3">
                {bookings.slice(0, 5).map((b) => (
                  <div
                    key={b.id}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                        {b.serviceCategory.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-blue-600">{b.id}</span>
                          <span className="text-xs font-semibold text-slate-800">{b.serviceCategory}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {b.customerName} → {b.providerName}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-900 block tabular-nums">₹{b.amount}</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                          b.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : b.status === 'Accepted'
                            ? 'bg-blue-50 text-blue-700'
                            : b.status === 'Pending'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Security & Architecture Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">Project Architecture Status</h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block font-medium">Backend Server</span>
                  <span className="font-bold text-slate-800">Python 3.10+ / Flask WSGI</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block font-medium">Relational Database Engine</span>
                  <span className="font-bold text-slate-800">SQLite3 (homehelp.db)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block font-medium">Password Encryption</span>
                  <span className="font-bold text-slate-800">PBKDF2:SHA256 (Salted Hashes)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block font-medium">Session Controller</span>
                  <span className="font-bold text-slate-800">Flask-Login & Signed Cookies</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: All Bookings Audit */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by Booking ID, customer or provider..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
                />
              </div>

              {/* Status pills */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600 overflow-x-auto">
                {(['All', 'Pending', 'Accepted', 'Completed', 'Cancelled'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setBookingFilter(st)}
                    className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
                      bookingFilter === st ? 'bg-white text-slate-900 shadow-sm font-semibold' : ''
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5">ID</th>
                    <th className="px-5 py-3.5">Service</th>
                    <th className="px-5 py-3.5">Customer</th>
                    <th className="px-5 py-3.5">Provider</th>
                    <th className="px-5 py-3.5">Scheduled Slot</th>
                    <th className="px-5 py-3.5 text-right">Fee</th>
                    <th className="px-5 py-3.5 text-center">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/50">
                      <td className="px-5 py-3.5 font-mono font-bold text-purple-600">{b.id}</td>
                      <td className="px-5 py-3.5 font-semibold text-slate-900">{b.serviceCategory}</td>
                      <td className="px-5 py-3.5">{b.customerName}</td>
                      <td className="px-5 py-3.5">{b.providerName}</td>
                      <td className="px-5 py-3.5 font-mono tabular-nums">{b.date} · {b.time}</td>
                      <td className="px-5 py-3.5 text-right font-bold text-slate-900 tabular-nums">₹{b.amount}</td>
                      <td className="px-5 py-3.5 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            b.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : b.status === 'Accepted'
                              ? 'bg-blue-50 text-blue-700'
                              : b.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {b.status !== 'Completed' && b.status !== 'Cancelled' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'Cancelled')}
                            className="text-rose-600 hover:text-rose-800 text-[11px] font-semibold underline"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Providers Management */}
        {activeTab === 'providers' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Registered Service Providers</h3>
              <p className="text-xs text-slate-500">
                Audit provider credentials, service categories, and toggle account activation status
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5">Provider Name</th>
                    <th className="px-5 py-3.5">Category</th>
                    <th className="px-5 py-3.5">Contact</th>
                    <th className="px-5 py-3.5">Rating & Jobs</th>
                    <th className="px-5 py-3.5 text-right">Rate</th>
                    <th className="px-5 py-3.5 text-center">Active Status</th>
                    <th className="px-5 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {providers.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50">
                      <td className="px-5 py-3.5">
                        <div className="font-bold text-slate-900">{p.fullName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">@{p.username}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-semibold text-blue-600">{p.category}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div>{p.email}</div>
                        <div className="text-slate-400">{p.phone}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-slate-800">⭐ {p.rating} / 5.0</div>
                        <div className="text-slate-400 text-[11px]">{p.reviewCount} reviews</div>
                      </td>
                      <td className="px-5 py-3.5 text-right font-bold text-slate-900 tabular-nums">
                        ₹{p.hourlyRate}
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            p.isActive
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {p.isActive ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {p.isActive ? 'Active' : 'Deactivated'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => toggleProviderActive(p.id)}
                          className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                            p.isActive
                              ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          }`}
                        >
                          {p.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Customers Management */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Registered Homeowners</h3>
              <p className="text-xs text-slate-500">Customer accounts, addresses, and registration records</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5">Customer Name</th>
                    <th className="px-5 py-3.5">Username</th>
                    <th className="px-5 py-3.5">Email</th>
                    <th className="px-5 py-3.5">Phone</th>
                    <th className="px-5 py-3.5">Saved Service Address</th>
                    <th className="px-5 py-3.5">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {customers.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/50">
                      <td className="px-5 py-3.5 font-bold text-slate-900">{c.fullName}</td>
                      <td className="px-5 py-3.5 font-mono text-slate-500">@{c.username}</td>
                      <td className="px-5 py-3.5">{c.email}</td>
                      <td className="px-5 py-3.5 font-mono tabular-nums">{c.phone}</td>
                      <td className="px-5 py-3.5 max-w-xs truncate">{c.address}</td>
                      <td className="px-5 py-3.5 font-mono text-slate-400 tabular-nums">{c.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Categories Management */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat: ServiceCategory) => (
                <div
                  key={cat.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                        <CategoryIcon name={cat.name} iconName={cat.icon} className="w-5 h-5" />
                      </div>
                      <button
                        onClick={() => deleteCategory(cat.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors"
                        title="Delete category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm">{cat.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{cat.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Base Tariff</span>
                    <span className="font-bold text-slate-900 tabular-nums">₹{cat.basePrice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Category Modal */}
      {showAddCatModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base">Create Service Category</h3>
              <button
                onClick={() => setShowAddCatModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCategorySubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Carpentry & Furniture"
                  value={newCat.name}
                  onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Base Price (₹)</label>
                <input
                  type="number"
                  required
                  value={newCat.basePrice}
                  onChange={(e) => setNewCat({ ...newCat, basePrice: Number(e.target.value) })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Brief summary of tasks covered under this category..."
                  value={newCat.description}
                  onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCatModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-sm"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
