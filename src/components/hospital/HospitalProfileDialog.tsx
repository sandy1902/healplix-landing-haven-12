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
      <DialogContent className="max-w-[1000px] h-[90vh] bg-white shadow-2xl border-2 border-secondary/20">
        <div className="px-8 py-6 overflow-y-auto h-full">
          <DialogHeader className="border-b pb-6 mb-8">
            <DialogTitle className="text-2xl font-bold text-center text-primary">
              {hospital.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-8">
            <ImageCarousel images={hospital.images} />

            <div className="space-y-6">
              <div className="bg-accent p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-primary">About</h3>
                <p className="text-gray-700 leading-relaxed">{hospital.location}</p>
                <div className="mt-4">
                  <span className="text-primary font-semibold text-lg">
                    Rating: {hospital.rating}/5
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-primary">Specialities</h3>
                <div className="flex flex-wrap gap-3">
                  {hospital.specialities.map((spec) => (
                    <span
                      key={spec}
                      className="px-4 py-2 bg-[#9b87f5]/10 text-[#9b87f5] rounded-full text-sm font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-primary">Insurance Providers</h3>
                <div className="flex flex-wrap gap-3">
                  {hospital.insuranceProviders.map((provider) => (
                    <span
                      key={provider}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      {provider}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-primary">Reviews</h3>
                <div className="space-y-4">
                  {hospital.reviews.map((review) => (
                    <div key={review.id} className="bg-accent/50 p-6 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-lg text-primary">{review.userName}</span>
                        <span className="text-[#9b87f5] font-semibold">{review.rating}/5</span>
                      </div>
                      <p className="text-gray-700 mb-3 leading-relaxed">{review.comment}</p>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              <DoctorsList doctors={hospital.doctors} />

              <div className="sticky bottom-0 bg-white pt-6 border-t mt-8">
                <div className="flex gap-4">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}