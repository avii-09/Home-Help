import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, User, Phone, MapPin, Briefcase, DollarSign, Clock, ShieldCheck } from 'lucide-react';
import { UserRole } from '../types';

interface AuthModalsProps {
  loginOpen: boolean;
  registerOpen: boolean;
  onCloseLogin: () => void;
  onCloseRegister: () => void;
  onSwitchToRegister: () => void;
  onSwitchToLogin: () => void;
}

export const AuthModals: React.FC<AuthModalsProps> = ({
  loginOpen,
  registerOpen,
  onCloseLogin,
  onCloseRegister,
  onSwitchToRegister,
  onSwitchToLogin,
}) => {
  const { login, register, demoLogin, categories } = useApp();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [registerRole, setRegisterRole] = useState<UserRole>('customer');
  const [regForm, setRegForm] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    category: 'Plumbing',
    hourlyRate: 400,
    experienceYears: 4,
    bio: '',
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(loginEmail, loginPassword)) {
      onCloseLogin();
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = register({
      role: registerRole,
      username: regForm.username,
      email: regForm.email,
      fullName: regForm.fullName,
      phone: regForm.phone,
      address: regForm.address,
      category: registerRole === 'provider' ? regForm.category : undefined,
      hourlyRate: registerRole === 'provider' ? Number(regForm.hourlyRate) : undefined,
      experienceYears: registerRole === 'provider' ? Number(regForm.experienceYears) : undefined,
      bio: registerRole === 'provider' ? regForm.bio : undefined,
    });

    if (success) {
      onCloseRegister();
    }
  };

  return (
    <>
      {/* Login Modal */}
      {loginOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Sign In to HomeHelp</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Access customer, provider, or administrator portal
                </p>
              </div>
              <button onClick={onCloseLogin} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Fast 1-Click Demo Buttons for BCA Viva Presentation */}
            <div className="my-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider mb-2">
                ⚡ 1-Click Demo Logins for Viva Examiners:
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    demoLogin('customer');
                    onCloseLogin();
                  }}
                  className="px-2 py-1.5 text-[11px] font-semibold bg-white border border-slate-200 hover:border-blue-400 rounded-md text-slate-800 text-center shadow-xs"
                >
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    demoLogin('provider');
                    onCloseLogin();
                  }}
                  className="px-2 py-1.5 text-[11px] font-semibold bg-white border border-slate-200 hover:border-emerald-400 rounded-md text-slate-800 text-center shadow-xs"
                >
                  Provider
                </button>
                <button
                  type="button"
                  onClick={() => {
                    demoLogin('admin');
                    onCloseLogin();
                  }}
                  className="px-2 py-1.5 text-[11px] font-semibold bg-white border border-slate-200 hover:border-purple-400 rounded-md text-slate-800 text-center shadow-xs"
                >
                  Admin
                </button>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Email Address or Username
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. rahul@example.com or admin"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="Enter password (e.g. pass123)"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm"
              >
                Sign In
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToRegister}
                className="text-blue-600 font-semibold hover:underline"
              >
                Create an Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {registerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Join HomeHelp Platform</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Sign up as a homeowner customer or certified service professional
                </p>
              </div>
              <button onClick={onCloseRegister} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Role Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl my-4 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setRegisterRole('customer')}
                className={`py-2 rounded-lg transition-all ${
                  registerRole === 'customer'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Customer / Client
              </button>
              <button
                type="button"
                onClick={() => setRegisterRole('provider')}
                className={`py-2 rounded-lg transition-all ${
                  registerRole === 'provider'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Service Provider
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={regForm.fullName}
                    onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Username</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. john_d"
                    value={regForm.username}
                    onChange={(e) => setRegForm({ ...regForm, username: e.target.value })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={regForm.email}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={regForm.phone}
                    onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="Create secure password"
                  value={regForm.password}
                  onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Full Service Address / Operating Area
                </label>
                <input
                  type="text"
                  required
                  placeholder="Flat/House, Street, Area, City"
                  value={regForm.address}
                  onChange={(e) => setRegForm({ ...regForm, address: e.target.value })}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Provider Specific Fields */}
              {registerRole === 'provider' && (
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
                  <span className="text-xs font-bold text-emerald-800 block">
                    Service Provider Credentials:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">Category</label>
                      <select
                        value={regForm.category}
                        onChange={(e) => setRegForm({ ...regForm, category: e.target.value })}
                        className="w-full text-xs p-1.5 rounded-lg border border-slate-300 bg-white"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">Visit Fee (₹)</label>
                      <input
                        type="number"
                        value={regForm.hourlyRate}
                        onChange={(e) => setRegForm({ ...regForm, hourlyRate: Number(e.target.value) })}
                        className="w-full text-xs p-1.5 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">Exp (Years)</label>
                      <input
                        type="number"
                        value={regForm.experienceYears}
                        onChange={(e) => setRegForm({ ...regForm, experienceYears: Number(e.target.value) })}
                        className="w-full text-xs p-1.5 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">Short Bio</label>
                    <textarea
                      rows={2}
                      placeholder="Brief note on your qualifications, equipment, and experience..."
                      value={regForm.bio}
                      onChange={(e) => setRegForm({ ...regForm, bio: e.target.value })}
                      className="w-full text-xs p-1.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm"
              >
                Complete Registration
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
              Already registered?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign In Instead
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
