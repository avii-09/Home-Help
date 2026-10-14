import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Star, MessageSquare } from 'lucide-react';
import { Booking } from '../types';

interface ReviewModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ booking, onClose }) => {
  const { addReview } = useApp();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  if (!booking) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addReview({
      bookingId: booking.id,
      providerId: booking.providerId,
      rating,
      comment,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Rate & Review Service</h3>
            <p className="text-xs text-slate-500">{booking.serviceCategory} · {booking.providerName}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="text-center py-2">
            <label className="text-xs font-semibold text-slate-700 block mb-2">
              How was your experience?
            </label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-slate-600 mt-1 block">
              {rating === 5 && 'Outstanding! Highly Recommended'}
              {rating === 4 && 'Very Good & Professional'}
              {rating === 3 && 'Average Service'}
              {rating === 2 && 'Below Expectations'}
              {rating === 1 && 'Poor Experience'}
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Your Review & Comments
            </label>
            <textarea
              rows={3}
              required
              placeholder="Describe punctuality, quality of work, cleanliness, and overall satisfaction..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
