import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RoleSelector } from "./RoleSelector";
import { SignupFormFields } from "./SignupFormFields";
import { useSignupForm } from "./useSignupForm";

export function SignupForm() {
  const { form, onSubmit } = useSignupForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <SignupFormFields control={form.control} />
        <RoleSelector control={form.control} />

        <div className="flex flex-col space-y-4">
          <Button type="submit" className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-sans">
            Sign Up
          </Button>
          <p className="text-center text-[#7E69AB] font-sans">
            Already have an account?{" "}
            <Link to="/login" className="text-[#9b87f5] hover:text-[#7E69AB] font-medium">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}