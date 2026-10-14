import React from 'react';
import { Wrench, Phone, Mail, MapPin, GraduationCap, Github } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (categoryName: string) => void;
  onOpenProjectHub: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenProjectHub }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white block leading-tight">
                  HomeHelp
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase block">
                  Online Home Services System
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-6">
              A comprehensive web application designed to connect homeowners with verified local plumbers, electricians, cleaners, mechanics, chauffeurs, and home visiting physicians.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-indigo-300">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              <span>TY BCA Final Year Project (2026 Batch)</span>
            </div>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                'Plumbing',
                'Electrical Services',
                'Home Cleaning',
                'Vehicle Mechanics',
                'Drivers',
                'Technical Services',
                'Doctor & Home Healthcare',
              ].map((name) => (
                <li key={name}>
                  <button
                    onClick={() => onSelectCategory(name)}
                    className="hover:text-white transition-colors text-slate-400"
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Project Resources */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              BCA Project Hub
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={onOpenProjectHub}
                  className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1.5"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  Python Flask Code Files
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenProjectHub}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  SQLite ER Diagram & Schema
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenProjectHub}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  25 Viva Questions & Answers
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenProjectHub}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  VS Code Windows Setup Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Help & Contact
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Central Hub, Shivaji Nagar, Pune, Maharashtra 411005</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="tabular-nums">+91 98765 00001 (Toll-Free)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>support@homehelp.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center sm:flex sm:items-center sm:justify-between text-xs text-slate-500">
          <p>© 2026 HomeHelp – Online Home Services Booking System. Built with Python Flask & React.</p>
          <div className="mt-4 sm:mt-0 flex items-center justify-center gap-4">
            <span className="text-slate-400">Database: SQLite3</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">Framework: Flask & Bootstrap 5</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">TY BCA Presentation Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
