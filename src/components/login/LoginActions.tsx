import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type LoginActionsProps = {
  isLoading: boolean;
};

export function LoginActions({ isLoading }: LoginActionsProps) {
  return (
    <>
      <div className="text-right">
        <Link
          to="/forgot-password"
          className="text-[#9b87f5] hover:text-[#7E69AB] transition-colors text-sm font-medium font-sans"
        >
          Forgot Password?
        </Link>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-sans"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>

      <div className="text-center mt-4">
        <p className="text-[#1A1F2C] font-sans">
          Don't have an account?{" "}
          <Link 
            to="/signup" 
            className="text-[#9b87f5] hover:text-[#7E69AB] transition-colors font-medium"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </>
  );
}