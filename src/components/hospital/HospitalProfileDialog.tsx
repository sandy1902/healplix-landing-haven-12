import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Hospital } from "@/types/hospital";
import { ImageCarousel } from "./ImageCarousel";
import { DoctorsList } from "./DoctorsList";

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
      <DialogContent className="max-w-[1000px] h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{hospital.name}</DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto flex-1 px-2">
          <div className="space-y-6">
            <ImageCarousel images={hospital.images} />

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="text-gray-600">{hospital.location}</p>
                <div className="mt-2">
                  <span className="text-[#1A1F2C] font-semibold">Rating: {hospital.rating}/5</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Specialities</h3>
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

              <div>
                <h3 className="text-lg font-semibold mb-2">Insurance Providers</h3>
                <div className="flex flex-wrap gap-2">
                  {hospital.insuranceProviders.map((provider) => (
                    <span
                      key={provider}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {provider}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Reviews</h3>
                <div className="space-y-4">
                  {hospital.reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{review.userName}</span>
                        <span className="text-[#9b87f5]">{review.rating}/5</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              <DoctorsList doctors={hospital.doctors} />

              <div className="flex gap-4 mt-6">
                <Button
                  onClick={() => onRequestCallback(hospital)}
                  variant="outline"
                  className="flex-1 border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10"
                >
                  Request Callback
                </Button>
                <Button
                  onClick={() => onAdmissionEnquiry(hospital)}
                  className="flex-1 bg-[#9b87f5] hover:bg-[#8b77e5] text-white"
                >
                  Send Admission Enquiry
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}