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
    <div>
      <TabsList className="w-full bg-transparent p-0">
        <TabsTrigger 
          value={value} 
          className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
          onClick={onToggle}
        >
          <Icon className="h-5 w-5 mr-3" />
          {label}
          {isOpen ? (
            <Minus className="h-4 w-4 ml-auto" />
          ) : (
            <Plus className="h-4 w-4 ml-auto" />
          )}
        </TabsTrigger>
      </TabsList>
      {isOpen && (
        <TabsContent value={value} className="bg-white rounded-lg p-4 shadow-lg mb-2">
          {children}
        </TabsContent>
      )}
    </div>
  );
}