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
              <FormLabel className="text-white text-base font-medium mb-1">
                Email or Phone Number
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your email or phone number" 
                  {...field}
                  className="bg-white/5 backdrop-blur-sm border-gray-700"
                />
              </FormControl>
              <FormMessage className="text-red-300" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white text-base font-medium mb-1">
                Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...field}
                    className="bg-white/5 backdrop-blur-sm border-gray-700 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-red-300" />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90">
          Login
        </Button>
      </form>
    </Form>
  );
}