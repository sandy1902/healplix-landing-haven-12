import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
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
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<SubscriberDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/executive-dashboard" element={<ExecutiveDashboard />} />
        <Route path="/search-doctors" element={<DoctorSearch />} />
        <Route path="/search-hospitals" element={<HospitalSearch />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;