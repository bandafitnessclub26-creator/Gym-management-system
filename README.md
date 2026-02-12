# Banda Fitness Club - Gym Management System

A complete mobile-first iOS-style gym management web application built with React, TypeScript, and Supabase.

## 🔐 Admin Login Credentials

**Email:** `admin@bandafitness.com`  
**Password:** `Banda@2026`

> **Note:** These credentials are required to access the admin dashboard. The authentication system validates these exact credentials for secure access.

## Owner & Contact

- **Owner**: Shivam Dwivedi
- **Location**: Banda, Uttar Pradesh
- **Contact**: +91 8960653217

## Features

### 🏠 Public Home Screen
- Sticky header with gym logo
- Full-width hero section with "Never Give Up. Stay Strong." tagline
- Gym branding and owner information
- Services showcase (Strength Training, Cardio, Personal Training, Weight Loss)
- Updated membership plans:
  - 1 Month – ₹899
  - 3 Months – ₹2,499 (Popular)
  - 6 Months – ₹4,599 (Save 15%)
  - 1 Year – ₹8,499 (Best Value)
- Admin login access

### 🔐 Admin Authentication
- Secure login screen
- Protected admin routes
- Logout button in header (red)

### 📊 Admin Dashboard
- **Sticky Header**: Logo + Gym Name + Red Logout Button
- Real-time statistics:
  - Total Members
  - Paid Members
  - Pending Fees
  - Monthly Collection
- **Month-wise Progress Tracker**:
  - Dropdown to select month (January-December)
  - Progress bar based on days in selected month
  - Accurate day counts (28-31 days depending on month)
  - Current day tracking
- Payment overview with aggregate progress bar
- Upcoming dues tracking (members due in next 5 days)
- Quick action buttons for common tasks

### 👥 Member Management
- **Advanced Filters**:
  - All Members
  - Paid Members
  - Due Members
- Complete member list with search functionality
- Individual member profiles with detailed information
- Add/Edit member functionality with profile picture upload
- **Profile Picture Upload**: Upload member photos from device gallery (max 5MB)
- WhatsApp notification button on each member card
- Member profile includes:
  - Profile picture with initials fallback
  - Contact information
  - Membership plan details
  - Join date and payment history
  - Monthly fee progress tracking

### 💰 Fee & Payment Tracking
- Add fee payments for members
- Support for multiple payment methods (UPI, Cash)
- Transaction ID tracking
- Automatic date calculations (30-day fee cycles)
- Payment confirmation via WhatsApp

### 📈 Date-Based Progress Tracking
Each member has:
- Join Date
- Fee Start Date
- Fee End Date (30-day cycle)
- Last Payment Date
- Next Due Date
- Visual progress bar showing days completed/remaining
- Color-coded status:
  - 🟢 Green: Paid and active
  - 🟡 Yellow: Due within 5 days
  - 🔴 Red: Overdue

### 💬 WhatsApp Integration
- Send payment confirmations to members
- Send fee reminder notifications
- WhatsApp contact: **+91 8960653217**
- Automated message templates
- One-click WhatsApp button on member cards

## Design System

### Theme
- **Primary Colors**: Matte black (#000000), Charcoal gray (#27272a, #18181b)
- **Accent Colors**: Neon green (#39FF14), Electric red for CTAs (#FF3B3B)
- **Text Colors**: White (#ffffff), Light gray (#a1a1aa, #71717a)
- **Background**: Dark gradients (zinc-900 to zinc-950)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 400, 500, 600, 700, 800, 900
- **Style**: Bold, strong fitness aesthetic

### UI Components
- **Border Radius**: Medium rounded corners (rounded-xl, rounded-2xl, rounded-3xl)
- **Icons**: Lucide React (minimal line icons)
- **Layout**: Mobile-first with iOS-style safe areas
- **Shadows**: Subtle depth with colored glows
- **Sticky Headers**: Fixed logo/navigation
- **Bold Typography**: Strong, impactful headings

## Technical Stack

- **Frontend**: React 18, TypeScript
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Notifications**: Sonner (toast notifications)
- **Backend**: Supabase (Edge Functions, KV Store)
- **API**: RESTful API with Hono web framework

## Data Persistence

All member and payment data is stored in Supabase's KV store:
- Members are stored with key pattern: `member:{id}`
- Payments are stored with key pattern: `payment:{id}`
- Automatic seed data initialization on first load

## Navigation

### Sticky Header (Admin Screens)
- Gym Logo (circular)
- "BANDA FITNESS CLUB" branding
- Red Logout Button → Returns to Home

### Bottom Navigation Bar (iOS-style)
- Dashboard
- Members
- Add Payment

### Screen Flow
1. Home Screen → Login
2. Login → Dashboard
3. Dashboard → Members List / Add Member / Add Payment
4. Members List → Member Profile
5. Member Profile → Add Payment / WhatsApp Notification
6. Add Payment → WhatsApp Confirmation → Dashboard

## Getting Started

The application is automatically deployed and ready to use. Simply:
1. Visit the home screen to view gym information
2. Click "ADMIN LOGIN" to access the management dashboard
3. Enter any credentials to log in (demo mode)
4. Start managing members and payments
5. Use filters to view Paid/Due members
6. Click WhatsApp buttons to send notifications
7. Use month selector to track progress through the year

## Notes

- This is a prototype designed for demonstration purposes
- Not intended for storing sensitive PII or real business data in production
- WhatsApp integration uses contact number: **+91 8960653217**
- All dates are calculated automatically based on 30-day cycles
- Month progress accounts for actual days in each month (28-31)
- The system auto-initializes with 3 sample members on first load
- Bold fitness aesthetic with strong typography throughout