import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Create an Account",
    description: "Sign up in minutes with your basic information"
  },
  {
    number: "02",
    title: "Find Your Provider",
    description: "Search and filter through our network of qualified healthcare providers"
  },
  {
    number: "03",
    title: "Book Appointment",
    description: "Select a convenient time slot and book instantly"
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Healplix Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get started with Healplix in three simple steps
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-secondary mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button size="lg" className="text-lg">
            Get Started Now
          </Button>
        </div>
      </div>
    </section>
  );
};