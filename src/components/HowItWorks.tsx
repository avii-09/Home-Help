import React from 'react';
import { Search, CalendarCheck, Home, CheckCircle2, ShieldAlert, Award } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-2">
            Seamless Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How HomeHelp Works
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Book professional assistance in 3 easy steps from your phone or computer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative z-10 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl mb-6 shadow-inner">
              <Search className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Step 01</span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Select Your Service</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore 7 essential home services, inspect provider credentials, verified ratings, and transparent pricing.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative z-10 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl mb-6 shadow-inner">
              <CalendarCheck className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Step 02</span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Schedule & Confirm</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pick your preferred date, time slot, and location. The service provider receives the request and accepts it.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative z-10 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl mb-6 shadow-inner">
              <Home className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Step 03</span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Hassle-Free Delivery</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The technician arrives at your doorstep, solves the issue, marks it done, and you can rate the experience.
            </p>
          </div>
        </div>

        {/* Why Choose HomeHelp Section */}
        <div className="mt-20 pt-16 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-2">
              Customer Assurance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Choose HomeHelp?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-2">100% Background-Verified</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every service professional undergoes police verification and skill screening before activation.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Standard Honest Rates</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear base tariffs agreed upon before booking. No hidden travel fees or surprise add-ons.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Real-Time Status Updates</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Track status directly from your dashboard: Pending → Accepted → Completed.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Service Guarantee</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Free re-work support if work does not match agreed standards within 7 days of completion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
