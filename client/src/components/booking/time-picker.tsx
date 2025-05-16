import { Skeleton } from "@/components/ui/skeleton";

interface TimePickerProps {
  availableTimes: string[];
  selectedTime?: string;
  onTimeSelect: (time: string) => void;
  isLoading?: boolean;
}

export default function TimePicker({ 
  availableTimes, 
  selectedTime, 
  onTimeSelect,
  isLoading 
}: TimePickerProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-2">
        {Array(8).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-10" />
        ))}
      </div>
    );
  }
  
  if (!availableTimes.length) {
    return (
      <div className="text-center p-4 border border-dashed border-neutral rounded-md">
        <p className="text-neutral-dark opacity-70">
          Please select a date and therapist to see available times
        </p>
      </div>
    );
  }
  
  // Some standard time slots for demonstration purposes
  const timeSlots = [
    "9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", 
    "3:00 PM", "4:30 PM", "6:00 PM", "7:30 PM"
  ];
  
  return (
    <div className="grid grid-cols-4 gap-2">
      {timeSlots.map((time) => {
        const isAvailable = availableTimes.includes(time);
        const isSelected = selectedTime === time;
        
        return (
          <button
            key={time}
            type="button"
            disabled={!isAvailable}
            className={`
              p-2 border rounded-md text-neutral-dark transition-colors
              ${isSelected 
                ? 'border-primary bg-primary-light text-white' 
                : isAvailable 
                  ? 'border-neutral hover:bg-primary hover:text-white hover:border-primary' 
                  : 'opacity-50 cursor-not-allowed border-neutral'
              }
            `}
            onClick={() => isAvailable && onTimeSelect(time)}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}
