import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => (
  <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300">
    <div className="w-12 h-12 mx-auto mb-4 bg-[#f0f9ff] rounded-full flex items-center justify-center">
      <Icon className="w-6 h-6 text-[#1e3a8a]" />
    </div>
    <h3 className="text-lg font-semibold text-[#1e3a8a] mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);