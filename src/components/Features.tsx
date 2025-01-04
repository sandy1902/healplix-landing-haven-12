import { Calendar, Clock, Users, Shield } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Easy Scheduling",
    description: "Book appointments 24/7 with our intuitive scheduling system",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
  {
    icon: Clock,
    title: "Instant Confirmation",
    description: "Receive immediate confirmation and reminders for your appointments",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  },
  {
    icon: Users,
    title: "Find Specialists",
    description: "Connect with the right healthcare providers for your needs",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your health information is protected with enterprise-grade security",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
  }
];

export const Features = () => {
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
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
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