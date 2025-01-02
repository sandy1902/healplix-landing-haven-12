import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Hospital } from "@/types/hospital";

interface HospitalProfileDialogProps {
  hospital: Hospital;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequestCallback: (hospital: Hospital) => void;
  onAdmissionEnquiry: (hospital: Hospital) => void;
}

export function HospitalProfileDialog({
  hospital,
  open,
  onOpenChange,
  onRequestCallback,
  onAdmissionEnquiry,
}: HospitalProfileDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] bg-white p-6 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary bg-accent/50 p-4 rounded-lg">
            {hospital.name}
          </DialogTitle>
        </DialogHeader>

        {/* Hospital Images */}
        <div className="mt-6">
          <img
            src={hospital.image}
            alt={hospital.name}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        {/* Doctors Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-[#1A1F2C] mb-3">Our Doctors</h3>
          <p className="text-[#8E9196]">
            Our hospital features a team of highly qualified medical professionals dedicated to providing exceptional care.
          </p>
        </div>

        {/* Specialities Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-[#1A1F2C] mb-3">Specialities</h3>
          <div className="flex flex-wrap gap-2">
            {hospital.specialities.map((spec) => (
              <span
                key={spec}
                className="px-3 py-1.5 bg-[#9b87f5]/10 text-[#9b87f5] rounded-full text-sm font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-[#1A1F2C] mb-3">Services</h3>
          <ul className="list-disc list-inside text-[#8E9196] space-y-2">
            <li>24/7 Emergency Care</li>
            <li>Advanced Diagnostic Services</li>
            <li>Inpatient and Outpatient Care</li>
            <li>Rehabilitation Services</li>
          </ul>
        </div>

        {/* Location Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-[#1A1F2C] mb-3">Location</h3>
          <p className="text-[#8E9196]">{hospital.location}</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => onAdmissionEnquiry(hospital)}
            className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white flex-1"
          >
            Send Admission Enquiry
          </Button>
          <Button
            onClick={() => onRequestCallback(hospital)}
            variant="outline"
            className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10 flex-1"
          >
            Request Callback
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}