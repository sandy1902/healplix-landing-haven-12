import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import DoctorSearch from "./pages/DoctorSearch";
import HospitalSearch from "./pages/HospitalSearch";
import ForgotPassword from "./pages/ForgotPassword";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import { Toaster } from "./components/ui/toaster";
import { supabase } from "./integrations/supabase/client";
import "./App.css";

function App() {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/doctor-dashboard" 
            element={
              <ProtectedRoute>
                <DoctorDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/executive-dashboard" 
            element={
              <ProtectedRoute>
                <ExecutiveDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/search-doctors" element={<DoctorSearch />} />
          <Route path="/search-hospitals" element={<HospitalSearch />} />
        </Routes>
        <Toaster />
      </Router>
    </SessionContextProvider>
  );
}

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const session = supabase.auth.getSession();
  
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default App;