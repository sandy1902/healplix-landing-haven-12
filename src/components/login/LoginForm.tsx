import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const formSchema = z.object({
  emailOrPhone: z.string().min(1, "Email or phone number is required"),
  password: z.string().min(1, "Password is required"),
});

export function LoginForm() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrPhone: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "Login successful!",
      description: "Welcome back to Healplix.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="emailOrPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#1A1F2C] text-base font-medium font-sans">
                Email or Phone Number
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your email or phone number" 
                  {...field}
                  className="bg-white/50 backdrop-blur-sm border-[#9b87f5]/20 focus:border-[#9b87f5]/50 focus:ring-[#9b87f5]/50 font-sans"
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
              <FormLabel className="text-[#1A1F2C] text-base font-medium font-sans">
                Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...field}
                    className="bg-white/50 backdrop-blur-sm border-[#9b87f5]/20 focus:border-[#9b87f5]/50 focus:ring-[#9b87f5]/50 pr-10 font-sans"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-[#7E69AB]" />
                    ) : (
                      <Eye className="h-4 w-4 text-[#7E69AB]" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <div className="flex justify-end mt-1">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-[#9b87f5] hover:text-[#7E69AB] transition-colors font-sans"
                >
                  Forgot Password?
                </Link>
              </div>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-sans">
          Login
        </Button>
      </form>
    </Form>
  );
}