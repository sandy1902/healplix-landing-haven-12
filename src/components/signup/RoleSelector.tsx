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
          <FormLabel className="text-white text-base font-medium font-sans mb-1">Role</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-2"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="user" className="border-gray-400 text-[#9b87f5]" />
                </FormControl>
                <FormLabel className="font-normal text-white font-sans">User</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="doctor" className="border-gray-400 text-[#9b87f5]" />
                </FormControl>
                <FormLabel className="font-normal text-white font-sans">Doctor</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="executive" className="border-gray-400 text-[#9b87f5]" />
                </FormControl>
                <FormLabel className="font-normal text-white font-sans">Executive</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage className="text-red-200" />
        </FormItem>
      )}
    />
  );
}