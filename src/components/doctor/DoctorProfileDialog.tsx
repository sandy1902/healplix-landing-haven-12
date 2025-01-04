import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Mail, Phone, Clock, Award, Star, BookOpen, Heart, User } from "lucide-react";
import { Doctor } from "@/types/doctor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DoctorProfileDialogProps {
  doctor: Doctor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DoctorProfileDialog({ doctor, open, onOpenChange }: DoctorProfileDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[90vh] p-0 bg-[#F1F0FB]/95 backdrop-blur-sm">
        <DialogHeader className="p-6 sticky top-0 bg-[#F1F0FB]/95 backdrop-blur-sm z-10">
          <DialogTitle className="text-2xl font-bold text-[#333333] text-center">Doctor Profile</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[calc(90vh-8rem)] px-6">
          <div className="space-y-8">
            {/* Profile Header */}
            <div className="flex items-start gap-6 bg-white/50 p-6 rounded-lg">
              <Avatar className="h-32 w-32">
                <AvatarImage src={doctor.image} alt={doctor.name} />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-[#333333]">{doctor.name}</h2>
                <p className="text-[#7E69AB] font-medium">{doctor.specialization}</p>
                <p className="text-[#8E9196]">{doctor.qualification}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium text-[#333333]">4.8</span>
                  <span className="text-[#8E9196]">(120+ Reviews)</span>
                </div>
              </div>
            </div>

            {/* Qualifications & Experience */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3 bg-white/50 p-6 rounded-lg">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#7E69AB]" />
                  <h3 className="text-lg font-semibold text-[#333333]">Qualifications</h3>
                </div>
                <ul className="space-y-2 text-[#555555]">
                  <li>MBBS - Medical College (2005)</li>
                  <li>MD - Cardiology (2010)</li>
                  <li>Fellowship in Interventional Cardiology (2012)</li>
                </ul>
              </div>
              
              <div className="space-y-3 bg-white/50 p-6 rounded-lg">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-[#7E69AB]" />
                  <h3 className="text-lg font-semibold text-[#333333]">Experience</h3>
                </div>
                <p className="text-[#555555]">{doctor.experience}</p>
                <ul className="space-y-2 text-[#555555]">
                  <li>Senior Cardiologist at Heart Care Hospital (2015-Present)</li>
                  <li>Consultant at City Medical Center (2012-2015)</li>
                </ul>
              </div>
            </div>

            {/* Specialities & Services */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3 bg-white/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-[#333333]">Specialities</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Cardiology</Badge>
                  <Badge variant="secondary">Interventional Cardiology</Badge>
                  <Badge variant="secondary">Echo Cardiography</Badge>
                  <Badge variant="secondary">Preventive Cardiology</Badge>
                </div>
              </div>

              <div className="space-y-3 bg-white/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-[#333333]">Services</h3>
                <ul className="space-y-2 text-[#555555]">
                  <li>• Cardiac Consultation</li>
                  <li>• ECG</li>
                  <li>• Stress Test</li>
                  <li>• Heart Disease Management</li>
                </ul>
              </div>
            </div>

            {/* Awards & Recognition */}
            <div className="space-y-3 bg-white/50 p-6 rounded-lg">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-[#7E69AB]" />
                <h3 className="text-lg font-semibold text-[#333333]">Awards & Recognition</h3>
              </div>
              <ul className="space-y-2 text-[#555555]">
                <li>• Best Cardiologist Award 2020</li>
                <li>• Excellence in Medical Research 2018</li>
                <li>• Healthcare Innovation Award 2019</li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3 bg-white/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-[#333333]">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#555555]">
                    <Mail className="h-4 w-4 text-[#7E69AB]" />
                    <span>{doctor.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#555555]">
                    <Phone className="h-4 w-4 text-[#7E69AB]" />
                    <span>{doctor.contactNumber}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 bg-white/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-[#333333]">Clinic Details</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-[#555555]">
                    <MapPin className="h-4 w-4 mt-1 text-[#7E69AB]" />
                    <div>
                      <p className="font-medium">{doctor.clinicName}</p>
                      <p>{doctor.clinicLocation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[#555555]">
                    <Clock className="h-4 w-4 text-[#7E69AB]" />
                    <span>{doctor.clinicTimings}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer with Back Button */}
        <div className="sticky bottom-0 p-4 bg-[#F1F0FB]/95 backdrop-blur-sm border-t flex justify-end">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="hover:bg-[#7E69AB] hover:text-white transition-colors"
          >
            Back to Search
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}