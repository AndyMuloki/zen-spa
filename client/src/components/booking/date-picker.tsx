import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, isBefore, startOfToday, getDay, addMonths, startOfMonth, getMonth, getYear, parse } from 'date-fns';

interface DatePickerProps {
  selectedDate?: Date;
  onDateChange: (date: Date) => void;
  disablePastDates?: boolean;
}

export default function DatePicker({ 
  selectedDate, 
  onDateChange, 
  disablePastDates = true 
}: DatePickerProps) {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState<Date>(selectedDate || today);
  const [calendarDays, setCalendarDays] = useState<{ date: Date; isCurrentMonth: boolean; isDisabled: boolean }[]>([]);
  
  useEffect(() => {
    const firstDayOfMonth = startOfMonth(currentMonth);
    const startingDayOfWeek = getDay(firstDayOfMonth);
    
    // Create an array of days for the calendar
    const days = [];
    
    // Add days from previous month if needed
    const prevMonth = addMonths(firstDayOfMonth, -1);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = addDays(firstDayOfMonth, -i - 1);
      days.push({
        date,
        isCurrentMonth: false,
        isDisabled: disablePastDates ? isBefore(date, today) : false
      });
    }
    
    // Add days for current month
    for (let i = 0; i < 42 - startingDayOfWeek; i++) {
      const date = addDays(firstDayOfMonth, i);
      
      // Stop if we've gone more than 1 month ahead
      if (getMonth(date) !== getMonth(firstDayOfMonth) && days.length >= 35) break;
      
      days.push({
        date,
        isCurrentMonth: getMonth(date) === getMonth(firstDayOfMonth),
        isDisabled: disablePastDates ? isBefore(date, today) : false
      });
    }
    
    setCalendarDays(days);
  }, [currentMonth, today, disablePastDates]);
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const previousMonth = () => {
    // Do not go back before current month if disablePastDates is true
    if (disablePastDates && getMonth(currentMonth) === getMonth(today) && getYear(currentMonth) === getYear(today)) {
      return;
    }
    setCurrentMonth(addMonths(currentMonth, -1));
  };
  
  const handleDateClick = (date: Date, isDisabled: boolean) => {
    if (!isDisabled) {
      onDateChange(date);
    }
  };
  
  return (
    <div className="booking-calendar bg-white rounded-md overflow-hidden">
      <div className="flex justify-between items-center py-2 px-4 bg-primary bg-opacity-10">
        <button 
          onClick={previousMonth}
          disabled={disablePastDates && getMonth(currentMonth) === getMonth(today) && getYear(currentMonth) === getYear(today)}
          className="p-1 rounded-full hover:bg-primary hover:bg-opacity-20 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5 text-neutral-dark" />
        </button>
        <h3 className="font-medium text-neutral-dark">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <button 
          onClick={nextMonth}
          className="p-1 rounded-full hover:bg-primary hover:bg-opacity-20"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5 text-neutral-dark" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-neutral-dark opacity-70 text-xs font-medium py-2">
            {day}
          </div>
        ))}
        
        {calendarDays.map((day, index) => (
          <div 
            key={index}
            className={`
              date-cell p-2 text-sm cursor-pointer
              ${day.isCurrentMonth ? '' : 'text-neutral-dark opacity-40'}
              ${day.isDisabled ? 'unavailable' : ''}
              ${selectedDate && format(day.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') ? 'selected' : ''}
            `}
            onClick={() => handleDateClick(day.date, day.isDisabled)}
          >
            {format(day.date, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
}
