import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function DoctorSchedule() {
  const { toast } = useToast();
  
  const handleUpdateSchedule = () => {
    toast({
      title: "Schedule Updated",
      description: "Your availability has been updated successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule & Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-4">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="space-y-2">
              <h3 className="font-semibold text-center">{day}</h3>
              <div className="space-y-1">
                <Button
                  variant="outline"
                  className="w-full text-xs"
                  onClick={handleUpdateSchedule}
                >
                  9:00 AM
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-xs"
                  onClick={handleUpdateSchedule}
                >
                  2:00 PM
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-xs"
                  onClick={handleUpdateSchedule}
                >
                  5:00 PM
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}