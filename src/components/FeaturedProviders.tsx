import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, ShieldCheck, MapPin, Clock, Calendar, CheckCircle } from 'lucide-react';
import { ServiceProvider } from '../types';

interface FeaturedProvidersProps {
  onBookProvider: (provider: ServiceProvider) => void;
  selectedCategory?: string;
}

export const FeaturedProviders: React.FC<FeaturedProvidersProps> = ({ onBookProvider, selectedCategory }) => {
  const { providers } = useApp();

  const filteredProviders = selectedCategory
    ? providers.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase() && p.isActive)
    : providers.filter((p) => p.isActive);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
              Top Rated Local Professionals
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Service Providers
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Hand-picked, certified specialists with proven track records and customer satisfaction.
            </p>
          </div>
          {selectedCategory && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span>Showing category:</span>
              <span className="font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-md">
                {selectedCategory}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <div
              key={provider.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar, Name, Category */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 text-white font-bold text-lg flex items-center justify-center shadow-sm shrink-0">
                      {provider.fullName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-slate-900 text-base leading-tight">
                          {provider.fullName}
                        </h3>
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" aria-label="Verified Background" />
                      </div>
                      <span className="text-xs text-blue-600 font-semibold block mt-0.5">
                        {provider.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-lg text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{provider.rating}</span>
                    <span className="text-slate-400 font-normal">({provider.reviewCount})</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {provider.bio}
                </p>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {provider.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                  {provider.skills.length > 3 && (
                    <span className="text-[11px] text-slate-400 px-1 py-0.5">
                      +{provider.skills.length - 3} more
                    </span>
                  )}
                </div>

                {/* Info row */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 py-2 border-t border-slate-100 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{provider.experienceYears} yrs experience</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{provider.address.split(',')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Bottom action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Service rate</span>
                  <div className="text-slate-900 font-extrabold text-base tabular-nums">
                    ₹{provider.hourlyRate} <span className="text-xs text-slate-500 font-normal">/ visit</span>
                  </div>
                </div>

                <button
                  onClick={() => onBookProvider(provider)}
                  disabled={!provider.isAvailable}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                    provider.isAvailable
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  {provider.isAvailable ? 'Book Provider' : 'Currently Busy'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
