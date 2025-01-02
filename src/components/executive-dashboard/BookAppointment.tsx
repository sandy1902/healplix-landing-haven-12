import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function BookAppointment() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    userId: "",
    doctorName: "",
    date: "",
    time: "",
    type: "consultation"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Appointment Booked",
      description: "The appointment has been successfully booked.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Appointment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userId">User</Label>
            <select
              id="userId"
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
            >
              <option value="">Select User</option>
              <option value="1">John Doe</option>
              <option value="2">Jane Smith</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctorName">Doctor</Label>
            <Input
              id="doctorName"
              value={formData.doctorName}
              onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
              placeholder="Enter doctor's name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Appointment Type</Label>
            <select
              id="type"
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="consultation">Consultation</option>
              <option value="followup">Follow-up</option>
              <option value="checkup">Regular Checkup</option>
            </select>
          </div>

          <Button type="submit" className="w-full">Book Appointment</Button>
        </form>
      </CardContent>
    </Card>
  );
}