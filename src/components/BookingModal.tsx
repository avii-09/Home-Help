import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Clock, MapPin, ShieldCheck, Star, FileText, CheckCircle } from 'lucide-react';
import { ServiceProvider } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  initialProvider?: ServiceProvider;
  onSuccess: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialCategory,
  initialProvider,
  onSuccess,
}) => {
  const { currentUser, categories, providers, createBooking, showToast } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || categories[0]?.name || 'Plumbing');
  const [selectedProviderId, setSelectedProviderId] = useState<string>(initialProvider?.id || '');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('10:00 AM');
  const [address, setAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setBookingDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
    if (initialProvider) {
      setSelectedCategory(initialProvider.category);
      setSelectedProviderId(initialProvider.id);
    }
  }, [initialCategory, initialProvider]);

  useEffect(() => {
    if (currentUser?.address && !address) {
      setAddress(currentUser.address);
    }
  }, [currentUser]);

  // Providers matching selected category and active
  const availableProviders = providers.filter(
    (p) => p.category.toLowerCase() === selectedCategory.toLowerCase() && p.isActive
  );

  useEffect(() => {
    if (availableProviders.length > 0 && !availableProviders.some((p) => p.id === selectedProviderId)) {
      setSelectedProviderId(availableProviders[0].id);
    }
  }, [selectedCategory, availableProviders]);

  const activeProvider = providers.find((p) => p.id === selectedProviderId) || availableProviders[0];
  const totalAmount = activeProvider ? activeProvider.hourlyRate : 350;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      showToast('Please sign in or select customer demo login first.', 'warning');
      return;
    }

    if (!selectedProviderId && availableProviders.length === 0) {
      showToast('No active providers currently available in this category.', 'danger');
      return;
    }

    createBooking({
      providerId: activeProvider ? activeProvider.id : availableProviders[0].id,
      serviceCategory: selectedCategory,
      date: bookingDate,
      time: bookingTime,
      address: address || currentUser.address || 'Standard Location',
      notes,
      amount: totalAmount,
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Book a Home Service</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select date, time slot, and certified specialist
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {/* Step 1: Category selection */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Select Required Service
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} (Starts ₹{c.basePrice})
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Choose Specialist */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Select Available Professional
            </label>
            {availableProviders.length === 0 ? (
              <div className="p-3 bg-amber-50 rounded-lg text-xs text-amber-800 border border-amber-200">
                No active specialist registered under this category yet.
              </div>
            ) : (
              <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                {availableProviders.map((p) => {
                  const isSelected = p.id === (activeProvider?.id || selectedProviderId);
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProviderId(p.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/60 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                          {p.fullName.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-900">{p.fullName}</span>
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500">
                            <span>⭐ {p.rating} ({p.reviewCount})</span>
                            <span>·</span>
                            <span>{p.experienceYears} yrs exp</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-900 block tabular-nums">
                          ₹{p.hourlyRate}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">Standard Fee</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Step 3: Date & Time Picker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Service Date</label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Preferred Time Slot</label>
              <select
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="09:00 AM">09:00 AM – 11:00 AM (Morning)</option>
                <option value="11:30 AM">11:30 AM – 01:30 PM (Midday)</option>
                <option value="02:30 PM">02:30 PM – 04:30 PM (Afternoon)</option>
                <option value="05:00 PM">05:00 PM – 07:00 PM (Evening)</option>
              </select>
            </div>
          </div>

          {/* Step 4: Service Address */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Doorstep Service Address
            </label>
            <input
              type="text"
              required
              placeholder="House/Flat number, Building name, Street, Landmark"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Step 5: Issue Notes */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Problem Description / Special Instructions (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Bathroom pipe leakage under the sink, need washers replaced..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Pricing & Confirmation */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-500 block">Total Payable at Completion</span>
              <span className="text-xs text-slate-600">Includes inspection and base diagnosis</span>
            </div>
            <div className="text-lg font-extrabold text-slate-900 tabular-nums">
              ₹{totalAmount}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!activeProvider}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              Confirm Booking Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
