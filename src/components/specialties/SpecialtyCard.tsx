import { LucideIcon } from "lucide-react";

interface SpecialtyCardProps {
  icon: LucideIcon;
  title: string;
}

export const SpecialtyCard = ({ icon: Icon, title }: SpecialtyCardProps) => (
  <div className="bg-white rounded-lg p-3 text-center shadow-sm hover:shadow-md transition-shadow animate-scale-in cursor-pointer">
    <div className="w-10 h-10 mx-auto mb-2 bg-[#f0f9ff] rounded-full flex items-center justify-center">
      <Icon className="w-5 h-5 text-[#1e3a8a]" />
    </div>
    <h3 className="text-xs font-medium text-[#1e3a8a] whitespace-pre-line break-words min-h-[2.5rem]">{title}</h3>
  </div>
);