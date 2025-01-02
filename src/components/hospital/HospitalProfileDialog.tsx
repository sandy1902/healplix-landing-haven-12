import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Hospital } from "@/types/hospital";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
}: HospitalProfileDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] bg-white p-6 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary bg-accent/50 p-4 rounded-lg">
            {hospital.name}
          </DialogTitle>
        </DialogHeader>

        {/* Hospital Images Carousel */}
        <div className="mt-6">
          <Carousel className="w-full max-w-[500px] mx-auto">
            <CarouselContent>
              {[hospital.image, ...(hospital.images || [])].map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <img
                      src={image}
                      alt={`${hospital.name} - Image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Doctors Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-[#1A1F2C] mb-3">Our Doctors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hospital.doctors?.map((doctor, index) => (
              <div 
                key={index}
                className="p-4 bg-[#9b87f5]/10 rounded-lg"
              >
                <h4 className="font-semibold text-[#1A1F2C]">{doctor.name}</h4>
                <p className="text-[#8E9196] text-sm">{doctor.qualification}</p>
                <p className="text-[#9b87f5] text-sm mt-1">{doctor.speciality}</p>
              </div>
            ))}
          </div>
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
      </DialogContent>
    </Dialog>
  );
}