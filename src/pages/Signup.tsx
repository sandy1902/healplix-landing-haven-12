import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SignupForm } from "@/components/signup/SignupForm";

export default function Signup() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#9b87f5]/5 to-[#7E69AB]/5">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-2xl p-8 space-y-6 border border-[#9b87f5]/20">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-[#1A1F2C] font-poppins mb-2">Create an Account</h1>
              <p className="text-[#7E69AB] font-sans">Join us and start your journey</p>
            </div>
            <SignupForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}