# CozyCraft Furniture Showroom

A full-stack web application for a premium furniture showroom — featuring a customer-facing React frontend and a Django REST API backend.

---

## 📁 Project Structure

```
furniture-showroom/
├── backend/               # Django REST API
│   ├── accounts/          # Auth app (register, login, profile)
│   ├── config/            # Django settings and root URLs
│   ├── manage.py
│   └── requirements.txt
├── src/                   # React frontend source
│   ├── api/               # API client and mock data
│   ├── components/        # Reusable UI components (Navbar, Footer, Layout, etc.)
│   ├── features/auth/     # Auth context, hooks, and state management
│   ├── hooks/             # Custom React hooks
│   └── pages/             # All application pages
├── public/                # Static assets
├── index.html
├── package.json
└── vite.config.js
```

---

## 🖥️ Frontend (React + Vite)

### Tech Stack
- **React 18** with functional components and hooks
- **React Router v6** for client-side routing
- **Vite** as the development server and build tool
- **CSS Modules** for scoped component styling
- **localStorage** for client-side session and data persistence (pre-API integration)

### Pages & Features

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero section, featured products, testimonials, and CTAs |
| `/about` | About | Brand story, team, and showroom philosophy |
| `/services` | Services | Custom fabrication, interior consultation, and delivery services |
| `/catalog` | Catalog Listing | Filterable and searchable product grid |
| `/catalog/:id` | Product Detail | Individual product view with details and materials |
| `/gallery` | Gallery | Portfolio of completed interior projects |
| `/blog` | Blog Listing | Articles and design tips |
| `/blog/:id` | Blog Post | Single blog article view |
| `/contact` | Contact | Inquiry form and showroom location details |
| `/signin` | Sign In | Customer and admin login form |
| `/signup` | Sign Up | New customer registration form |
| `/profile` | Customer Profile | Protected page for managing personal details, addresses, and style preferences |
| `/admin` | Admin Dashboard | Protected panel for managing products, blog posts, and gallery items |

### Authentication & Authorization
- **JWT-based auth** connected to the Django backend via `authApi.js`
- **AuthContext** manages global user state, login, register, logout, and session persistence
- **ProtectedRoute** component enforces role-based access:
  - `/profile` — accessible to `customer` and `admin` roles
  - `/admin` — accessible to `admin` role only
  - Guests are redirected to `/signin`
- After login or registration, users are automatically redirected to `/profile` (customers) or `/admin` (admins)

### Admin Dashboard
- **Overview tab**: Database metrics (product count, blog count, gallery count by category) and a database reset utility
- **Products tab**: Full CRUD — add, edit, and delete furniture catalog items
- **Blog tab**: Manage showroom articles and design tips
- **Gallery tab**: Manage completed interior project case studies

### Customer Profile Page
- **Sidebar navigation** with active state indicators
- **Personal Details tab**: Edit full name, phone number, default shipping address, and billing address
- **Style Preferences tab**: Select preferred design theme (Scandinavian, Mid-Century Modern, Industrial Chic, Contemporary Luxury)
- **Logout button** in sidebar — clears JWT tokens and session, redirects to home

---

## ⚙️ Backend (Django REST Framework)

### Tech Stack
- **Django 4.2** web framework
- **Django REST Framework** for API views and serializers
- **SimpleJWT** for JSON Web Token authentication
- **django-cors-headers** for cross-origin request handling (allows React frontend at `localhost:5173`)
- **SQLite** as the development database

### API Endpoints

Base URL: `http://127.0.0.1:8000/api/accounts/`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/register/` | Register a new user account | No |
| `POST` | `/login/` | Log in and receive JWT access + refresh tokens | No |
| `GET` | `/profile/` | Retrieve the logged-in user's profile | Yes (Bearer token) |
| `PUT` | `/profile/` | Update the logged-in user's profile details | Yes (Bearer token) |
| `POST` | `/token/refresh/` | Refresh an expired access token | No |

### Data Models

**User** (custom user model extending `AbstractBaseUser`):
- `email` (unique login identifier)
- `full_name`
- `is_staff` / `is_superuser` (determines admin role)

**UserProfile** (one-to-one with User):
- `phone_number`
- `shipping_address`
- `billing_address`
- `preferred_style`

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm

---

### 1. Start the Backend

```bash
# Navigate to the backend directory
cd backend

# (Optional) Create and activate a virtual environment
python -m venv .venv
.venv\Scripts\activate        # Windows
source .venv/bin/activate     # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Start the Django development server
python manage.py runserver
```

Backend will be running at: **http://127.0.0.1:8000**

---

### 2. Start the Frontend

```bash
# From the project root
npm install

# Start the Vite development server
npm run dev
```

Frontend will be running at: **http://localhost:5173**

---

### 3. Create an Admin User (Optional)

```bash
cd backend
python manage.py createsuperuser
```

Log in with the superuser credentials at `/signin` to access the Admin Dashboard at `/admin`.

---

## 🔐 Default Test Credentials

| Role | Email | Password |
|---|---|---|
| Admin | `admin@cozycraft.com` | *(set during createsuperuser)* |
| Customer | Register via `/signup` | *(any password ≥ 8 chars)* |

---

## 🔗 Integration Status

| Feature | Status |
|---|---|
| Frontend UI | ✅ Complete |
| Django REST API (Auth endpoints) | ✅ Complete |
| Frontend ↔ Backend Auth (login, register, session) | ✅ Connected |
| Profile data persistence (localStorage) | ✅ Active |
| Profile data sync to Django backend (`PUT /profile/`) | 🔲 Pending |
| Product/Blog/Gallery data from Django backend | 🔲 Pending (currently uses localStorage mock) |
