import { Calendar, Clock, Users, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { generateMedicalImage } from "@/services/imageService";
import { toast } from "sonner";

const features = [
  {
    icon: Calendar,
    title: "Easy Scheduling",
    description: "Book appointments 24/7 with our intuitive scheduling system",
    imagePrompt: "Medical calendar with appointments, clean modern design, minimalist"
  },
  {
    icon: Clock,
    title: "Instant Confirmation",
    description: "Receive immediate confirmation and reminders for your appointments",
    imagePrompt: "Doctor checking digital schedule on tablet, professional medical setting"
  },
  {
    icon: Users,
    title: "Find Specialists",
    description: "Connect with the right healthcare providers for your needs",
    imagePrompt: "Group of diverse medical professionals in white coats, friendly and professional"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your health information is protected with enterprise-grade security",
    imagePrompt: "Medical data security concept, digital protection shield over medical records"
  }
];

export const Features = () => {
  const [featureImages, setFeatureImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateFeatureImages = async () => {
      try {
        console.log("Starting feature image generation...");
        const imagePromises = features.map(feature => {
          console.log(`Generating image for: ${feature.title}`);
          return generateMedicalImage(feature.imagePrompt);
        });
        const images = await Promise.all(imagePromises);
        console.log("Generated feature images:", images);
        const filteredImages = images.filter(Boolean) as string[];
        if (filteredImages.length === 0) {
          toast.error("Failed to generate feature images");
        }
        setFeatureImages(filteredImages);
      } catch (error) {
        console.error("Error generating feature images:", error);
        toast.error("Failed to generate feature images");
      } finally {
        setLoading(false);
      }
    };

    generateFeatureImages();
  }, []);

  return (
    <section id="features" className="section-padding bg-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Why Choose Healplix?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We make healthcare accessible and convenient with features designed around your needs
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card group hover:transform hover:scale-105 transition-all duration-300">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                {loading ? (
                  <div className="w-full h-full bg-gray-200 animate-pulse" />
                ) : featureImages[index] ? (
                  <img
                    src={featureImages[index]}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      console.error(`Error loading image for ${feature.title}`);
                      e.currentTarget.src = "https://via.placeholder.com/400x300?text=Image+Failed+to+Load";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Image not available</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <feature.icon className="absolute bottom-4 left-4 w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};