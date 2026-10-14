import React, { useState } from 'react';
import { Search, ShieldCheck, Clock, Award, Star, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HeroProps {
  onSearch: (query: string, category?: string) => void;
  onSelectCategory: (categoryName: string) => void;
  onOpenBooking: (categoryName?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onSelectCategory, onOpenBooking }) => {
  const { categories } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, selectedCat === 'all' ? undefined : selectedCat);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-slate-900 text-white py-16 lg:py-24">
      {/* Subtle decorative grid mesh background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-200 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            Reliable Doorstep Assistance · 7 Essential Services
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight [text-wrap:balance]">
            Your Home Services, <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-200 to-white">Just One Click Away</span>
          </h1>

          <p className="text-lg sm:text-xl text-blue-100/90 mb-10 leading-relaxed font-normal [text-wrap:balance]">
            Instantly connect with certified plumbers, electricians, cleaners, mechanics, drivers, and home healthcare doctors right in your locality.
          </p>

          {/* Search Bar Container */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-2 rounded-2xl shadow-2xl shadow-blue-950/40 border border-white/20 flex flex-col md:flex-row items-center gap-2 max-w-2xl mx-auto text-slate-800"
          >
            <div className="flex items-center gap-2 px-3 w-full md:w-auto md:border-r border-slate-200 py-1">
              <select
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer py-1.5 w-full"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 px-3 flex-1 w-full py-1">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search plumbing, wiring, house cleaning, mechanic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-sm placeholder:text-slate-400 text-slate-900 bg-transparent focus:outline-none py-1.5"
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 shrink-0"
            >
              Search
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Popular Tag Shortcuts */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-blue-200">
            <span className="text-blue-300 font-medium">Trending:</span>
            {['Plumbing', 'Electrical Services', 'Home Cleaning', 'Doctor & Home Healthcare'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onSelectCategory(tag)}
                className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Item Trust Strip (Constitutional Rule: placed in full-width row below hero) */}
        <div className="mt-14 pt-8 border-t border-blue-700/50 grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Verified Experts</p>
              <p className="text-xs text-blue-200/80">Background-checked & skill tested</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Standard Pricing</p>
              <p className="text-xs text-blue-200/80">Upfront rates with zero surprise charges</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">On-Time Arrival</p>
              <p className="text-xs text-blue-200/80">Schedule for today or future dates</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">4.8+ Rating</p>
              <p className="text-xs text-blue-200/80">Over 1,200 verified customer reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
