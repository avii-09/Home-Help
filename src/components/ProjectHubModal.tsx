import React, { useState } from 'react';
import JSZip from 'jszip';
import {
  X,
  Download,
  Copy,
  Check,
  GraduationCap,
  FileCode,
  Database,
  HelpCircle,
  Terminal,
  FolderTree,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { FLASK_PROJECT_FILES, VIVA_QUESTIONS } from '../data/mockData';

interface ProjectHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectHubModal: React.FC<ProjectHubModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'code' | 'schema' | 'viva' | 'setup' | 'errors'>('code');
  const [selectedFileIdx, setSelectedFileIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [downloadingZip, setDownloadingZip] = useState(false);

  if (!isOpen) return null;

  const currentFile = FLASK_PROJECT_FILES[selectedFileIdx];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setDownloadingZip(true);
      const zip = new JSZip();

      // Root files
      FLASK_PROJECT_FILES.forEach((f) => {
        zip.file(f.path, f.content);
      });

      // Add a comprehensive README.md
      const readmeContent = `# HomeHelp - Online Home Services Booking System
TY BCA Final Year College Capstone Project

## 1. Project Overview
HomeHelp is an online home services booking web application built using Python Flask, SQLite, and Bootstrap 5.
It bridges customers and certified home service professionals (plumbers, electricians, cleaners, mechanics, chauffeurs, and home healthcare doctors).

## 2. Requirements & Setup
- Python 3.10 or higher
- Visual Studio Code or any text editor

### Setup Virtual Environment:
\`\`\`bash
python -m venv venv
# Windows:
venv\\Scripts\\activate
# Mac/Linux:
source venv/bin/activate
\`\`\`

### Install Dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

### Run Application:
\`\`\`bash
python app.py
\`\`\`

Access the live application at: http://127.0.0.1:5000

## 3. Default Demo Credentials
- Admin: admin@homehelp.com / admin123
- Customer: rahul@example.com / pass123
- Provider: ramesh@homehelp.com / pass123

## 4. Academic Project Roles
1. Customer: Browse services, book appointments, track status, cancel bookings, leave ratings.
2. Provider: Manage availability, accept/reject requests, mark services completed, view earnings.
3. Admin: Manage users, activate/deactivate providers, maintain service categories, monitor all bookings.
`;
      zip.file('README.md', readmeContent);

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'HomeHelp_Flask_College_Project.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to bundle ZIP', err);
    } finally {
      setDownloadingZip(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-5xl w-full p-6 shadow-2xl border border-slate-100 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">
                  TY BCA Final Year Capstone Hub
                </h2>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                  Viva & Code Deliverables
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Complete Python Flask source code, SQLite database schemas, examiner viva Q&A, and run commands.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadZip}
              disabled={downloadingZip}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              {downloadingZip ? 'Packing ZIP...' : 'Download Full Project ZIP'}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 pt-3 pb-2 border-b border-slate-100 overflow-x-auto shrink-0 text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'code' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-100'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            Python Flask Source Files ({FLASK_PROJECT_FILES.length})
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'schema' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-100'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            Database & ER Diagram
          </button>
          <button
            onClick={() => setActiveTab('viva')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'viva' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Viva Voce Q&A ({VIVA_QUESTIONS.length})
          </button>
          <button
            onClick={() => setActiveTab('setup')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'setup' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-100'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Windows & VS Code Setup
          </button>
          <button
            onClick={() => setActiveTab('errors')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'errors' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-100'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            Common Errors & Fixes
          </button>
        </div>

        {/* Tab 1: Code Browser */}
        {activeTab === 'code' && (
          <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {/* Left sidebar: File Tree */}
            <div className="md:col-span-1 border border-slate-200 rounded-xl p-3 bg-slate-50 overflow-y-auto max-h-[60vh]">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Project Files
              </span>
              <div className="space-y-1">
                {FLASK_PROJECT_FILES.map((file, idx) => (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFileIdx(idx)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors truncate block ${
                      selectedFileIdx === idx
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {file.path}
                  </button>
                ))}
              </div>
            </div>

            {/* Right side: Code view */}
            <div className="md:col-span-3 border border-slate-200 rounded-xl overflow-hidden flex flex-col bg-slate-900 text-slate-100">
              <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-sky-400">{currentFile.path}</span>
                  <span className="text-[11px] text-slate-400 ml-2 hidden sm:inline">
                    · {currentFile.description}
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 text-xs font-semibold bg-slate-700 hover:bg-slate-600 text-white rounded flex items-center gap-1 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy File'}
                </button>
              </div>

              <pre className="p-4 text-xs font-mono overflow-auto flex-1 max-h-[55vh] text-slate-200 leading-relaxed">
                <code>{currentFile.content}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Tab 2: Database Schema & ER Diagram */}
        {activeTab === 'schema' && (
          <div className="flex-1 overflow-y-auto mt-4 space-y-6 pr-2 max-h-[62vh]">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-2">Relational SQLite Schema Overview</h3>
              <p className="text-xs text-slate-600">
                The database <code className="font-mono bg-white px-1.5 py-0.5 rounded border">instance/homehelp.db</code> is normalized with primary keys, foreign key constraints, and indexed lookups.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Table 1: Users */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="font-mono font-bold text-xs text-blue-600">users (Entity)</span>
                  <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-semibold">
                    Primary Table
                  </span>
                </div>
                <ul className="text-xs space-y-1 font-mono text-slate-700">
                  <li><span className="text-amber-600 font-bold">id</span> INTEGER PRIMARY KEY AUTOINCREMENT</li>
                  <li>username VARCHAR(100) UNIQUE NOT NULL</li>
                  <li>email VARCHAR(150) UNIQUE NOT NULL</li>
                  <li>password VARCHAR(255) (PBKDF2 Salted Hash)</li>
                  <li>role VARCHAR(20) ('customer' | 'provider' | 'admin')</li>
                  <li>full_name VARCHAR(150) NOT NULL</li>
                  <li>phone VARCHAR(20)</li>
                  <li>address VARCHAR(255)</li>
                  <li>category VARCHAR(100) (Provider only)</li>
                  <li>hourly_rate INTEGER (Provider only)</li>
                  <li>experience_years INTEGER (Provider only)</li>
                  <li>is_active BOOLEAN DEFAULT 1</li>
                  <li>is_available BOOLEAN DEFAULT 1</li>
                </ul>
              </div>

              {/* Table 2: Bookings */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="font-mono font-bold text-xs text-emerald-600">bookings (Entity)</span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-semibold">
                    Transaction Core
                  </span>
                </div>
                <ul className="text-xs space-y-1 font-mono text-slate-700">
                  <li><span className="text-amber-600 font-bold">id</span> INTEGER PRIMARY KEY AUTOINCREMENT</li>
                  <li><span className="text-indigo-600 font-bold">customer_id</span> INT FK → users.id</li>
                  <li><span className="text-indigo-600 font-bold">provider_id</span> INT FK → users.id</li>
                  <li>service_name VARCHAR(100) NOT NULL</li>
                  <li>date VARCHAR(50) NOT NULL</li>
                  <li>time VARCHAR(50) NOT NULL</li>
                  <li>address VARCHAR(255) NOT NULL</li>
                  <li>notes TEXT</li>
                  <li>amount INTEGER NOT NULL</li>
                  <li>status VARCHAR(30) ('Pending'|'Accepted'|'Completed'|'Cancelled')</li>
                  <li>created_at DATETIME DEFAULT CURRENT_TIMESTAMP</li>
                </ul>
              </div>

              {/* Table 3: Categories */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="font-mono font-bold text-xs text-purple-600">categories</span>
                  <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-semibold">
                    Catalog Master
                  </span>
                </div>
                <ul className="text-xs space-y-1 font-mono text-slate-700">
                  <li><span className="text-amber-600 font-bold">id</span> INTEGER PRIMARY KEY AUTOINCREMENT</li>
                  <li>name VARCHAR(100) UNIQUE NOT NULL</li>
                  <li>icon VARCHAR(50) DEFAULT 'fa-tools'</li>
                  <li>description VARCHAR(255)</li>
                  <li>base_price INTEGER DEFAULT 350</li>
                </ul>
              </div>

              {/* Table 4: Reviews */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="font-mono font-bold text-xs text-amber-600">reviews</span>
                  <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-semibold">
                    Reputation Feedback
                  </span>
                </div>
                <ul className="text-xs space-y-1 font-mono text-slate-700">
                  <li><span className="text-amber-600 font-bold">id</span> INTEGER PRIMARY KEY AUTOINCREMENT</li>
                  <li><span className="text-indigo-600 font-bold">booking_id</span> INT FK → bookings.id</li>
                  <li><span className="text-indigo-600 font-bold">provider_id</span> INT FK → users.id</li>
                  <li>customer_name VARCHAR(100) NOT NULL</li>
                  <li>rating INTEGER (1 to 5)</li>
                  <li>comment TEXT</li>
                  <li>created_at DATETIME</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Viva Voce Q&A */}
        {activeTab === 'viva' && (
          <div className="flex-1 overflow-y-auto mt-4 space-y-4 pr-2 max-h-[62vh]">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
              💡 <strong>Pro Tip for BCA Viva:</strong> External university examiners frequently ask about MVC separation, password salting, SQLite session concurrency, and how user roles are validated. Review these curated answers:
            </div>

            <div className="space-y-3">
              {VIVA_QUESTIONS.map((item, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {item.category}
                    </span>
                    <span className="text-xs font-bold text-indigo-700">Q{i + 1}:</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-2">{item.question}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Windows & VS Code Terminal Guide */}
        {activeTab === 'setup' && (
          <div className="flex-1 overflow-y-auto mt-4 space-y-6 pr-2 max-h-[62vh] text-xs text-slate-700">
            <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                Step-by-Step Execution in VS Code (Windows / Mac)
              </h3>

              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-semibold text-slate-900 mb-1">Step 1: Create Project Directory</p>
                  <pre className="bg-slate-900 text-slate-100 p-2.5 rounded font-mono text-xs overflow-x-auto">
                    <code>mkdir HomeHelp && cd HomeHelp</code>
                  </pre>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-semibold text-slate-900 mb-1">Step 2: Create Python Virtual Environment</p>
                  <pre className="bg-slate-900 text-slate-100 p-2.5 rounded font-mono text-xs overflow-x-auto">
                    <code>python -m venv venv{"\n"}# On Windows:{"\n"}venv\Scripts\activate{"\n"}# On Mac/Linux:{"\n"}source venv/bin/activate</code>
                  </pre>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-semibold text-slate-900 mb-1">Step 3: Install Required Libraries</p>
                  <pre className="bg-slate-900 text-slate-100 p-2.5 rounded font-mono text-xs overflow-x-auto">
                    <code>pip install flask flask-sqlalchemy flask-login werkzeug</code>
                  </pre>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-semibold text-slate-900 mb-1">Step 4: Launch Flask Application</p>
                  <pre className="bg-slate-900 text-slate-100 p-2.5 rounded font-mono text-xs overflow-x-auto">
                    <code>python app.py</code>
                  </pre>
                  <p className="text-slate-500 mt-2">
                    Open your web browser and navigate to: <code className="font-mono font-bold text-blue-600">http://127.0.0.1:5000</code>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Common Errors & Fixes */}
        {activeTab === 'errors' && (
          <div className="flex-1 overflow-y-auto mt-4 space-y-4 pr-2 max-h-[62vh] text-xs">
            <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
              <h4 className="font-bold text-rose-600 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                Error: "Port 5000 is already in use" (Address already in use)
              </h4>
              <p className="text-slate-600">
                <strong>Solution:</strong> Another background service or AirPlay on Mac is holding port 5000. In <code className="font-mono">app.py</code>, change the last line to:
              </p>
              <pre className="bg-slate-900 text-slate-100 p-2 rounded font-mono text-xs">
                <code>app.run(debug=True, port=8000)</code>
              </pre>
              <p className="text-slate-600">Then visit http://127.0.0.1:8000 instead.</p>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
              <h4 className="font-bold text-rose-600 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                Error: "ModuleNotFoundError: No module named 'flask'"
              </h4>
              <p className="text-slate-600">
                <strong>Solution:</strong> The virtual environment is either not activated, or libraries were installed under a different Python interpreter. Run:
              </p>
              <pre className="bg-slate-900 text-slate-100 p-2 rounded font-mono text-xs">
                <code>python -m pip install flask flask-sqlalchemy flask-login werkzeug</code>
              </pre>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
              <h4 className="font-bold text-rose-600 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                Error: "sqlite3.OperationalError: no such table: users"
              </h4>
              <p className="text-slate-600">
                <strong>Solution:</strong> The SQLite database schema was not initialized. Call <code className="font-mono">init_db()</code> before <code className="font-mono">app.run()</code> or delete any corrupt <code className="font-mono">instance/homehelp.db</code> file so Flask creates it fresh.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
