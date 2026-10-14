import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CategoryIcon } from './CategoryIcon';
import { Search, Star, Clock, MapPin, Calendar, ShieldCheck, Sparkles, Filter } from 'lucide-react';
import { ServiceProvider } from '../types';

interface ServicesViewProps {
  initialCategory?: string;
  onBookProvider: (provider: ServiceProvider) => void;
  onBookCategory: (categoryName: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  initialCategory,
  onBookProvider,
  onBookCategory,
}) => {
  const { categories, providers } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProviders = providers.filter((p) => {
    if (!p.isActive) return false;
    const matchesCategory =
      selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesQuery =
      p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-2">
            Explore All 7 Services
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Find Your Local Service Professional
          </h1>
          <p className="mt-2 text-slate-600 text-sm">
            Filter by service category or search by specialized task (pipe repairs, rewiring, sanitization, etc.)
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Chips Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.name
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by name, skill, or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category Description Banner if a specific category is selected */}
        {selectedCategory !== 'All' && (
          <div className="p-5 bg-blue-50/70 border border-blue-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-900 text-base">{selectedCategory}</span>
                <span className="text-xs text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full font-medium">
                  {filteredProviders.length} Specialists Available
                </span>
              </div>
              <p className="text-xs text-blue-800 mt-1">
                {categories.find((c) => c.name === selectedCategory)?.description}
              </p>
            </div>
            <button
              onClick={() => onBookCategory(selectedCategory)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors shrink-0"
            >
              Quick Book This Category
            </button>
          </div>
        )}

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No Specialists Found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try selecting "All Categories" or adjusting your search term.
              </p>
            </div>
          ) : (
            filteredProviders.map((provider) => (
              <div
                key={provider.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
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
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
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

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {provider.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 py-2 border-t border-slate-100 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{provider.experienceYears} yrs exp</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{provider.address.split(',')[0]}</span>
                    </div>
                  </div>
                </div>

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
                    {provider.isAvailable ? 'Book Provider' : 'Busy'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
