# HOPE INC. - Customer Management System

This is the official repository for the HOPE INC. Customer Management System — a 6-week capstone project built with React (Vite), Tailwind CSS, and Supabase.

## 🚀 Developer Setup Instructions

### 1. Install Dependencies
Run this command in the project root:
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory with these variables:
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
> ⚠️ Never commit your actual `.env` file. Get the real credentials from your Project Lead.

### 3. Start Development Server
```bash
npm run dev
```
Local URL: http://localhost:5173/

Stop Server: Press `CTRL + C` in the terminal.

## 🛠️ Tech Stack
- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Database/Auth:** Supabase (PostgreSQL + Auth)
- **Routing:** React Router DOM

## 📂 Project Structure
/src/pages        - All page components (Dashboard, Customers, etc.)
/src/Components   - Reusable UI components (Sidebar, Navbar, Modals)
/src/lib          - Supabase client and utility hooks
App.jsx           - Routing and application structure

## 👥 User Types
| Role | Access |
|------|--------|
| SUPERADMIN | Full access including soft-delete and user management |
| ADMIN | Can add and edit customers, view all data |
| USER | Read-only access to active customers and sales data |

## 📋 Team Workflow Rules
- **Git Protocol:** Always run `git pull` before starting work
- **Branch:** Never push directly to `main` — use feature branches → PR → `Dev`
- **Styling:** Use Tailwind utility classes for all UI work
- **Commits:** Use clear commit messages (e.g., `feat: added customer table`)