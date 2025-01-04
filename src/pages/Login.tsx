import { Link } from "react-router-dom";
import { LoginForm } from "@/components/login/LoginForm";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E7F0FD] to-[#ACCBEE]">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-2xl p-8 space-y-6 border border-white/30">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Login to your account</p>
            </div>
            
            <LoginForm />

            <p className="text-center text-sm text-gray-600">
              New to Healplix?{" "}
              <Link to="/signup" className="font-medium text-primary hover:text-primary/80 underline underline-offset-4">
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