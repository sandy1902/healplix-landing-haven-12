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
          <FormLabel className="text-white text-base font-medium mb-1">Role</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-2"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="user" />
                </FormControl>
                <FormLabel className="font-normal text-white">User</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="doctor" />
                </FormControl>
                <FormLabel className="font-normal text-white">Doctor</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="executive" />
                </FormControl>
                <FormLabel className="font-normal text-white">Executive</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage className="text-red-300" />
        </FormItem>
      )}
    />
  );
}