# 🚀 PrepSync Frontend

PrepSync is a smart learning tracker web application designed to help students efficiently manage subjects, track topics, identify weak areas, and improve learning consistency.

Built using modern frontend technologies with a scalable and responsive UI.

---

## 🌐 Live Demo

👉 https://prepsync-frontend.vercel.app/

---

## 🔗 Backend URL

https://prepsyncbackend-production.up.railway.app/

---

## 🛠 Tech Stack

- ⚛️ React 18  
- ⚡ Vite  
- 🎨 Tailwind CSS v4  
- 🔄 React Router DOM v7  
- 📡 Axios (API calls)  
- 📊 Recharts (data visualization)  
- 🔔 React Hot Toast (notifications)  
- 🎯 Lucide React (icons)  

---

## ✨ Features

- 🔐 User Authentication (Login / Register)  
- 🧭 Protected Routes with JWT  
- 📊 Interactive Dashboard  
- 📚 Subject & Topic Management  
- ⚠️ Weak Areas Analysis  
- 🧠 Study Plan Module  
- 🔁 Revision Tracking System  
- 📈 Progress Visualization using Charts  
- 📱 Fully Responsive UI  

---

## 📁 Project Structure

src/
│
├── components/     Reusable UI components (Navbar, Sidebar, Layout)
├── pages/          Application pages (Login, Register, Dashboard, etc.)
├── routes/         Protected routing logic
├── services/       Axios API layer
├── api.js          API configuration
├── App.jsx         Main routing configuration
├── main.jsx        Entry point

---

## ⚙️ Installation & Setup

### Clone the repository
git clone https://github.com/La165/prepsync-frontend.git  
cd prepsync-frontend  

### Install dependencies
npm install  

### Setup environment variables

Create a .env file in root:

VITE_API_URL=https://your-backend-url  

### Run locally
npm run dev  

App runs at:
http://localhost:5173  

---

## 🌍 API Integration

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

---

## 🚀 Build for Production

npm run build  

Output folder:
dist/

---

## ☁️ Deployment (Vercel)

Create vercel.json:

{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}

Add environment variables in Vercel dashboard.

---

## 🔐 Authentication Flow

- User logs in / registers
- Backend returns JWT token
- Token stored in localStorage
- Axios interceptor attaches token
- Protected routes block unauthorized access

---

## 📊 Key Highlights

- Modern React 18 architecture  
- Scalable folder structure  
- Secure JWT authentication  
- API-driven UI  
- Fully responsive design  
- Production-ready deployment  

---

## 👩‍💻 Author

Lalitha  
GitHub: https://github.com/La165
