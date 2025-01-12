import { Button } from "@/components/ui/button";

const specialties = [
  {
    title: "Cardiology",
    imagePath: "/lovable-uploads/70758108-0f7d-4f9b-90a5-a5f5a3280bae.png"
  },
  {
    title: "Neurology",
    imagePath: "/lovable-uploads/70758108-0f7d-4f9b-90a5-a5f5a3280bae.png"
  },
  {
    title: "Nephrology",
    imagePath: "/lovable-uploads/70758108-0f7d-4f9b-90a5-a5f5a3280bae.png"
  },
  {
    title: "Urology",
    imagePath: "/lovable-uploads/70758108-0f7d-4f9b-90a5-a5f5a3280bae.png"
  },
  {
    title: "Pediatrics",
    imagePath: "/lovable-uploads/70758108-0f7d-4f9b-90a5-a5f5a3280bae.png"
  },
  {
    title: "Laparoscopic Surgery",
    imagePath: "/lovable-uploads/70758108-0f7d-4f9b-90a5-a5f5a3280bae.png"
  },
  {
    title: "Fertility Care",
    imagePath: "/lovable-uploads/70758108-0f7d-4f9b-90a5-a5f5a3280bae.png"
  }
];

export const Features = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {specialties.map((specialty, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex items-center gap-3"
            >
              <div className="w-10 h-10 flex-shrink-0">
                <img 
                  src={specialty.imagePath} 
                  alt={specialty.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-sm font-medium text-[#1e3a8a] text-left flex-grow">{specialty.title}</h3>
              <span className="text-gray-400">&gt;</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};