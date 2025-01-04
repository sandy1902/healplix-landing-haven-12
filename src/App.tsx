import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SubscriberDashboard from "./pages/SubscriberDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import DoctorSearch from "./pages/DoctorSearch";
import HospitalSearch from "./pages/HospitalSearch";
import ForgotPassword from "./pages/ForgotPassword";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import { Toaster } from "./components/ui/toaster";
import "./App.css";

function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={session ? <SubscriberDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/doctor-dashboard"
          element={session ? <DoctorDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/executive-dashboard"
          element={session ? <ExecutiveDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/search-doctors"
          element={session ? <DoctorSearch /> : <Navigate to="/login" />}
        />
        <Route
          path="/search-hospitals"
          element={session ? <HospitalSearch /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;