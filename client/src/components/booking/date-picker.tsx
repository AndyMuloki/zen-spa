import { useState, useEffect, useMemo } from 'react';
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
  const today = useMemo(() => startOfToday(), []);
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
    <div className="booking-calendar bg-gray-700 rounded-xl shadow-lg p-4">
      <div className="flex justify-between items-center py-4 px-6 bg-teal-500 bg-opacity-20 rounded-t-xl mb-2">
        <button 
          onClick={previousMonth}
          disabled={disablePastDates && getMonth(currentMonth) === getMonth(today) && getYear(currentMonth) === getYear(today)}
          className="p-2 rounded-full hover:bg-teal-400 hover:bg-opacity-20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5 text-gray-100" />
        </button>
        <h3 className="font-bold text-lg text-gray-100 tracking-wide font-mono">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <button 
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-teal-400 hover:bg-opacity-20 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5 text-gray-100" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-2 text-center pb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-gray-300 text-xs font-semibold py-1">
            {day}
          </div>
        ))}
        
        {calendarDays.map((day, index) => (
          <div 
            key={index}
            className={`
              date-cell flex items-center justify-center w-9 h-9 mx-auto text-sm cursor-pointer select-none transition-all
              ${day.isCurrentMonth ? '' : 'opacity-40'}
              ${day.isDisabled ? 'unavailable opacity-30 cursor-not-allowed' : 'hover:bg-teal-400 hover:bg-opacity-30'}
              ${selectedDate && format(day.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') ? 'bg-teal-500 text-white font-bold shadow' : 'text-gray-200'}
              rounded-full
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
