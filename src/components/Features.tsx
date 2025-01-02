import { Calendar, Clock, Users, Shield } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Easy Scheduling",
    description: "Book appointments 24/7 with our intuitive scheduling system"
  },
  {
    icon: Clock,
    title: "Instant Confirmation",
    description: "Receive immediate confirmation and reminders for your appointments"
  },
  {
    icon: Users,
    title: "Find Specialists",
    description: "Connect with the right healthcare providers for your needs"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your health information is protected with enterprise-grade security"
  }
];

export const Features = () => {
  return (
    <section id="features" className="section-padding bg-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Healplix?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We make healthcare accessible and convenient with features designed around your needs
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <feature.icon className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};