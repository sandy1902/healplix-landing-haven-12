import { Link } from "react-router-dom";
import { LoginForm } from "@/components/login/LoginForm";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary/90">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-8 space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-gray-300">Login to your account</p>
            </div>
            
            <LoginForm />

            <p className="text-center text-sm text-gray-300">
              New to Healplix?{" "}
              <Link to="/signup" className="font-medium text-white hover:text-gray-200 underline underline-offset-4">
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