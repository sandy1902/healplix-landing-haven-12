import { Link } from "react-router-dom";
import { LoginForm } from "@/components/login/LoginForm";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#9b87f5]/5 to-[#7E69AB]/5">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-2xl p-8 space-y-6 border border-[#9b87f5]/20">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-[#1A1F2C] font-poppins mb-2">Welcome Back</h1>
              <p className="text-[#7E69AB] font-sans">Login to your account</p>
            </div>
            
            <LoginForm />

            <p className="text-center text-sm text-[#7E69AB] font-sans">
              New to Healplix?{" "}
              <Link to="/signup" className="font-medium text-[#9b87f5] hover:text-[#7E69AB] underline underline-offset-4">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}