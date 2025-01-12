import { Heart, Brain, Droplet, User, Baby, TestTube, Eye, Bone, Microscope } from "lucide-react";
import { SpecialtyCard } from "./SpecialtyCard";
import { SectionTitle } from "../ui/SectionTitle";
import { AllSpecialtiesDialog } from "./AllSpecialtiesDialog";

const mainSpecialties = [
  { icon: Heart, title: "Cardiology" },
  { icon: Brain, title: "Neurology" },
  { icon: Droplet, title: "Nephrology" },
  { icon: Bone, title: "Orthopedics" },
  { icon: Baby, title: "Pediatrics" },
  { icon: TestTube, title: "Oncology" },
  { icon: User, title: "Urology" },
  { icon: Eye, title: "Eye" },
  { icon: Microscope, title: "Radiology" }
];

export const SpecialtiesSection = () => (
  <>
    <SectionTitle title="Our Specialties" />
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-4">
      {mainSpecialties.map((specialty, index) => (
        <SpecialtyCard key={index} {...specialty} />
      ))}
    </div>
    <div className="flex justify-center mt-8">
      <AllSpecialtiesDialog />
    </div>
  </>
);