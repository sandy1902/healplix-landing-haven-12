import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const specialtiesByCategory = {
  "General Medicine": [
    "General Medicine",
    "Family Medicine",
    "Internal Medicine",
  ],
  "Surgery": [
    "General Surgery",
    "Laparoscopic Surgery",
    "Plastic Surgery",
    "Vascular Surgery",
  ],
  "Specialized Care": [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Gynecology",
    "Pediatrics",
    "Dermatology",
  ],
  "Diagnostic": [
    "Radiology",
    "Pathology",
    "Laboratory Medicine",
  ],
  "Others": [
    "ENT",
    "Eye",
    "Dental",
    "Psychiatry",
    "Physiotherapy",
  ]
};

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
      
      <Tabs defaultValue="General Medicine" className="w-full">
        <TabsList className="w-full flex flex-wrap justify-start gap-2 bg-transparent h-auto p-0">
          {Object.keys(specialtiesByCategory).map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(specialtiesByCategory).map(([category, specialties]) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {specialties.map((specialty) => (
                <div
                  key={specialty}
                  className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <h3 className="text-sm font-medium text-[#1e3a8a] text-center">{specialty}</h3>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

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