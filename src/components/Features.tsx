import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, Brain, Droplet, User, Baby, Scissors, TestTube, ChevronRight, Stethoscope, Eye, 
  Ear, Dna, Bone, Activity, UserRound, Microscope } from "lucide-react";
import { Link } from "react-router-dom";

const mainSpecialties = [
  {
    icon: Heart,
    title: "Cardiology"
  },
  {
    icon: Brain,
    title: "Neurology"
  },
  {
    icon: Droplet,
    title: "Nephrology"
  },
  {
    icon: User,
    title: "Urology"
  },
  {
    icon: Baby,
    title: "Pediatrics"
  },
  {
    icon: Scissors,
    title: "Laparoscopic Surgery"
  },
  {
    icon: Baby,
    title: "Fertility Care"
  },
  {
    icon: TestTube,
    title: "Oncology"
  }
];

const allSpecialties = [
  ...mainSpecialties,
  { icon: Stethoscope, title: "Gastroenterology" },
  { icon: Activity, title: "Hepatology" },
  { icon: Scissors, title: "Laser" },
  { icon: Bone, title: "Rheumatology" },
  { icon: Ear, title: "ENT" },
  { icon: Eye, title: "Ophthalmology" },
  { icon: Microscope, title: "Radiology" },
  { icon: UserRound, title: "Dermatology" },
  { icon: Scissors, title: "Plastic Surgery" },
  { icon: Baby, title: "Neonatology" },
  { icon: Brain, title: "Neurosurgery" },
  { icon: UserRound, title: "Gynecology" },
  { icon: Baby, title: "Obstetrics" },
  { icon: Dna, title: "Endocrinology" },
  { icon: Stethoscope, title: "General Medicine" },
  { icon: Droplet, title: "Diabetology" },
  { icon: Brain, title: "Psychiatry" },
  { icon: Stethoscope, title: "Chest Physician" },
  { icon: Bone, title: "Spine Surgery" },
  { icon: Activity, title: "Vascular Surgery" },
  { icon: Activity, title: "Breast" },
];

const SpecialtyCard = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <div className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow animate-scale-in cursor-pointer">
    <div className="w-12 h-12 mx-auto mb-2 bg-[#f0f9ff] rounded-full flex items-center justify-center">
      <Icon className="w-6 h-6 text-[#1e3a8a]" />
    </div>
    <h3 className="text-sm font-medium text-[#1e3a8a]">{title}</h3>
  </div>
);

export const Features = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a]">
            Our Specialties
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {mainSpecialties.map((specialty, index) => (
            <SpecialtyCard key={index} {...specialty} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
        </div>
      </div>
    </section>
  );
};