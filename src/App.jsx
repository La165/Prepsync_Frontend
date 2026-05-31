import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

import WeakAreas from "./pages/WeakAreas";

import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import StudyPlan from "./pages/StudyPlan";
import Topics from "./pages/Topics";
import Revision from "./pages/Revision";
import Subjects from "./pages/Subjects";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>


<Route path="/register" element={<Register />} />
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Protected Layout */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >

        <Route index element={<Dashboard />} /> 
         <Route path="profile" element={<Profile />} />
        <Route path="subjects" element={<Subjects />} /> 
        <Route path="weak-areas" element={<WeakAreas />} />
        <Route path="study-plan" element={<StudyPlan />} /> 
         <Route path="topics" element={<Topics />} />   
        <Route path="revision"  element={<Revision />} />  
      </Route>



    </Routes>
  );
}

export default App;

