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
              <ProtectedRoute allowedRoles={['user']}>
                <UserDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/doctor-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/executive-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['executive']}>
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

// Protected Route component with role-based access
const ProtectedRoute = ({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode;
  allowedRoles: string[];
}) => {
  const [session, setSession] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication and fetch user role
    const checkAuth = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);

      if (currentSession?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', currentSession.user.id)
          .single();
        
        setUserRole(profile?.role || null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole as string)) {
    // Redirect to appropriate dashboard based on role
    switch (userRole) {
      case 'executive':
        return <Navigate to="/executive-dashboard" replace />;
      case 'doctor':
        return <Navigate to="/doctor-dashboard" replace />;
      default:
        return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default App;