import { ForgotPasswordForm } from "@/components/forgot-password/ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary/90 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
            <p className="text-gray-300">Enter your email to reset your password</p>
          </div>
          
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}