import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { StatisticsSection } from "@/components/statistics/StatisticsSection";
import { FeaturedDoctors } from "@/components/doctors/FeaturedDoctors";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <FeaturedDoctors />
      <StatisticsSection />
      <Testimonials />
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Index;