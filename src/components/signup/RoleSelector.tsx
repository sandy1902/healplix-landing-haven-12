import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RoleSelectorProps {
  control: Control<any>;
}

export function RoleSelector({ control }: RoleSelectorProps) {
  return (
    <FormField
      control={control}
      name="role"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Role</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="user" />
                </FormControl>
                <FormLabel className="font-normal">User</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="doctor" />
                </FormControl>
                <FormLabel className="font-normal">Doctor</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="executive" />
                </FormControl>
                <FormLabel className="font-normal">Executive</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}