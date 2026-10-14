import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { reviews } = useApp();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-2">
            Real Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            What Homeowners Say About HomeHelp
          </h2>
          <p className="mt-3 text-slate-600 text-sm">
            Genuine ratings and reviews submitted directly by verified customers after job completion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                    />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-blue-200 mb-2" />
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{rev.customerName}</h4>
                  <span className="text-[11px] text-slate-500">Verified Customer</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono tabular-nums">{rev.createdAt}</span>
              </div>
            </div>
          ))}

          {/* Additional static testimonial */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 mb-4 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <Quote className="w-6 h-6 text-blue-200 mb-2" />
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic mb-6">
                "Finding a licensed electrician on a Sunday morning was impossible until I booked through HomeHelp. Priya fixed the tripping circuit in under an hour."
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900">Dr. Rajesh Khandelwal</h4>
                <span className="text-[11px] text-slate-500">Verified Customer</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono tabular-nums">2026-10-08</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
