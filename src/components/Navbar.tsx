import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Wrench,
  User as UserIcon,
  LogOut,
  Shield,
  Briefcase,
  CalendarCheck,
  ChevronDown,
  GraduationCap,
  Sparkles,
  Menu,
  X,
  RotateCcw,
} from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  activeView: 'home' | 'services' | 'customer' | 'provider' | 'admin';
  setActiveView: (view: 'home' | 'services' | 'customer' | 'provider' | 'admin') => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onOpenProjectHub: () => void;
  onOpenBooking: (category?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  onOpenLogin,
  onOpenRegister,
  onOpenProjectHub,
  onOpenBooking,
}) => {
  const { currentUser, logout, demoLogin, resetDemoData } = useApp();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'home' | 'services' | 'customer' | 'provider' | 'admin') => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  const handleRoleSwitch = (role: UserRole) => {
    demoLogin(role);
    setRoleMenuOpen(false);
    if (role === 'admin') setActiveView('admin');
    else if (role === 'provider') setActiveView('provider');
    else setActiveView('customer');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Presentation Fast-Switch Ribbon */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sky-400">TY BCA Presentation Mode:</span>
            <span className="text-slate-300 hidden sm:inline">Switch instant demo logins to test all 3 dashboards</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => handleRoleSwitch('customer')}
              className={`px-2.5 py-0.5 rounded text-xs font-medium transition-colors whitespace-nowrap ${
                currentUser?.role === 'customer'
                  ? 'bg-sky-500 text-white font-semibold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Customer (Rahul)
            </button>
            <button
              onClick={() => handleRoleSwitch('provider')}
              className={`px-2.5 py-0.5 rounded text-xs font-medium transition-colors whitespace-nowrap ${
                currentUser?.role === 'provider'
                  ? 'bg-emerald-500 text-white font-semibold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Provider (Ramesh)
            </button>
            <button
              onClick={() => handleRoleSwitch('admin')}
              className={`px-2.5 py-0.5 rounded text-xs font-medium transition-colors whitespace-nowrap ${
                currentUser?.role === 'admin'
                  ? 'bg-purple-500 text-white font-semibold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Admin (System)
            </button>
            <button
              onClick={resetDemoData}
              title="Reset mock data to factory state"
              className="px-2 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 gap-8">
        {/* Zone 1: Brand title */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 block leading-tight">
                HomeHelp
              </span>
              <span className="text-[10px] font-medium text-slate-500 tracking-wide block uppercase">
                Home Services System
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => handleNavClick('home')}
            className={`whitespace-nowrap transition-colors hover:text-blue-600 ${
              activeView === 'home' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className={`whitespace-nowrap transition-colors hover:text-blue-600 ${
              activeView === 'services' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            All Services
          </button>

          {currentUser?.role === 'customer' && (
            <button
              onClick={() => handleNavClick('customer')}
              className={`whitespace-nowrap transition-colors hover:text-blue-600 flex items-center gap-1.5 ${
                activeView === 'customer' ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              My Bookings
            </button>
          )}

          {currentUser?.role === 'provider' && (
            <button
              onClick={() => handleNavClick('provider')}
              className={`whitespace-nowrap transition-colors hover:text-blue-600 flex items-center gap-1.5 ${
                activeView === 'provider' ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Provider Portal
            </button>
          )}

          {currentUser?.role === 'admin' && (
            <button
              onClick={() => handleNavClick('admin')}
              className={`whitespace-nowrap transition-colors hover:text-blue-600 flex items-center gap-1.5 ${
                activeView === 'admin' ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              <Shield className="w-4 h-4" />
              Admin Panel
            </button>
          )}

          <button
            onClick={onOpenProjectHub}
            className="whitespace-nowrap text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-200/60 hover:bg-indigo-100/60 transition-colors"
          >
            <GraduationCap className="w-4 h-4" />
            Project Hub (Viva & Code)
          </button>
        </nav>

        {/* Zone 3: Account Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-slate-800 text-sm font-medium transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                  {currentUser.fullName.charAt(0)}
                </div>
                <div className="text-left hidden sm:block">
                  <span className="text-xs font-semibold block leading-tight truncate max-w-[120px]">
                    {currentUser.fullName}
                  </span>
                  <span className="text-[10px] text-slate-500 capitalize block leading-tight">
                    {currentUser.role}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {roleMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onClick={() => setRoleMenuOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs text-slate-500">Signed in as</p>
                    <p className="text-sm font-semibold text-slate-900 truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 capitalize">
                      {currentUser.role} Dashboard
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        if (currentUser.role === 'admin') setActiveView('admin');
                        else if (currentUser.role === 'provider') setActiveView('provider');
                        else setActiveView('customer');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      Open My Dashboard
                    </button>
                    <button
                      onClick={() => onOpenBooking()}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-blue-500" />
                      Book New Service
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenLogin}
                className="px-3.5 py-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap"
              >
                Sign In
              </button>
              <button
                onClick={onOpenRegister}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors whitespace-nowrap"
              >
                Register
              </button>
            </div>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-2 rounded-lg text-left text-sm font-medium ${
                activeView === 'home' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className={`p-2 rounded-lg text-left text-sm font-medium ${
                activeView === 'services' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => {
                if (currentUser?.role === 'admin') handleNavClick('admin');
                else if (currentUser?.role === 'provider') handleNavClick('provider');
                else handleNavClick('customer');
              }}
              className="p-2 rounded-lg text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProjectHub();
              }}
              className="p-2 rounded-lg text-left text-sm font-medium text-indigo-700 bg-indigo-50"
            >
              BCA Project Hub
            </button>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full py-2 text-center text-sm font-semibold text-white bg-blue-600 rounded-lg"
          >
            Book a Service Now
          </button>
        </div>
      )}
    </header>
  );
};
