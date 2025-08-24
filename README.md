# 🚀 Job-Xpert Frontend

A modern, feature-rich **React-based job portal** frontend built with performance, scalability, and user experience in mind. Designed to support job seekers and admins with elegant UI and intuitive workflows.

![React](https://img.shields.io/badge/React-v19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-yellow?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Utility--First-blue?logo=tailwindcss)
![Material-UI](https://img.shields.io/badge/Material--UI-Design_System-purple?logo=mui)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🧠 Overview

**Job-Xpert** is a responsive and modular frontend application designed to power a comprehensive **job portal system**. It supports multiple user roles, a secure authentication flow, and smooth navigation using modern React architecture.

---

## 🏗️ Tech Stack

| Category          | Technologies                                           |
|-------------------|--------------------------------------------------------|
| Frontend Core     | ⚛️ React (v19), Vite, TypeScript (optional)           |
| Styling           | 🎨 TailwindCSS, Material-UI, React Icons               |
| Routing           | 🔁 React Router DOM                                   |
| HTTP Requests     | 🔗 Axios                                               |
| UX Enhancements   | 🔔 React Hot Toast, 🧊 SweetAlert2                     |
| Code Quality      | ✅ ESLint                                              |

---

## 📁 Project Structure

```bash
src/
├── assets/         # 📦 Static files (images, etc.)
├── Components/     # 🧩 Reusable UI components
├── pages/          # 📄 Main application pages
│   ├── home/       # 🏠 Homepage related components
│   └── admin/      # 🛠️ Admin dashboard components
├── utils/          # 🔧 Utility functions
├── App.jsx         # 🔌 Main app logic
├── main.jsx        # 🧬 App entry point
└── auth.js         # 🔐 Authentication logic
```
## 🌐 Routing Structure

/             -> Home Page
/login        -> Login Page
/signup       -> Signup Page
/admin/*      -> Admin Dashboard
/cvdashboard  -> CV Dashboard

<!--
	README.md (comprehensive, emoji-friendly)
	Generated from an analysis of package.json, App.jsx, auth.js, redux slices and key components.
-->

# � Job-Xpert Frontend

A modern, responsive React frontend for the Job-Xpert job portal — built with Vite, React 19, Material UI and Tailwind CSS.

![React](https://img.shields.io/badge/React-v19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Bundler-yellow?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Utility--First-blue?logo=tailwindcss)
![MUI](https://img.shields.io/badge/MUI-7.x-purple?logo=mui)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ What this repo contains

- A single-page React application (Vite) that provides:
	- Authentication (login / signup) flows
	- Role-aware UI (admin, user, company)
	- CV builder/dashboard with multiple templates
	- Admin pages to manage companies and jobs

The app uses Redux (Redux Toolkit) for simple state slices and Axios for HTTP requests.

## 🧭 Quick status (from code analysis)

- Entry: `src/main.jsx`, mounts `App`.
- Router: `App.jsx` defines routes for `/`, `/login`, `/signup`, `/admin/*`, and CV pages under `/` (see `pages/home/homepage.jsx`).
- Auth helpers: `src/auth.js` stores/removes `access_token` in localStorage.
- Redux: `src/redux/store.js` combines `user` and `auth` slices (`userSlice.js`, `authSlice.js`).
- Login/Signup: `src/Components/LoginPage.jsx` and `src/Components/SignupPage.jsx` use axios and environment variable `VITE_BACKEND_URL` to call `/api/users/login` and `/api/users/register`.

## 🎯 Features

- ✅ React 19 + Vite for fast dev experience
- ✅ Tailwind CSS + Material-UI for styling
- ✅ Axios-powered requests with credentials support
- ✅ Toast notifications (`react-hot-toast`) and SweetAlert2
- ✅ Redux Toolkit slices for `user` and `auth`
- ✅ CV builder with templates (cv00, cv01, cv02)
- ✅ Role selection on login & signup (admin, user, company)

## 🏗 Tech stack & main dependencies

- react, react-dom (v19)
- vite (v6+)
- @mui/material, @mui/icons-material
- tailwindcss, @tailwindcss/vite
- axios
- react-router-dom (v7)
- reduxjs/toolkit (used via imports in store)
- react-hot-toast, sweetalert2, react-icons

See full versions in `package.json`.

## 📁 Project structure (important files)

```
src/
	├─ assets/                # images and static assets
	├─ Components/            # auth forms and shared components (LoginPage, SignupPage, etc.)
	├─ pages/
	│   ├─ home/              # CV flow, homepage and CV templates
	│   └─ admin/             # admin dashboard pages (Companies, CompanyCreate, Jobs)
	├─ redux/                 # Redux slices and store
	├─ utils/                 # constants and helpers
	├─ App.jsx                # Routes and main app composition
	├─ main.jsx               # React entry
	└─ auth.js                # token helper (get/set/remove access_token)
```

## 🔧 Environment variables

This project expects at least the following environment key during development and build:

- `VITE_BACKEND_URL` — base URL of the backend API (example: `http://localhost:5000`)

Create a `.env` file at the project root (Vite reads `VITE_` prefixed vars):

```powershell
# .env
VITE_BACKEND_URL=http://localhost:5000
```

Note: components call endpoints such as `/api/users/login` and `/api/users/register` via `import.meta.env.VITE_BACKEND_URL + '/api/users/...'`.

## ⚙️ Available scripts

Defined in `package.json`:

- `npm run dev` — start Vite dev server (HMR)  
- `npm run build` — build production assets  
- `npm run preview` — preview production build  
- `npm run lint` — run ESLint across the project

Example (PowerShell):

```powershell
npm install
npm run dev
```

## � Authentication flow (summary)

- Login (`LoginPage.jsx`) POSTs to `${VITE_BACKEND_URL}/api/users/login` with credentials + role. On success the response contains `data.access_token` which is saved to localStorage via `setAuthToken`.
- Signup (`SignupPage.jsx`) POSTs `multipart/form-data` to `${VITE_BACKEND_URL}/api/users/register` (supports profile photo upload).
- Token helper: `src/auth.js` exports `getAuthToken`, `setAuthToken`, `removeAuthToken`.

Security note: Tokens are stored in localStorage in this code; consider using httpOnly cookies for production or an additional refresh-token strategy.

## � Routing overview

- `/` — home (CV dashboard and CV-builder routes mounted inside `pages/home/homepage.jsx`)
- `/login` — sign in page
- `/signup` — sign up page
- `/admin/*` — admin dashboard pages and company/job management
- CV routes (examples): `/selecttemplate`, `/addaboutme`, `/viewtemplate/cv00`

## ✅ Quick start (development)

1. Clone repo

```powershell
git clone https://github.com/Damidu00/job-Xpert-frontend.git
cd job-Xpert-frontend
```

2. Create `.env` with backend URL

```powershell
echo "VITE_BACKEND_URL=http://localhost:5000" > .env
```

3. Install and run

```powershell
npm install
npm run dev
```

Open http://localhost:5173 (or the port Vite displays).

## 🧪 Tests & linting

- Linting: `npm run lint` (ESLint is configured in the repo). Add unit tests as needed — no test runner is present in the current repo snapshot.

## � Deployment notes

- Build with `npm run build` and serve static files from your static host (Netlify, Vercel, Surge) or a node static server.
- Ensure environment variables are provided to the hosting platform (VITE_BACKEND_URL).

## 🙌 Contribution

If you'd like to contribute:

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes, push, and open a PR

Please follow existing code style (JSX + Tailwind / MUI) and keep components small and focused.

## ⚠️ Troubleshooting (common issues)

- "CORS" errors: ensure the backend allows the dev origin or configure a proxy.
- "Network Error" on login: verify `VITE_BACKEND_URL` and that backend is running.
- Token not saved: check browser localStorage and console logs (login component logs token on success).

## 📌 Next recommended improvements

- Move token handling to a secure cookie + refresh-token flow.
- Add unit/integration tests (Vitest + React Testing Library).
- TypeScript migration for stronger typing.
- Add CI pipeline to run lint and tests on PRs.

---

Made with ❤️ by the Job-Xpert contributors.

```bash
# Fork the repo and clone your copy
git clone https://github.com/your-username/job-xpert-frontend.git

# Create a new branch
git checkout -b feature/your-feature-name

# Commit your changes
git commit -m "Added a cool feature"

# Push to your fork
git push origin feature/your-feature-name

# Open a Pull Request 🎉
```
## 📃 License

This project is licensed under the MIT License. See LICENSE for details.

## 💬 Feedback

# We’d love to hear your feedback! Feel free to:
📧 Open issues
🛠️ Submit pull requests
🤝 Contact the team

## Made with ❤️ using React, Vite, Material-UI, and TailwindCSS.
