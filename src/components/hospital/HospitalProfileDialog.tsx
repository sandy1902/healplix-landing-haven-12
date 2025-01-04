import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Hospital } from "@/types/hospital";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === hospital.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? hospital.images.length - 1 : prev - 1
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] h-[90vh] p-0 bg-[#F1F0FB]/95 backdrop-blur-sm">
        <DialogHeader className="p-6 bg-[#F1F0FB]/95 backdrop-blur-sm">
          <DialogTitle className="text-2xl font-bold text-[#333333] text-center">Hospital Profile</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-full px-6 pb-20 overflow-y-auto [&_[data-radix-scroll-area-viewport]]:!block [&_[data-radix-scroll-area-scrollbar]]:!w-4 [&_[data-radix-scroll-area-thumb]]:!bg-[#7E69AB]/50">
          <div className="space-y-8">
            {/* Hospital Images Carousel */}
            <div className="relative">
              <ScrollArea className="w-full whitespace-nowrap rounded-lg">
                <div className="flex space-x-4 p-4 relative">
                  {hospital.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${hospital.name} - Image ${index + 1}`}
                      className="h-48 w-64 object-cover rounded-lg inline-block"
                    />
                  ))}
                </div>
              </ScrollArea>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={previousImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hospital.doctors.map((doctor) => (
                  <div key={doctor.name} className="flex items-start space-x-4 p-4 bg-white rounded-lg">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>DR</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-[#333333]">{doctor.name}</h4>
                      <p className="text-sm text-[#7E69AB]">{doctor.speciality}</p>
                      <p className="text-sm text-[#8E9196]">{doctor.qualification}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#333333] mb-4">Patient Reviews</h3>
              <div className="space-y-4">
                {hospital.reviews?.map((review) => (
                  <div key={review.id} className="bg-white p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{review.userName[0]}</AvatarFallback>
                        </Avatar>
                        <span className="ml-2 font-medium">{review.userName}</span>
                      </div>
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

            {/* Specialities */}
            <div className="bg-white/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#333333] mb-4">Specialities</h3>
              <ul className="list-disc list-inside text-[#555555]">
                {hospital.specialities.map((spec) => (
                  <li key={spec}>{spec}</li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="bg-white/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#333333] mb-4">Services</h3>
              <ul className="list-disc list-inside text-[#555555]">
                <li>24/7 Emergency Care</li>
                <li>Advanced Diagnostic Services</li>
                <li>Inpatient and Outpatient Care</li>
                <li>Rehabilitation Services</li>
              </ul>
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