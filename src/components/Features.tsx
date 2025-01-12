import { ServicesSection } from "./services/ServicesSection";
import { SpecialtiesSection } from "./specialties/SpecialtiesSection";
import { StatisticsSection } from "./statistics/StatisticsSection";

export const Features = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <ServicesSection />
        <StatisticsSection />
        <SpecialtiesSection />
      </div>
    </section>
  );
};