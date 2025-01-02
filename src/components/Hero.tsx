import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158')] bg-cover bg-center">
        <div className="absolute inset-0 hero-gradient" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl animate-fade-up">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Healthcare Scheduling Made Simple
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Book appointments with healthcare providers instantly. No more waiting on hold or complicated scheduling processes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-lg">
              Book Appointment
            </Button>
            <Button size="lg" variant="outline" className="text-lg text-white border-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};