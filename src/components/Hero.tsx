import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { generateMedicalImage } from "@/services/imageService";

export const Hero = () => {
  const [heroImage, setHeroImage] = useState<string>("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158");

  useEffect(() => {
    const generateHeroImage = async () => {
      const prompt = "Modern hospital building exterior, professional medical facility, clean and welcoming environment, photorealistic style";
      const imageUrl = await generateMedicalImage(prompt);
      if (imageUrl) {
        setHeroImage(imageUrl);
      }
    };

    generateHeroImage();
  }, []);

  return (
    <div className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-500" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 hero-gradient" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl animate-fade-up">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your Health Journey Starts Here
          </h1>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Connect with top healthcare providers, schedule appointments instantly, and take control of your healthcare experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-lg bg-secondary hover:bg-secondary/90">
              Book Appointment
            </Button>
            <Button size="lg" variant="outline" className="text-lg text-white border-white hover:bg-white/10">
              Explore Services
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};