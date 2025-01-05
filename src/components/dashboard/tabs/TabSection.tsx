import { Plus, Minus } from "lucide-react";
import { TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LucideIcon } from "lucide-react";

interface TabSectionProps {
  value: string;
  label: string;
  icon: LucideIcon;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function TabSection({ value, label, icon: Icon, isOpen, onToggle, children }: TabSectionProps) {
  return (
    <div className="mb-2">
      <TabsList className="w-full bg-transparent p-0">
        <TabsTrigger 
          value={value} 
          className="w-full justify-start rounded-lg transition-all duration-200
            bg-white hover:bg-gray-50 
            data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white 
            shadow-sm hover:shadow-md
            text-lg py-3 px-6 
            border border-gray-100
            group"
          onClick={onToggle}
        >
          <div className="flex items-center w-full">
            <Icon className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">{label}</span>
            {isOpen ? (
              <Minus className="h-4 w-4 ml-auto opacity-70" />
            ) : (
              <Plus className="h-4 w-4 ml-auto opacity-70" />
            )}
          </div>
        </TabsTrigger>
      </TabsList>
      {isOpen && (
        <TabsContent 
          value={value} 
          className="mt-2 bg-white rounded-lg p-6 shadow-lg 
            border border-gray-100
            animate-fade-up"
        >
          {children}
        </TabsContent>
      )}
    </div>
  );
}