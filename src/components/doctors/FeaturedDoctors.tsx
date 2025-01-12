import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Doctor {
  name: string;
  qualification: string;
  speciality: string;
  image: string;
}

const doctors: Doctor[] = [
  {
    name: "Dr. Sarah Wilson",
    qualification: "MBBS, MD",
    speciality: "Cardiologist",
    image: "/lovable-uploads/0f34eb7c-2e0a-4f28-a8b6-f1f533395d1f.png"
  },
  {
    name: "Dr. Michael Chen",
    qualification: "MBBS, MS",
    speciality: "Orthopedic Surgeon",
    image: "/lovable-uploads/0f34eb7c-2e0a-4f28-a8b6-f1f533395d1f.png"
  },
  {
    name: "Dr. Emily Rodriguez",
    qualification: "MBBS, DNB",
    speciality: "Pediatrician",
    image: "/lovable-uploads/0f34eb7c-2e0a-4f28-a8b6-f1f533395d1f.png"
  },
  {
    name: "Dr. James Anderson",
    qualification: "MBBS, DM",
    speciality: "Neurologist",
    image: "/lovable-uploads/0f34eb7c-2e0a-4f28-a8b6-f1f533395d1f.png"
  }
];

export const FeaturedDoctors = () => {
  const [api, setApi] = useState<any>();

  useEffect(() => {
    if (!api) return;

    // Autoplay functionality
    const interval = setInterval(() => {
      api.scrollNext();
    }, 2000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#1A1F2C]">
          Meet Our Professional Doctors
        </h2>
        <Carousel setApi={setApi} className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {doctors.map((doctor, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card 
                  className="border-0 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300 animate-fade-up mx-2"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-lg text-[#1A1F2C] mb-2">{doctor.name}</h3>
                    <p className="text-[#7E69AB] text-sm mb-1">{doctor.qualification}</p>
                    <p className="text-[#9b87f5] text-sm font-medium">{doctor.speciality}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};