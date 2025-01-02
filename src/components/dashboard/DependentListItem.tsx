import { Button } from "@/components/ui/button";
import { Check, X, XCircle } from "lucide-react";

interface DependentListItemProps {
  dependent: {
    id: string;
    name: string;
    relation: string;
    age: string;
    gender: string;
    status: "pending" | "approved" | "rejected";
  };
  onUpdateStatus: (id: string, status: "approved" | "rejected") => void;
  onRemove: (id: string) => void;
}

export function DependentListItem({
  dependent,
  onUpdateStatus,
  onRemove,
}: DependentListItemProps) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div>
        <p className="font-medium">{dependent.name}</p>
        <div className="text-sm text-gray-500">
          <p>
            {dependent.relation} • {dependent.age} years • {dependent.gender}
          </p>
          <p
            className={`mt-1 ${
              dependent.status === "approved"
                ? "text-green-500"
                : dependent.status === "rejected"
                ? "text-red-500"
                : "text-yellow-500"
            }`}
          >
            Status: {dependent.status.charAt(0).toUpperCase() + dependent.status.slice(1)}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        {dependent.status === "pending" && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onUpdateStatus(dependent.id, "approved")}
              className="text-green-500"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onUpdateStatus(dependent.id, "rejected")}
              className="text-red-500"
            >
              <XCircle className="h-4 w-4" />
            </Button>
          </>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(dependent.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}