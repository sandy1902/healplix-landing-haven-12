import { format } from "date-fns";
import { DaySchedule, TimeSlot } from "@/types/appointment";

export const getAvailableSlots = (
  date: Date | undefined,
  doctorSchedule: DaySchedule[]
): TimeSlot[] => {
  if (!date) return [];
  
  const dayOfWeek = format(date, 'EEE');
  const daySchedule = doctorSchedule.find(schedule => schedule.day === dayOfWeek);
  
  if (daySchedule && daySchedule.isAvailable) {
    return daySchedule.slots.filter(slot => slot.available);
  }
  
  return [];
};

export const isDateDisabled = (date: Date, doctorSchedule: DaySchedule[]): boolean => {
  const dayOfWeek = format(date, 'EEE');
  const daySchedule = doctorSchedule.find(schedule => schedule.day === dayOfWeek);
  return date < new Date() || !daySchedule?.isAvailable;
};