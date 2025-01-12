import { Users, UserCog, Building2 } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatItem = ({ icon, value, label }: StatItemProps) => (
  <div className="flex flex-col items-center p-6 transition-transform hover:scale-105">
    <div className="p-4 rounded-full bg-primary/10 mb-4">
      {icon}
    </div>
    <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
      {value}
    </h3>
    <p className="text-gray-600 text-sm md:text-base">{label}</p>
  </div>
);

export const StatisticsSection = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatItem
            icon={<Users className="w-8 h-8 text-primary" />}
            value="10K+"
            label="Satisfied Users"
          />
          <StatItem
            icon={<UserCog className="w-8 h-8 text-primary" />}
            value="250+"
            label="Professional Doctors"
          />
          <StatItem
            icon={<Building2 className="w-8 h-8 text-primary" />}
            value="100+"
            label="Partnered Hospitals"
          />
        </div>
      </div>
    </div>
  );
};