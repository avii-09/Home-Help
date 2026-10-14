import { ServiceCategory, ServiceProvider, Customer, User, Booking, Review, FlaskProjectFile, VivaQuestion } from '../types';

export const INITIAL_CATEGORIES: ServiceCategory[] = [
  {
    id: 'cat-1',
    name: 'Plumbing',
    icon: 'Wrench',
    description: 'Pipe repairs, tap fitting, leak detection, drainage, bathroom installations.',
    basePrice: 350,
    popular: true,
  },
  {
    id: 'cat-2',
    name: 'Electrical Services',
    icon: 'Zap',
    description: 'Wiring, circuit repairs, appliance setup, switchboard fixing, fan & light setup.',
    basePrice: 400,
    popular: true,
  },
  {
    id: 'cat-3',
    name: 'Home Cleaning',
    icon: 'Sparkles',
    description: 'Full house deep cleaning, kitchen degreasing, bathroom disinfection, sofa sanitization.',
    basePrice: 600,
    popular: true,
  },
  {
    id: 'cat-4',
    name: 'Vehicle Mechanics',
    icon: 'Car',
    description: 'On-spot two-wheeler & four-wheeler servicing, battery jumpstart, puncture repair.',
    basePrice: 500,
    popular: false,
  },
  {
    id: 'cat-5',
    name: 'Drivers',
    icon: 'Compass',
    description: 'Verified personal drivers for daily city transit, outstation trips, and luxury cars.',
    basePrice: 450,
    popular: false,
  },
  {
    id: 'cat-6',
    name: 'Technical Services',
    icon: 'Laptop',
    description: 'PC/Laptop repair, Wi-Fi router setup, CCTV camera fitting, smart home gadget config.',
    basePrice: 450,
    popular: true,
  },
  {
    id: 'cat-7',
    name: 'Doctor & Home Healthcare',
    icon: 'HeartPulse',
    description: 'Qualified general physician house visits, vitals checkup, elderly care, nurse assistance.',
    basePrice: 700,
    popular: true,
  },
];

export const INITIAL_ADMIN: User = {
  id: 'usr-admin-1',
  username: 'admin',
  email: 'admin@homehelp.com',
  role: 'admin',
  fullName: 'System Administrator',
  phone: '+91 98765 00001',
  address: 'Central Admin Office, Metro Tower 4, Tech City',
  createdAt: '2026-01-01',
};

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'usr-cust-1',
    username: 'rahul_sharma',
    email: 'rahul@example.com',
    role: 'customer',
    fullName: 'Rahul Sharma',
    phone: '+91 98221 45012',
    address: 'Flat 402, Sunshine Heights, MG Road, Pune',
    createdAt: '2026-02-10',
  },
  {
    id: 'usr-cust-2',
    username: 'anita_deshmukh',
    email: 'anita@example.com',
    role: 'customer',
    fullName: 'Anita Deshmukh',
    phone: '+91 97654 32189',
    address: 'Bungalow 12, Green Glen Society, Baner, Pune',
    createdAt: '2026-02-15',
  },
];

export const INITIAL_PROVIDERS: ServiceProvider[] = [
  {
    id: 'usr-prov-1',
    username: 'ramesh_plumber',
    email: 'ramesh@homehelp.com',
    role: 'provider',
    fullName: 'Ramesh Patil',
    phone: '+91 91234 56789',
    address: 'Shop 4, Market Yard, Swargate, Pune',
    category: 'Plumbing',
    experienceYears: 8,
    rating: 4.9,
    reviewCount: 42,
    hourlyRate: 350,
    bio: 'Certified plumbing technician with 8+ years experience in domestic pipe fittings, geyser installation, and leak detection.',
    skills: ['Pipe Fitting', 'Tap Repair', 'Geyser Installation', 'Drain Unclogging'],
    isAvailable: true,
    isActive: true,
    createdAt: '2026-01-12',
  },
  {
    id: 'usr-prov-2',
    username: 'priya_electrician',
    email: 'priya@homehelp.com',
    role: 'provider',
    fullName: 'Priya Sen',
    phone: '+91 92345 67890',
    address: 'Block C-10, Shivajinagar, Pune',
    category: 'Electrical Services',
    experienceYears: 6,
    rating: 4.8,
    reviewCount: 38,
    hourlyRate: 400,
    bio: 'Government licensed wireman & electrical contractor specializing in modern home rewiring, fuse fixes, and inverter setups.',
    skills: ['Short Circuit Repair', 'Inverter Setup', 'LED Lighting', 'Switchboard Assembly'],
    isAvailable: true,
    isActive: true,
    createdAt: '2026-01-18',
  },
  {
    id: 'usr-prov-3',
    username: 'sunil_cleaner',
    email: 'sunil@homehelp.com',
    role: 'provider',
    fullName: 'Sunil Jadhav',
    phone: '+91 93456 78901',
    address: 'Kothrud Industrial Area, Pune',
    category: 'Home Cleaning',
    experienceYears: 5,
    rating: 4.7,
    reviewCount: 29,
    hourlyRate: 550,
    bio: 'Lead organizer of a 4-person professional deep cleaning team with eco-friendly sanitization solutions.',
    skills: ['Deep Home Cleaning', 'Kitchen Degreasing', 'Sofa Shampooing', 'Disinfection'],
    isAvailable: true,
    isActive: true,
    createdAt: '2026-02-01',
  },
  {
    id: 'usr-prov-4',
    username: 'vikram_mechanic',
    email: 'vikram@homehelp.com',
    role: 'provider',
    fullName: 'Vikram Joshi',
    phone: '+91 94567 89012',
    address: 'Auto Hub, Aundh, Pune',
    category: 'Vehicle Mechanics',
    experienceYears: 10,
    rating: 4.9,
    reviewCount: 51,
    hourlyRate: 500,
    bio: 'Experienced automobile technician offering on-spot doorstep diagnostics, brake repairs, and engine maintenance.',
    skills: ['Car Diagnostics', 'Brake Service', 'Battery Replacement', 'Doorstep Servicing'],
    isAvailable: true,
    isActive: true,
    createdAt: '2026-01-25',
  },
  {
    id: 'usr-prov-5',
    username: 'amit_driver',
    email: 'amit@homehelp.com',
    role: 'provider',
    fullName: 'Amit Shinde',
    phone: '+91 95678 90123',
    address: 'Hadapsar, Pune',
    category: 'Drivers',
    experienceYears: 7,
    rating: 4.8,
    reviewCount: 34,
    hourlyRate: 450,
    bio: 'Professional chauffeur with clean police verification record, well-versed with city routes and highway driving.',
    skills: ['Manual & Automatic', 'Outstation Trips', 'Airport Transfers', 'Luxury Cars'],
    isAvailable: false,
    isActive: true,
    createdAt: '2026-02-05',
  },
  {
    id: 'usr-prov-6',
    username: 'neha_tech',
    email: 'neha@homehelp.com',
    role: 'provider',
    fullName: 'Neha Kulkarni',
    phone: '+91 96789 01234',
    address: 'Viman Nagar, Pune',
    category: 'Technical Services',
    experienceYears: 4,
    rating: 4.9,
    reviewCount: 23,
    hourlyRate: 450,
    bio: 'Hardware & network specialist assisting with OS installation, slow computer tune-up, and home Wi-Fi mesh routing.',
    skills: ['PC Troubleshooting', 'Wi-Fi Mesh Setup', 'Data Recovery', 'CCTV Fitting'],
    isAvailable: true,
    isActive: true,
    createdAt: '2026-02-12',
  },
  {
    id: 'usr-prov-7',
    username: 'dr_arjun',
    email: 'arjun@homehelp.com',
    role: 'provider',
    fullName: 'Dr. Arjun Mehta (MBBS)',
    phone: '+91 97890 12345',
    address: 'Kalyani Nagar Health Center, Pune',
    category: 'Doctor & Home Healthcare',
    experienceYears: 12,
    rating: 5.0,
    reviewCount: 64,
    hourlyRate: 750,
    bio: 'General physician providing compassionate home care visits, routine blood pressure & sugar monitoring for senior citizens.',
    skills: ['General Health Check', 'Elderly Care', 'Prescription Review', 'Post-Op Monitoring'],
    isAvailable: true,
    isActive: true,
    createdAt: '2026-01-05',
  },
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-1001',
    customerId: 'usr-cust-1',
    customerName: 'Rahul Sharma',
    customerPhone: '+91 98221 45012',
    providerId: 'usr-prov-1',
    providerName: 'Ramesh Patil',
    serviceCategory: 'Plumbing',
    date: '2026-10-18',
    time: '10:30 AM',
    address: 'Flat 402, Sunshine Heights, MG Road, Pune',
    notes: 'Bathroom sink faucet leaking and low water pressure.',
    status: 'Accepted',
    amount: 350,
    createdAt: '2026-10-14 08:30 AM',
  },
  {
    id: 'BK-1002',
    customerId: 'usr-cust-1',
    customerName: 'Rahul Sharma',
    customerPhone: '+91 98221 45012',
    providerId: 'usr-prov-2',
    providerName: 'Priya Sen',
    serviceCategory: 'Electrical Services',
    date: '2026-10-20',
    time: '02:00 PM',
    address: 'Flat 402, Sunshine Heights, MG Road, Pune',
    notes: 'Inverter wiring connection inspection.',
    status: 'Pending',
    amount: 400,
    createdAt: '2026-10-14 09:15 AM',
  },
  {
    id: 'BK-1003',
    customerId: 'usr-cust-2',
    customerName: 'Anita Deshmukh',
    customerPhone: '+91 97654 32189',
    providerId: 'usr-prov-3',
    providerName: 'Sunil Jadhav',
    serviceCategory: 'Home Cleaning',
    date: '2026-10-12',
    time: '09:00 AM',
    address: 'Bungalow 12, Green Glen Society, Baner, Pune',
    notes: 'Post-renovation living room deep cleaning.',
    status: 'Completed',
    amount: 1200,
    createdAt: '2026-10-10 11:00 AM',
    completedAt: '2026-10-12 01:00 PM',
    reviewGiven: true,
  },
  {
    id: 'BK-1004',
    customerId: 'usr-cust-2',
    customerName: 'Anita Deshmukh',
    customerPhone: '+91 97654 32189',
    providerId: 'usr-prov-7',
    providerName: 'Dr. Arjun Mehta (MBBS)',
    serviceCategory: 'Doctor & Home Healthcare',
    date: '2026-10-16',
    time: '11:00 AM',
    address: 'Bungalow 12, Green Glen Society, Baner, Pune',
    notes: 'Routine health checkup and BP monitoring for senior citizen.',
    status: 'Accepted',
    amount: 750,
    createdAt: '2026-10-13 04:20 PM',
  },
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    bookingId: 'BK-1003',
    providerId: 'usr-prov-3',
    customerId: 'usr-cust-2',
    customerName: 'Anita Deshmukh',
    rating: 5,
    comment: 'Exceptional work by Sunil and his team! The living room was spotless and they brought all professional equipment.',
    createdAt: '2026-10-12',
  },
  {
    id: 'rev-2',
    bookingId: 'BK-0992',
    providerId: 'usr-prov-1',
    customerId: 'usr-cust-1',
    customerName: 'Rahul Sharma',
    rating: 5,
    comment: 'Ramesh arrived right on time, explained the issue clearly and fixed our kitchen sink pipe within 45 minutes. Highly recommended!',
    createdAt: '2026-10-05',
  },
];

export const VIVA_QUESTIONS: VivaQuestion[] = [
  {
    category: 'Flask & Python',
    question: 'What is Flask and why is it categorized as a micro-framework?',
    answer: 'Flask is a micro web framework written in Python based on Werkzeug WSGI toolkit and Jinja2 template engine. It is called a micro-framework because it keeps the core simple yet extensible. Unlike Django, Flask does not include a built-in database abstraction layer (ORM), form validation, or authentication modules out of the box, giving developers the freedom to choose libraries like Flask-SQLAlchemy and Flask-Login.',
  },
  {
    category: 'Flask & Python',
    question: 'How are user sessions and authentication handled in this HomeHelp project?',
    answer: 'User authentication is managed via Flask-Login and Werkzeug security. When a user logs in, their password is verified using check_password_hash() against the salted PBKDF2:SHA256 hash stored in the SQLite database. Upon successful match, login_user() stores the user ID in the signed HTTP session cookie. Protected routes use the @login_required decorator and check current_user.role to restrict access.',
  },
  {
    category: 'Flask & Python',
    question: 'Explain the Model-View-Controller (MVC) architecture implemented in HomeHelp.',
    answer: 'In HomeHelp: (1) Models: Defined in models.py using SQLAlchemy (User, Booking, Category, Review) representing database entities; (2) Views: Jinja2 HTML templates inside the templates/ directory (base.html, customer_dash.html, etc.) rendering the UI to users; (3) Controller: Flask route handlers in app.py processing HTTP requests, executing business logic, and querying the database.',
  },
  {
    category: 'Database & SQLite',
    question: 'Why choose SQLite for this college project rather than MySQL or PostgreSQL?',
    answer: 'SQLite is a serverless, self-contained, zero-configuration SQL database engine. The entire database is stored in a single cross-platform file (homehelp.db) within the project directory. This makes the project completely portable for college project submission and offline viva demonstrations without requiring external database server installations or daemon services.',
  },
  {
    category: 'Database & SQLite',
    question: 'How are one-to-many relationships modeled between Users and Bookings?',
    answer: 'In the Booking table, two foreign keys reference user.id: customer_id (the client who booked) and provider_id (the service professional assigned). In SQLAlchemy: customer_id = db.Column(db.Integer, db.ForeignKey("user.id")), allowing bidirectional joins to query all bookings belonging to a specific customer or assigned to a specific provider.',
  },
  {
    category: 'Architecture & Security',
    question: 'How does HomeHelp prevent unauthorized access between different dashboards?',
    answer: 'Role-Based Access Control (RBAC) is implemented on both the server and client. In Flask routes, we check current_user.role (e.g. if current_user.role != "admin": return redirect(url_for("index"))). Additionally, bookings are filtered by customer_id=current_user.id or provider_id=current_user.id so users cannot inspect or manipulate other people’s bookings.',
  },
  {
    category: 'Architecture & Security',
    question: 'How are passwords stored securely in the database?',
    answer: 'Passwords are never stored in plaintext. We utilize werkzeug.security.generate_password_hash() with pbkdf2:sha256 and an automatic cryptographic salt. Even if the database file is accessed, the rainbow table attack is mitigated due to the salted hash structure.',
  },
  {
    category: 'Project Lifecycle',
    question: 'Describe the complete lifecycle of a service booking in HomeHelp.',
    answer: 'The lifecycle consists of 4 states: (1) Pending: Customer chooses category, date, time, address & provider, creating the booking; (2) Accepted / Rejected: Provider views incoming requests on their dashboard and accepts or rejects; (3) Completed: After performing the physical work, the provider marks the booking as Completed; (4) Reviewed: Customer can rate (1-5 stars) and write a testimonial feedback.',
  },
];

export const FLASK_PROJECT_FILES: FlaskProjectFile[] = [
  {
    path: 'app.py',
    description: 'Main Flask backend application containing routes, auth handlers, and role-based controllers.',
    language: 'python',
    content: `"""
HomeHelp - Online Home Services Booking System
TY BCA Final Year College Project
Backend: Flask, Flask-SQLAlchemy, Flask-Login, Werkzeug
"""

import os
from datetime import datetime
from flask import Flask, render_template, redirect, url_for, request, flash, jsonify
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Booking, Category, Review

app = Flask(__name__)
app.config['SECRET_KEY'] = 'homehelp_secret_key_tybca_2026'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///homehelp.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
login_manager = LoginManager()
login_manager.login_view = 'login'
login_manager.login_message_category = 'warning'
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# --- DATABASE SEEDER ---
def init_db():
    with app.app_context():
        db.create_all()
        # Seed Categories if table is empty
        if not Category.query.first():
            categories = [
                Category(name='Plumbing', icon='fa-faucet', description='Pipe repair, tap leaks, geyser fitting', base_price=350),
                Category(name='Electrical Services', icon='fa-bolt', description='Wiring, switches, circuit repairs', base_price=400),
                Category(name='Home Cleaning', icon='fa-broom', description='Deep cleaning, sanitization & mopping', base_price=600),
                Category(name='Vehicle Mechanics', icon='fa-tools', description='Doorstep bike & car troubleshooting', base_price=500),
                Category(name='Drivers', icon='fa-car', description='Professional city and highway chauffeurs', base_price=450),
                Category(name='Technical Services', icon='fa-laptop-code', description='PC, Wi-Fi, CCTV repairs & setups', base_price=450),
                Category(name='Doctor & Home Healthcare', icon='fa-user-md', description='House visits & routine vitals checkups', base_price=700),
            ]
            db.session.bulk_save_objects(categories)

            # Default Admin Account
            admin = User(
                username='admin',
                email='admin@homehelp.com',
                password=generate_password_hash('admin123', method='pbkdf2:sha256'),
                role='admin',
                full_name='System Administrator',
                phone='+91 98765 00001',
                address='Central Admin Office, Metro Tower 4'
            )
            db.session.add(admin)

            # Default Sample Provider
            provider = User(
                username='ramesh_plumber',
                email='ramesh@homehelp.com',
                password=generate_password_hash('pass123', method='pbkdf2:sha256'),
                role='provider',
                full_name='Ramesh Patil',
                phone='+91 91234 56789',
                address='Swargate, Pune',
                category='Plumbing',
                experience_years=8,
                hourly_rate=350,
                bio='Certified plumber with 8+ years experience in bathroom & pipe repairs.',
                is_available=True,
                is_active=True
            )
            db.session.add(provider)

            # Default Sample Customer
            customer = User(
                username='rahul_sharma',
                email='rahul@example.com',
                password=generate_password_hash('pass123', method='pbkdf2:sha256'),
                role='customer',
                full_name='Rahul Sharma',
                phone='+91 98221 45012',
                address='Flat 402, Sunshine Heights, MG Road, Pune'
            )
            db.session.add(customer)
            db.session.commit()
            print("Database initialized successfully with default records.")

# --- ROUTES ---

@app.route('/')
def index():
    categories = Category.query.all()
    providers = User.query.filter_by(role='provider', is_active=True).limit(6).all()
    reviews = Review.query.order_by(Review.created_at.desc()).limit(3).all()
    return render_template('index.html', categories=categories, providers=providers, reviews=reviews)

@app.route('/services')
def services():
    category_filter = request.args.get('category')
    categories = Category.query.all()
    if category_filter:
        providers = User.query.filter_by(role='provider', category=category_filter, is_active=True).all()
    else:
        providers = User.query.filter_by(role='provider', is_active=True).all()
    return render_template('services.html', categories=categories, providers=providers, selected_category=category_filter)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))

    categories = Category.query.all()
    if request.method == 'POST':
        role = request.form.get('role')
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        full_name = request.form.get('full_name')
        phone = request.form.get('phone')
        address = request.form.get('address')

        if User.query.filter((User.username == username) | (User.email == email)).first():
            flash('Username or Email is already registered.', 'danger')
            return render_template('register.html', categories=categories)

        new_user = User(
            username=username,
            email=email,
            password=generate_password_hash(password, method='pbkdf2:sha256'),
            role=role,
            full_name=full_name,
            phone=phone,
            address=address,
            category=request.form.get('category') if role == 'provider' else None,
            hourly_rate=int(request.form.get('hourly_rate', 350)) if role == 'provider' else None,
            experience_years=int(request.form.get('experience_years', 1)) if role == 'provider' else None,
            bio=request.form.get('bio', '') if role == 'provider' else None,
            is_active=True,
            is_available=True
        )
        db.session.add(new_user)
        db.session.commit()
        flash('Account created successfully! Please login with your credentials.', 'success')
        return redirect(url_for('login'))

    return render_template('register.html', categories=categories)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard_router'))

    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = User.query.filter_by(email=email).first()

        if user and check_password_hash(user.password, password):
            if user.role == 'provider' and not user.is_active:
                flash('Your provider account has been deactivated by the Admin. Please contact support.', 'warning')
                return render_template('login.html')

            login_user(user)
            flash(f'Welcome back, {user.full_name}!', 'success')
            return redirect(url_for('dashboard_router'))
        else:
            flash('Invalid email or password. Please verify your credentials.', 'danger')

    return render_template('login.html')

@app.route('/dashboard')
@login_required
def dashboard_router():
    if current_user.role == 'admin':
        return redirect(url_for('admin_dash'))
    elif current_user.role == 'provider':
        return redirect(url_for('provider_dash'))
    else:
        return redirect(url_for('customer_dash'))

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out safely.', 'info')
    return redirect(url_for('index'))

# --- CUSTOMER CONTROLLERS ---

@app.route('/customer_dash')
@login_required
def customer_dash():
    if current_user.role != 'customer':
        flash('Unauthorized dashboard access.', 'danger')
        return redirect(url_for('index'))

    bookings = Booking.query.filter_by(customer_id=current_user.id).order_by(Booking.created_at.desc()).all()
    categories = Category.query.all()
    return render_template('customer_dash.html', bookings=bookings, categories=categories)

@app.route('/book_service', methods=['GET', 'POST'])
@login_required
def book_service():
    if current_user.role != 'customer':
        flash('Only customers can book home services.', 'warning')
        return redirect(url_for('index'))

    cat_name = request.args.get('category')
    provider_id = request.args.get('provider_id')

    categories = Category.query.all()
    providers = User.query.filter_by(role='provider', is_active=True).all()

    if request.method == 'POST':
        p_id = int(request.form.get('provider_id'))
        provider = User.query.get_or_404(p_id)
        
        booking = Booking(
            customer_id=current_user.id,
            provider_id=provider.id,
            service_name=provider.category or request.form.get('category'),
            date=request.form.get('date'),
            time=request.form.get('time'),
            address=request.form.get('address') or current_user.address,
            notes=request.form.get('notes'),
            amount=provider.hourly_rate or 350,
            status='Pending'
        )
        db.session.add(booking)
        db.session.commit()
        flash('Booking request submitted! Waiting for provider confirmation.', 'success')
        return redirect(url_for('customer_dash'))

    return render_template('book_form.html', categories=categories, providers=providers, selected_cat=cat_name, selected_prov=provider_id)

@app.route('/cancel_booking/<int:booking_id>', methods=['POST'])
@login_required
def cancel_booking(booking_id):
    booking = Booking.query.get_or_404(booking_id)
    if booking.customer_id != current_user.id and current_user.role != 'admin':
        flash('Unauthorized action.', 'danger')
        return redirect(url_for('customer_dash'))

    if booking.status in ['Completed', 'Cancelled']:
        flash('This booking can no longer be cancelled.', 'warning')
    else:
        booking.status = 'Cancelled'
        db.session.commit()
        flash('Booking cancelled successfully.', 'info')

    return redirect(request.referrer or url_for('customer_dash'))

# --- PROVIDER CONTROLLERS ---

@app.route('/provider_dash')
@login_required
def provider_dash():
    if current_user.role != 'provider':
        flash('Unauthorized access.', 'danger')
        return redirect(url_for('index'))

    bookings = Booking.query.filter_by(provider_id=current_user.id).order_by(Booking.created_at.desc()).all()
    pending_count = sum(1 for b in bookings if b.status == 'Pending')
    completed_count = sum(1 for b in bookings if b.status == 'Completed')
    total_earnings = sum(b.amount for b in bookings if b.status == 'Completed')

    return render_template(
        'provider_dash.html',
        bookings=bookings,
        pending_count=pending_count,
        completed_count=completed_count,
        total_earnings=total_earnings
    )

@app.route('/provider/update_status/<int:booking_id>/<string:status>', methods=['POST'])
@login_required
def update_status(booking_id, status):
    if current_user.role != 'provider':
        flash('Unauthorized action.', 'danger')
        return redirect(url_for('index'))

    booking = Booking.query.get_or_404(booking_id)
    if booking.provider_id != current_user.id:
        flash('Permission denied.', 'danger')
        return redirect(url_for('provider_dash'))

    if status in ['Accepted', 'Completed', 'Cancelled']:
        booking.status = status
        db.session.commit()
        flash(f'Booking status updated to {status}.', 'success')

    return redirect(url_for('provider_dash'))

@app.route('/provider/toggle_availability', methods=['POST'])
@login_required
def toggle_availability():
    if current_user.role != 'provider':
        return jsonify({'error': 'Unauthorized'}), 403

    current_user.is_available = not current_user.is_available
    db.session.commit()
    flash(f"Availability set to {'Available' if current_user.is_available else 'Busy'}.", 'info')
    return redirect(url_for('provider_dash'))

# --- ADMIN CONTROLLERS ---

@app.route('/admin_dash')
@login_required
def admin_dash():
    if current_user.role != 'admin':
        flash('Admin privilege required.', 'danger')
        return redirect(url_for('index'))

    stats = {
        'total_customers': User.query.filter_by(role='customer').count(),
        'total_providers': User.query.filter_by(role='provider').count(),
        'total_categories': Category.query.count(),
        'total_bookings': Booking.query.count(),
        'completed_bookings': Booking.query.filter_by(status='Completed').count(),
        'total_revenue': sum(b.amount for b in Booking.query.filter_by(status='Completed').all())
    }

    customers = User.query.filter_by(role='customer').all()
    providers = User.query.filter_by(role='provider').all()
    categories = Category.query.all()
    bookings = Booking.query.order_by(Booking.created_at.desc()).all()

    return render_template('admin_dash.html', stats=stats, customers=customers, providers=providers, categories=categories, bookings=bookings)

@app.route('/admin/toggle_provider/<int:user_id>', methods=['POST'])
@login_required
def toggle_provider(user_id):
    if current_user.role != 'admin':
        flash('Admin privileges required.', 'danger')
        return redirect(url_for('index'))

    provider = User.query.get_or_404(user_id)
    if provider.role == 'provider':
        provider.is_active = not provider.is_active
        db.session.commit()
        flash(f"Provider {provider.full_name} is now {'Active' if provider.is_active else 'Deactivated'}.", 'info')

    return redirect(url_for('admin_dash'))

@app.route('/admin/add_category', methods=['POST'])
@login_required
def add_category():
    if current_user.role != 'admin':
        flash('Unauthorized action.', 'danger')
        return redirect(url_for('index'))

    name = request.form.get('name')
    icon = request.form.get('icon', 'fa-tools')
    description = request.form.get('description')
    base_price = int(request.form.get('base_price', 350))

    if Category.query.filter_by(name=name).first():
        flash('Category already exists.', 'warning')
    else:
        cat = Category(name=name, icon=icon, description=description, base_price=base_price)
        db.session.add(cat)
        db.session.commit()
        flash(f'Service category "{name}" created.', 'success')

    return redirect(url_for('admin_dash'))

@app.route('/admin/delete_category/<int:cat_id>', methods=['POST'])
@login_required
def delete_category(cat_id):
    if current_user.role != 'admin':
        return redirect(url_for('index'))

    cat = Category.query.get_or_404(cat_id)
    db.session.delete(cat)
    db.session.commit()
    flash(f'Category "{cat.name}" deleted.', 'info')
    return redirect(url_for('admin_dash'))

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)
`
  },
  {
    path: 'models.py',
    description: 'SQLAlchemy Database Schema defining Users, Categories, Bookings, and Reviews.',
    language: 'python',
    content: `"""
HomeHelp - Database Models (SQLAlchemy ORM)
Project: Online Home Services Booking System
"""

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'customer', 'provider', 'admin'
    full_name = db.Column(db.String(150), nullable=False)
    phone = db.Column(db.String(20))
    address = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Provider specific fields
    category = db.Column(db.String(100))
    experience_years = db.Column(db.Integer, default=1)
    hourly_rate = db.Column(db.Integer, default=350)
    bio = db.Column(db.Text)
    is_available = db.Column(db.Boolean, default=True)
    is_active = db.Column(db.Boolean, default=True)

    # Relationships
    customer_bookings = db.relationship('Booking', foreign_keys='Booking.customer_id', backref='customer', lazy=True)
    provider_bookings = db.relationship('Booking', foreign_keys='Booking.provider_id', backref='provider', lazy=True)

class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    icon = db.Column(db.String(50), default='fa-tools')
    description = db.Column(db.String(255))
    base_price = db.Column(db.Integer, default=350)

class Booking(db.Model):
    __tablename__ = 'bookings'
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    provider_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    service_name = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    time = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    notes = db.Column(db.Text)
    amount = db.Column(db.Integer, default=350)
    status = db.Column(db.String(30), default='Pending')  # Pending, Accepted, Completed, Cancelled
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.id'), nullable=True)
    provider_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    customer_name = db.Column(db.String(100), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
`
  },
  {
    path: 'requirements.txt',
    description: 'Python package dependencies for running in VS Code with Python 3.10+.',
    language: 'text',
    content: `Flask==3.0.2
Flask-SQLAlchemy==3.1.1
Flask-Login==0.6.3
Werkzeug==3.0.1
`
  },
  {
    path: 'templates/base.html',
    description: 'Bootstrap 5 Base template with responsive navigation, flash alerts, and cohesive blue-white design.',
    language: 'html',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}HomeHelp - Online Home Services Booking System{% endblock %}</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- FontAwesome 6 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <!-- Custom Style -->
    <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
</head>
<body class="bg-light d-flex flex-column min-vh-100">

    <!-- Top Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow-sm">
        <div class="container">
            <a class="navbar-brand fw-bold fs-4 d-flex items-center gap-2" href="{{ url_for('index') }}">
                <i class="fa-solid fa-house-chimney-user"></i> HomeHelp
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item"><a class="nav-link" href="{{ url_for('index') }}">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="{{ url_for('services') }}">All Services</a></li>
                </ul>

                <ul class="navbar-nav ms-auto align-items-lg-center gap-2">
                    {% if current_user.is_authenticated %}
                        {% if current_user.role == 'customer' %}
                            <li class="nav-item"><a class="nav-link" href="{{ url_for('customer_dash') }}"><i class="fa-solid fa-calendar-check me-1"></i> My Bookings</a></li>
                        {% elif current_user.role == 'provider' %}
                            <li class="nav-item"><a class="nav-link" href="{{ url_for('provider_dash') }}"><i class="fa-solid fa-screwdriver-wrench me-1"></i> Provider Portal</a></li>
                        {% elif current_user.role == 'admin' %}
                            <li class="nav-item"><a class="nav-link" href="{{ url_for('admin_dash') }}"><i class="fa-solid fa-shield-halved me-1"></i> Admin Panel</a></li>
                        {% endif %}
                        <li class="nav-item">
                            <span class="navbar-text text-white-50 px-2 small">({{ current_user.full_name }} · {{ current_user.role | capitalize }})</span>
                        </li>
                        <li class="nav-item">
                            <a class="btn btn-outline-light btn-sm px-3 rounded-pill" href="{{ url_for('logout') }}"><i class="fa-solid fa-right-from-bracket me-1"></i> Logout</a>
                        </li>
                    {% else %}
                        <li class="nav-item"><a class="nav-link" href="{{ url_for('login') }}">Login</a></li>
                        <li class="nav-item"><a class="btn btn-light btn-sm text-primary fw-semibold px-3 rounded-pill" href="{{ url_for('register') }}">Register</a></li>
                    {% endif %}
                </ul>
            </div>
        </div>
    </nav>

    <!-- Flash Notifications -->
    <div class="container mt-3">
        {% with messages = get_flashed_messages(with_categories=true) %}
            {% if messages %}
                {% for category, message in messages %}
                    <div class="alert alert-{{ category }} alert-dismissible fade show shadow-sm" role="alert">
                        {{ message }}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                {% endfor %}
            {% endif %}
        {% endwith %}
    </div>

    <!-- Main Content Body -->
    <main class="flex-grow-1">
        {% block content %}{% endblock %}
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white pt-5 pb-3 mt-5">
        <div class="container">
            <div class="row g-4">
                <div class="col-md-4">
                    <h5 class="fw-bold text-primary mb-3"><i class="fa-solid fa-house-chimney-user me-2"></i>HomeHelp</h5>
                    <p class="text-white-50 small">Connecting homeowners with verified plumbers, electricians, mechanics, cleaners, and caregivers across town.</p>
                </div>
                <div class="col-md-4">
                    <h6 class="fw-bold mb-3">Service Sectors</h6>
                    <ul class="list-unstyled text-white-50 small">
                        <li>Plumbing & Electrical Wiring</li>
                        <li>Deep Home Cleaning & Sanitization</li>
                        <li>Automobile Mechanics & Drivers</li>
                        <li>Technical & Doctor Visits</li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <h6 class="fw-bold mb-3">Academic Viva Note</h6>
                    <p class="text-white-50 small">TY BCA Final Year Capstone Project. Built using Python Flask, SQLite, and Bootstrap 5.</p>
                </div>
            </div>
            <hr class="border-secondary my-4">
            <div class="text-center text-white-50 small">
                &copy; 2026 HomeHelp Booking System. All Rights Reserved.
            </div>
        </div>
    </footer>

    <!-- Bootstrap 5 Bundle JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="{{ url_for('static', filename='js/script.js') }}"></script>
</body>
</html>
`
  },
  {
    path: 'templates/index.html',
    description: 'Homepage with Hero section, search bar, 7 service categories, verified providers, and How It Works.',
    language: 'html',
    content: `{% extends 'base.html' %}
{% block title %}HomeHelp - Your Home Services, Just One Click Away{% endblock %}

{% block content %}
<!-- Hero Section -->
<section class="hero-wrapper text-white text-center py-5">
    <div class="container py-4">
        <span class="badge bg-white text-primary px-3 py-2 rounded-pill fw-semibold mb-3">Verified Local Professionals</span>
        <h1 class="display-4 fw-bold mb-3">Your Home Services, Just One Click Away</h1>
        <p class="lead text-white-50 mx-auto mb-4" style="max-width: 650px;">
            Book top-rated plumbers, certified electricians, mechanics, cleaners, and healthcare experts directly at your doorstep with transparent rates.
        </p>

        <!-- Search Bar -->
        <div class="row justify-content-center">
            <div class="col-md-8">
                <form action="{{ url_for('services') }}" method="GET" class="card p-2 shadow-lg border-0 rounded-pill flex-row align-items-center">
                    <i class="fa-solid fa-magnifying-glass text-muted ms-3 me-2"></i>
                    <input type="text" name="q" class="form-control border-0 shadow-none" placeholder="Search for 'Plumbing', 'Electrician', 'Deep Cleaning'...">
                    <button type="submit" class="btn btn-primary rounded-pill px-4 ms-2">Find Help</button>
                </form>
            </div>
        </div>
    </div>
</section>

<!-- Popular Categories Section -->
<section class="container my-5">
    <div class="text-center mb-5">
        <h2 class="fw-bold">Popular Service Categories</h2>
        <p class="text-muted">Select a category to view certified service providers in your neighborhood.</p>
    </div>

    <div class="row g-4">
        {% for cat in categories %}
        <div class="col-6 col-md-4 col-lg-3">
            <div class="card h-100 border-0 shadow-sm p-4 text-center service-cat-card">
                <div class="cat-icon-circle mx-auto mb-3 bg-primary-subtle text-primary">
                    <i class="fa-solid {{ cat.icon }} fa-2x"></i>
                </div>
                <h5 class="fw-bold mb-1">{{ cat.name }}</h5>
                <p class="text-muted small mb-3">{{ cat.description }}</p>
                <div class="mt-auto">
                    <span class="text-primary fw-semibold small d-block mb-2">From ₹{{ cat.base_price }}</span>
                    <a href="{{ url_for('book_service', category=cat.name) }}" class="btn btn-outline-primary btn-sm rounded-pill w-100">Book Now</a>
                </div>
            </div>
        </div>
        {% endfor %}
    </div>
</section>

<!-- How It Works -->
<section class="bg-white py-5">
    <div class="container py-3">
        <div class="text-center mb-5">
            <h2 class="fw-bold">How It Works</h2>
            <p class="text-muted">Simple 3-step online booking process</p>
        </div>
        <div class="row text-center g-4">
            <div class="col-md-4">
                <div class="p-4">
                    <div class="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-3" style="width: 60px; height: 60px;">
                        <i class="fa-solid fa-list-check fa-lg"></i>
                    </div>
                    <h5 class="fw-bold">1. Choose a Service</h5>
                    <p class="text-muted small">Browse plumbers, electricians, or healthcare providers and pick your required date & time.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="p-4">
                    <div class="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-3" style="width: 60px; height: 60px;">
                        <i class="fa-solid fa-clock-rotate-left fa-lg"></i>
                    </div>
                    <h5 class="fw-bold">2. Provider Accepts</h5>
                    <p class="text-muted small">The service professional gets notified on their dashboard and accepts the request.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="p-4">
                    <div class="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-3" style="width: 60px; height: 60px;">
                        <i class="fa-solid fa-house-circle-check fa-lg"></i>
                    </div>
                    <h5 class="fw-bold">3. Service Delivered</h5>
                    <p class="text-muted small">Work is completed at your residence, marked done, and open for your review.</p>
                </div>
            </div>
        </div>
    </div>
</section>
{% endblock %}
`
  },
  {
    path: 'static/css/style.css',
    description: 'Custom styling implementing the blue-white-light grey theme with card hover transitions.',
    language: 'css',
    content: `/* HomeHelp Custom Styling - Theme: Blue, White, Light Grey */
:root {
    --primary-blue: #0056b3;
    --primary-blue-hover: #004085;
    --light-bg: #f8fafc;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--light-bg);
}

.hero-wrapper {
    background: linear-gradient(135deg, #0056b3 0%, #1e3a8a 100%);
}

.cat-icon-circle {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.service-cat-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border-radius: 12px;
}

.service-cat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 86, 179, 0.12) !important;
}

.badge-pending {
    background-color: #fef3c7;
    color: #92400e;
}

.badge-accepted {
    background-color: #dbeafe;
    color: #1e40af;
}

.badge-completed {
    background-color: #dcfce7;
    color: #166534;
}

.badge-cancelled {
    background-color: #fee2e2;
    color: #991b1b;
}
`
  },
  {
    path: 'static/js/script.js',
    description: 'Frontend client logic for dynamic role fields toggling and confirmation alerts.',
    language: 'javascript',
    content: `// HomeHelp Frontend Script
document.addEventListener('DOMContentLoaded', function () {
    const roleSelect = document.getElementById('roleSelect');
    const providerFields = document.getElementById('providerFields');

    if (roleSelect && providerFields) {
        roleSelect.addEventListener('change', function () {
            if (this.value === 'provider') {
                providerFields.style.display = 'block';
            } else {
                providerFields.style.display = 'none';
            }
        });
    }

    // Auto-dismiss alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert-dismissible');
    alerts.forEach(function (alert) {
        setTimeout(function () {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000);
    });
});
`
  }
];
