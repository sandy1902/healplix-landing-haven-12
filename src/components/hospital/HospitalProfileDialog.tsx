import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
  const [showReviews, setShowReviews] = useState(false);
  const [showInsurance, setShowInsurance] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] md:max-w-[1000px] h-[90vh] bg-white/95 backdrop-blur-sm shadow-xl border-2 border-secondary/20 p-4 md:p-6">
        <DialogHeader className="border-b pb-4 md:pb-6">
          <DialogTitle className="text-xl md:text-2xl font-bold text-center text-primary">
            {hospital.name}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(100vh-280px)] px-2 md:px-8">
          <div className="space-y-6 md:space-y-8 pb-20 md:pb-24">
            <ImageCarousel images={[
              "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
              "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
              "https://images.unsplash.com/photo-1516549655169-df83a0774514",
              "https://images.unsplash.com/photo-1538108149393-fbbd81895907",
              "https://images.unsplash.com/photo-1559000357-f6b52ddfbe37",
              "https://images.unsplash.com/photo-1579684385127-1ef15d508118"
            ]} />

            <div className="space-y-4 md:space-y-6">
              <div className="bg-accent/50 p-4 md:p-6 rounded-lg shadow-sm">
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-primary">About</h3>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">{hospital.location}</p>
                <div className="mt-3 md:mt-4">
                  <span className="text-primary font-semibold text-base md:text-lg">
                    Rating: {hospital.rating}/5
                  </span>
                </div>
              </div>

              <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-primary">Specialities</h3>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {hospital.specialities.map((spec) => (
                    <span
                      key={spec}
                      className="px-3 py-1.5 md:px-4 md:py-2 bg-[#9b87f5]/10 text-[#9b87f5] rounded-full text-xs md:text-sm font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-primary">Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {[
                    "24/7 Emergency Care",
                    "Laboratory Services",
                    "Diagnostic Imaging",
                    "Pharmacy",
                    "Rehabilitation Services",
                    "Outpatient Surgery"
                  ].map((service) => (
                    <div 
                      key={service}
                      className="flex items-center p-2 md:p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-gray-700 text-sm md:text-base">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <DoctorsList doctors={hospital.doctors} hospitalName={hospital.name} />

              <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <h3 className="text-lg md:text-xl font-semibold text-primary">Insurance Providers</h3>
                  <span
                    onClick={() => setShowInsurance(!showInsurance)}
                    className="text-[#9b87f5] hover:text-[#8b77e5] cursor-pointer font-medium text-sm md:text-base"
                  >
                    View
                  </span>
                </div>
                
                {showInsurance && (
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {hospital.insuranceProviders.map((provider) => (
                      <span
                        key={provider}
                        className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 text-gray-700 rounded-full text-xs md:text-sm font-medium"
                      >
                        {provider}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <h3 className="text-lg md:text-xl font-semibold text-primary">Reviews</h3>
                  <Button
                    variant="outline"
                    onClick={() => setShowReviews(!showReviews)}
                    className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10 text-sm md:text-base px-3 md:px-4"
                  >
                    {showReviews ? 'Hide Reviews' : 'View Reviews'}
                  </Button>
                </div>
                
                {showReviews && (
                  <div className="space-y-3 md:space-y-4 mt-3 md:mt-4">
                    {hospital.reviews.map((review) => (
                      <div key={review.id} className="bg-accent/50 p-4 md:p-6 rounded-lg">
                        <div className="flex items-center justify-between mb-2 md:mb-3">
                          <span className="font-medium text-base md:text-lg text-primary">{review.userName}</span>
                          <span className="text-[#9b87f5] font-semibold">{review.rating}/5</span>
                        </div>
                        <p className="text-gray-700 mb-2 md:mb-3 leading-relaxed text-sm md:text-base">{review.comment}</p>
                        <span className="text-xs md:text-sm text-gray-500">{review.date}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="bg-white py-4 md:py-6 border-t mt-auto">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 px-4 md:px-8">
            <Button
              onClick={() => onRequestCallback(hospital)}
              variant="outline"
              className="w-full md:flex-1 border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10"
            >
              Request Callback
            </Button>
            <Button
              onClick={() => onAdmissionEnquiry(hospital)}
              className="w-full md:flex-1 bg-[#9b87f5] hover:bg-[#8b77e5] text-white"
            >
              Send Admission Enquiry
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}