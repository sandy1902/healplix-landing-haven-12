import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export default function BookAppointment() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    userId: "",
    doctorName: "",
    date: "",
    time: "",
    appointmentType: "video-consultation"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Appointment Booked",
      description: `The ${formData.appointmentType.replace('-', ' ')} has been successfully booked.`,
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
            <Label>Appointment Type</Label>
            <RadioGroup
              value={formData.appointmentType}
              onValueChange={(value) => setFormData({ ...formData, appointmentType: value })}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="video-consultation" id="video" />
                <Label htmlFor="video">Video Consultation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="clinic-visit" id="clinic" />
                <Label htmlFor="clinic">Clinic Visit</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="follow-up" id="followup" />
                <Label htmlFor="followup">Follow-up</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full">Book Appointment</Button>
        </form>
      </CardContent>
    </Card>
  );
}