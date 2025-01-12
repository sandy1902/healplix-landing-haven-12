import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronRight, Activity, Heart, Stethoscope, UserRound, Droplet, Ear, Dna, Eye, Baby, 
  Scissors, Brain, Bone, Microscope } from "lucide-react";
import { Link } from "react-router-dom";
import { SpecialtyCard } from "./SpecialtyCard";

const allSpecialties = [
  { icon: Activity, title: "Breast" },
  { icon: Heart, title: "Cardiology" },
  { icon: Stethoscope, title: "Chest Physician" },
  { icon: UserRound, title: "Dermatology" },
  { icon: Droplet, title: "Diabetology" },
  { icon: Ear, title: "ENT" },
  { icon: Dna, title: "Endocrinology" },
  { icon: Eye, title: "Eye" },
  { icon: Baby, title: "Fertility Care" },
  { icon: Stethoscope, title: "Gastro\nEnterology" },
  { icon: Stethoscope, title: "General Medicine" },
  { icon: UserRound, title: "Gynecology" },
  { icon: Activity, title: "Hepatology" },
  { icon: Scissors, title: "Laparoscopic Surgery" },
  { icon: Scissors, title: "Laser" },
  { icon: Droplet, title: "Nephrology" },
  { icon: Baby, title: "Neonatology" },
  { icon: Brain, title: "Neurology" },
  { icon: Brain, title: "Neurosurgery" },
  { icon: Baby, title: "Obstetrics" },
  { icon: TestTube, title: "Oncology" },
  { icon: Bone, title: "Orthopedics" },
  { icon: Baby, title: "Pediatrics" },
  { icon: Scissors, title: "Plastic Surgery" },
  { icon: Brain, title: "Psychiatry" },
  { icon: Microscope, title: "Radiology" },
  { icon: Bone, title: "Rheuma\ntology" },
  { icon: Bone, title: "Spine Surgery" },
  { icon: User, title: "Urology" },
  { icon: Activity, title: "Vascular Surgery" }
];

export const AllSpecialtiesDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button 
        variant="ghost" 
        className="text-primary hover:text-primary/90 flex items-center gap-2"
      >
        See All Specialties
        <ChevronRight className="w-4 h-4" />
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-center mb-6">All Medical Specialties</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
        {allSpecialties.map((specialty, index) => (
          <SpecialtyCard key={index} {...specialty} />
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Link to="/search-doctors">
          <Button className="bg-primary text-white hover:bg-primary/90">
            Find Doctors
          </Button>
        </Link>
      </div>
    </DialogContent>
  </Dialog>
);