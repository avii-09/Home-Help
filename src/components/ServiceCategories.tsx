import React from 'react';
import { useApp } from '../context/AppContext';
import { CategoryIcon } from './CategoryIcon';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ServiceCategory } from '../types';

interface ServiceCategoriesProps {
  onSelectCategory: (categoryName: string) => void;
  onBookCategory: (categoryName: string) => void;
}

export const ServiceCategories: React.FC<ServiceCategoriesProps> = ({ onSelectCategory, onBookCategory }) => {
  const { categories, providers } = useApp();

  const getProviderCount = (categoryName: string) => {
    return providers.filter((p) => p.category === categoryName && p.isActive).length;
  };

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-2">
            Home Services Directory
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Popular Service Categories
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Professional doorstep services backed by certified local technicians and upfront standard pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat: ServiceCategory) => {
            const count = getProviderCount(cat.name);
            return (
              <div
                key={cat.id}
                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                      <CategoryIcon name={cat.name} iconName={cat.icon} className="w-6 h-6" />
                    </div>
                    {cat.popular && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                        <Sparkles className="w-3 h-3 text-blue-500" />
                        Popular
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span>Starting from</span>
                    <span className="text-slate-900 font-bold text-sm tabular-nums">₹{cat.basePrice}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectCategory(cat.name)}
                      className="px-2.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-center"
                    >
                      View ({count})
                    </button>
                    <button
                      onClick={() => onBookCategory(cat.name)}
                      className="px-2.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-center flex items-center justify-center gap-1"
                    >
                      Book Now
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
