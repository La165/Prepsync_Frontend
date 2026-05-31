🚀 PrepSync Frontend

PrepSync is a smart learning tracker web application designed to help students efficiently manage subjects, track topics, identify weak areas, and improve learning consistency.

Built using modern frontend technologies with a scalable and responsive UI.

🌐 Live Demo

👉 https://prepsync-frontend.vercel.app/


Backend Url:https://prepsyncbackend-production.up.railway.app/

🛠 Tech Stack

⚛️ React 18
⚡ Vite
🎨 Tailwind CSS v4
🔄 React Router DOM v7
📡 Axios (API calls)
📊 Recharts (data visualization)
🔔 React Hot Toast (notifications)
🎯 Lucide React (icons)
✨ Features
🔐 User Authentication (Login / Register)
🧭 Protected Routes with JWT
📊 Interactive Dashboard
📚 Subject & Topic Management
⚠️ Weak Areas Analysis
🧠 Study Plan Module
🔁 Revision Tracking System
📈 Progress Visualization using Charts
📱 Fully Responsive UI
📁 Project Structure
src/
│
├── components/        # Reusable UI components (Navbar, Sidebar, Layout)
├── pages/             # Application pages (Login, Register, Dashboard, etc.)
├── routes/            # Protected routing logic
├── services/          # Axios API layer
├── api.js/            # Api 
├── App.jsx            # Main routing configuration
├── main.jsx           # Entry point

⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/La165/prepsync-frontend.git
cd prepsync-frontend
2. Install dependencies
npm install
3. Setup environment variables

Create a .env file in the root:

VITE_API_URL=https://your-backend-url
4. Run locally
npm run dev

App runs at:

http://localhost:5173
🌍 API Integration

Axios is used for backend communication:

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
🚀 Build for Production
npm run build

Output will be generated in:

dist/
☁️ Deployment (Vercel)

This project is deployed using Vercel.

Important setup:
Add vercel.json for SPA routing:
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}



Add environment variables in Vercel dashboard


🔐 Authentication Flow
User logs in / registers
Backend returns JWT token
Token stored in localStorage
Axios interceptor attaches token to requests
Protected routes restrict unauthorized access


📊 Key Highlights
Modern React 18 architecture
Scalable folder structure
Secure JWT authentication
API-driven UI
Responsive design for all devices
Production-ready deployment setup


👩‍💻 Author
Lalitha
GitHub: https://github.com/La165


