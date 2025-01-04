import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Hospital } from "@/types/hospital";
import { Star } from "lucide-react";
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
  onAdmissionEnquiry 
}: HospitalProfileDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] h-[90vh] p-0 bg-[#F1F0FB]/95 backdrop-blur-sm">
        <DialogHeader className="p-6 bg-[#F1F0FB]/95 backdrop-blur-sm">
          <DialogTitle className="text-2xl font-bold text-[#333333] text-center">Hospital Profile</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-full px-6 pb-20 overflow-y-auto [&_[data-radix-scroll-area-viewport]]:!block [&_[data-radix-scroll-area-scrollbar]]:!w-4 [&_[data-radix-scroll-area-thumb]]:!bg-[#7E69AB]/50">
          <div className="space-y-8">
            {/* Hospital Images Carousel */}
            <ImageCarousel images={hospital.images} />

            {/* Hospital Details */}
            <div className="bg-white/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#333333] mb-4">{hospital.name}</h3>
              <p className="text-[#8E9196]">{hospital.location}</p>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= hospital.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-[#7E69AB] font-medium">
                  {hospital.rating}/5
                </span>
              </div>
            </div>

            {/* Doctors */}
            <div className="bg-white/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#333333] mb-4">Our Doctors</h3>
              <DoctorsList doctors={hospital.doctors} />
            </div>

            {/* Reviews */}
            <div className="bg-white/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#333333] mb-4">Patient Reviews</h3>
              <div className="space-y-4">
                {hospital.reviews?.map((review) => (
                  <div key={review.id} className="bg-white p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{review.userName}</span>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Button 
                onClick={() => onRequestCallback(hospital)}
                variant="outline"
                className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10 w-full"
              >
                Request Callback
              </Button>
              <Button 
                onClick={() => onAdmissionEnquiry(hospital)}
                className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white w-full"
              >
                Send Admission Enquiry
              </Button>
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