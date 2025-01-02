import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-primary mb-8 animate-fade-up">About Healplix</h1>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6 animate-fade-up">
                <h2 className="text-2xl font-semibold text-primary">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                  At Healplix, we're dedicated to transforming healthcare accessibility through innovative digital solutions. Our platform connects patients with qualified healthcare providers, making quality healthcare services more accessible to everyone.
                </p>
                <Button className="mt-4">Learn More</Button>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl animate-fade-up">
                <img 
                  src="/lovable-uploads/719ebe3c-450b-43b2-beb7-24a67b55231c.png" 
                  alt="Healthcare Professional" 
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-up">
                <h3 className="text-xl font-semibold text-primary mb-4">Our Vision</h3>
                <p className="text-gray-700">
                  To create a world where quality healthcare is just a click away, breaking down barriers to medical access.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-up">
                <h3 className="text-xl font-semibold text-primary mb-4">Our Values</h3>
                <p className="text-gray-700">
                  Integrity, innovation, and patient-centered care drive everything we do at Healplix.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-up">
                <h3 className="text-xl font-semibold text-primary mb-4">Our Impact</h3>
                <p className="text-gray-700">
                  Connecting thousands of patients with healthcare providers, making healthcare more accessible every day.
                </p>
              </div>
            </div>

            <div className="bg-accent p-8 rounded-lg animate-fade-up">
              <h2 className="text-2xl font-semibold text-primary mb-6">Join Us in Transforming Healthcare</h2>
              <p className="text-gray-700 mb-6">
                Whether you're a healthcare provider or a patient, be part of our growing community dedicated to making healthcare more accessible and efficient.
              </p>
              <div className="flex gap-4">
                <Button>Join as Provider</Button>
                <Button variant="outline">Find Care</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;