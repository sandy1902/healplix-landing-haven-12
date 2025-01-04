import { Button } from "@/components/ui/button";

const specialties = [
  {
    icon: "/lovable-uploads/0d5b3abf-46be-468a-8b88-06fb1cd51517.png",
    title: "Internal Medicine",
    doctors: "30+ Doctors"
  },
  {
    icon: "/lovable-uploads/0d5b3abf-46be-468a-8b88-06fb1cd51517.png",
    title: "Dental Care",
    doctors: "20+ Doctors"
  },
  {
    icon: "/lovable-uploads/0d5b3abf-46be-468a-8b88-06fb1cd51517.png",
    title: "Urology Care",
    doctors: "20+ Doctors"
  },
  {
    icon: "/lovable-uploads/0d5b3abf-46be-468a-8b88-06fb1cd51517.png",
    title: "Neurology Care",
    doctors: "10+ Doctors"
  }
];

export const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 text-[#00b341] mb-4">
            <span className="text-lg font-normal">OUR COMPREHENSIVE SPECIALTIES</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a]">
            From Routine Check-Ups To Advanced Treatments, We've Got You Covered.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialties.map((specialty, index) => (
            <div key={index} className="bg-white rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#f0f9ff] rounded-full flex items-center justify-center">
                <img src={specialty.icon} alt={specialty.title} className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold text-[#1e3a8a] mb-2">{specialty.title}</h3>
              <p className="text-gray-600 mb-6">{specialty.doctors}</p>
              <Button variant="outline" className="w-full border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white">
                MAKE AN APPOINTMENT
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};