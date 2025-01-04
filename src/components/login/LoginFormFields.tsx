import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  identifier: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormFieldsProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
};

export function LoginFormFields({ form, showPassword, setShowPassword }: LoginFormFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="identifier"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#1A1F2C] text-base font-medium font-sans">Email Address</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Enter your email address"
                className="border-[#9b87f5]/20 focus:border-[#9b87f5] focus:ring-[#9b87f5] font-sans"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#1A1F2C] text-base font-medium font-sans">Password</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="border-[#9b87f5]/20 focus:border-[#9b87f5] focus:ring-[#9b87f5] pr-10 font-sans"
                  {...field}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    </>
  );
}