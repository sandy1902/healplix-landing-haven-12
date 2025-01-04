import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface GlobalSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function GlobalSearchBar({ value, onChange, placeholder = "Search by keywords..." }: GlobalSearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10 border-[#9b87f5]/30 focus:border-[#9b87f5] focus:ring-[#9b87f5]/20"
      />
    </div>
  );
}