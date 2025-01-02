import { Link } from "react-router-dom";
import { SignupForm } from "@/components/signup/SignupForm";

export default function Signup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary/90 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Create an Account</h1>
            <p className="text-gray-300">Join us and start your journey</p>
          </div>
          
          <SignupForm />

          <p className="text-center text-sm text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-white hover:text-gray-200 underline underline-offset-4">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}