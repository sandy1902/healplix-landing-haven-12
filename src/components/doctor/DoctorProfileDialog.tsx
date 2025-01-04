import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { Doctor } from "@/types/doctor";

interface DoctorProfileDialogProps {
  doctor: Doctor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DoctorProfileDialog({ doctor, open, onOpenChange }: DoctorProfileDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Doctor Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={doctor.image} alt={doctor.name} />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-[#1A1F2C]">{doctor.name}</h2>
              <p className="text-[#7E69AB] font-medium">{doctor.specialization}</p>
              <p className="text-[#8E9196]">{doctor.qualification}</p>
              <p className="text-[#8E9196]">{doctor.experience} experience</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-[#8E9196]">
                <Mail className="h-4 w-4" />
                <span>doctor@example.com</span>
              </div>
              <div className="flex items-center gap-2 text-[#8E9196]">
                <Phone className="h-4 w-4" />
                <span>+1 234 567 8900</span>
              </div>
            </div>
          </div>

          {/* Clinic Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Clinic Details</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-2 text-[#8E9196]">
                <MapPin className="h-4 w-4 mt-1" />
                <div>
                  <p className="font-medium text-[#1A1F2C]">{doctor.clinicName}</p>
                  <p>{doctor.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#8E9196]">
                <Clock className="h-4 w-4" />
                <span>Mon-Sat: 9:00 AM - 5:00 PM</span>
              </div>
            </div>
          </div>

          {/* Consultation Options */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Consultation Options</h3>
            <div className="space-y-2">
              {doctor.videoConsultation.available && (
                <p>Video Consultation: ₹{doctor.videoConsultation.charges}</p>
              )}
              {doctor.clinicVisit.available && (
                <p>Clinic Visit: ₹{doctor.clinicVisit.charges}</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}