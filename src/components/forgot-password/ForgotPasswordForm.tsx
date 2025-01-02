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
import { Link } from "react-router-dom";

const formSchema = z.object({
  emailOrPhone: z.string().min(1, "Email or phone number is required"),
});

export function ForgotPasswordForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrPhone: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "Reset link sent!",
      description: "Please check your email for password reset instructions.",
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

        <div className="space-y-4">
          <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90">
            Send Reset Link
          </Button>
          
          <p className="text-center text-sm text-gray-300">
            Remember your password?{" "}
            <Link to="/login" className="font-medium text-white hover:text-gray-200 underline underline-offset-4">
              Back to Login
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}