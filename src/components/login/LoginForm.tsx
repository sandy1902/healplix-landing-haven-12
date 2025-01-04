import { Form } from "@/components/ui/form";
import { LoginFormFields } from "./LoginFormFields";
import { LoginActions } from "./LoginActions";
import { useLoginForm } from "./useLoginForm";

export function LoginForm() {
  const { form, showPassword, setShowPassword, isLoading, onSubmit } = useLoginForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <LoginFormFields 
          form={form} 
          showPassword={showPassword} 
          setShowPassword={setShowPassword} 
        />
        <LoginActions isLoading={isLoading} />
      </form>
    </Form>
  );
}