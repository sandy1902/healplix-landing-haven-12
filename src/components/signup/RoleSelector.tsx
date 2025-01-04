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
          <FormLabel className="text-[#1A1F2C] text-base font-medium font-sans">Role</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-2"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="user" className="border-[#9b87f5]/20 text-[#9b87f5]" />
                </FormControl>
                <FormLabel className="font-normal text-[#7E69AB] font-sans">User</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="doctor" className="border-[#9b87f5]/20 text-[#9b87f5]" />
                </FormControl>
                <FormLabel className="font-normal text-[#7E69AB] font-sans">Doctor</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="executive" className="border-[#9b87f5]/20 text-[#9b87f5]" />
                </FormControl>
                <FormLabel className="font-normal text-[#7E69AB] font-sans">Executive</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
}