import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Hospital } from "@/types/hospital";
import { AdmissionEnquiryForm } from "./AdmissionEnquiryForm";

interface HospitalProfileDialogProps {
  hospital: Hospital;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HospitalProfileDialog({ hospital, open, onOpenChange }: HospitalProfileDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] h-[90vh] p-0 bg-[#F1F0FB]/95 backdrop-blur-sm">
        <DialogHeader className="p-6 bg-[#F1F0FB]/95 backdrop-blur-sm">
          <DialogTitle className="text-2xl font-bold text-[#333333] text-center">Hospital Profile</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-full px-6 pb-20 overflow-y-auto [&_[data-radix-scroll-area-viewport]]:!block [&_[data-radix-scroll-area-scrollbar]]:!w-4 [&_[data-radix-scroll-area-thumb]]:!bg-[#7E69AB]/50">
          <div className="space-y-8">
            {/* Hospital Images */}
            <div className="flex justify-center">
              <img
                src={hospital.image}
                alt={hospital.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            {/* Hospital Details */}
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#333333] mb-4">{hospital.name}</h3>
              <p className="text-[#8E9196]">{hospital.location}</p>
              <p className="text-[#7E69AB] font-medium">Rating: {hospital.rating}</p>
            </div>

            {/* Specialities */}
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#333333] mb-4">Specialities</h3>
              <ul className="list-disc list-inside text-[#555555]">
                {hospital.specialities.map((spec) => (
                  <li key={spec}>{spec}</li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#333333] mb-4">Services</h3>
              <ul className="list-disc list-inside text-[#555555]">
                <li>24/7 Emergency Care</li>
                <li>Advanced Diagnostic Services</li>
                <li>Inpatient and Outpatient Care</li>
                <li>Rehabilitation Services</li>
              </ul>
            </div>

            {/* Back to Search Results Button */}
            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => onOpenChange(false)}
                variant="outline"
                className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10"
              >
                Back to Search Results
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
