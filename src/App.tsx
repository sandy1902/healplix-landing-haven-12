import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import DoctorSearch from "@/pages/DoctorSearch";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search-doctors" element={<DoctorSearch />} />
      </Routes>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
