import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddressSectionProps {
  formData: {
    address: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AddressSection({ formData, handleChange }: AddressSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Address</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 md:col-span-2">
          <Label htmlFor="address">Street Address</Label>
          <Input 
            id="address" 
            placeholder="Enter street address" 
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="city">City</Label>
          <Input 
            id="city" 
            placeholder="Enter city" 
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="district">District</Label>
          <Input 
            id="district" 
            placeholder="Enter district" 
            value={formData.district}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="state">State</Label>
          <Input 
            id="state" 
            placeholder="Enter state" 
            value={formData.state}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="pincode">Pincode</Label>
          <Input 
            id="pincode" 
            placeholder="Enter pincode" 
            value={formData.pincode}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}