import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import DoctorSearch from "@/pages/DoctorSearch";
import Index from "@/pages/Index";
import AboutUs from "@/pages/AboutUs";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search-doctors" element={<DoctorSearch />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster />
    </AuthProvider>
  );
}

export default App;