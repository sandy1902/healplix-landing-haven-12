import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface TimeSlotProps {
  day: string;
  time: string;
  available: boolean;
  videoConsultation: boolean;
  clinicAppointment: boolean;
  onToggleSlot: () => void;
  onToggleAppointmentType: (type: 'videoConsultation' | 'clinicAppointment') => void;
}

export function TimeSlot({
  day,
  time,
  available,
  videoConsultation,
  clinicAppointment,
  onToggleSlot,
  onToggleAppointmentType
}: TimeSlotProps) {
  return (
    <div 
      className={`flex flex-col space-y-2 p-4 rounded-lg transition-all duration-300 ${
        available 
          ? 'bg-white border-2 border-secondary/20 shadow-sm hover:shadow-md' 
          : 'bg-gray-50 border border-gray-200'
      }`}
    >
      <div className="flex flex-col items-center space-y-2">
        <Label 
          htmlFor={`${day}-${time}`}
          className="text-base font-medium"
        >
          {time}
        </Label>
        <div className="flex items-center gap-2">
          <Label className="text-sm text-gray-600">No</Label>
          <Slider
            id={`${day}-${time}`}
            value={[available ? 100 : 0]}
            onValueChange={(value) => {
              if (value[0] === 100 || value[0] === 0) {
                onToggleSlot();
              }
            }}
            max={100}
            step={100}
            className="w-[60px]"
          />
          <Label className="text-sm text-gray-600">Yes</Label>
        </div>
      </div>
      
      {available && (
        <div className="flex flex-col space-y-3 mt-2 pt-3 border-t">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`video-${time}`}
              checked={videoConsultation}
              onCheckedChange={() => onToggleAppointmentType('videoConsultation')}
              className="border-secondary/50"
            />
            <Label 
              htmlFor={`video-${time}`}
              className="text-sm text-gray-600"
            >
              Video Consultation
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`clinic-${time}`}
              checked={clinicAppointment}
              onCheckedChange={() => onToggleAppointmentType('clinicAppointment')}
              className="border-secondary/50"
            />
            <Label 
              htmlFor={`clinic-${time}`}
              className="text-sm text-gray-600"
            >
              Clinic Appointment
            </Label>
          </div>
        </div>
      )}
    </div>
  );
}