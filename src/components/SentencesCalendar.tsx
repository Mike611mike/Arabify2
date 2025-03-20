
import React, { useMemo } from 'react';
import { Calendar as CalendarComponent } from "./ui/calendar";
import { useSentences } from '../context/SentencesContext';
import { format, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { DayContentProps } from 'react-day-picker';

type SentencesCalendarProps = React.ComponentProps<typeof CalendarComponent>;

const SentencesCalendar: React.FC<SentencesCalendarProps> = ({ 
  className,
  ...props 
}) => {
  const { sentences } = useSentences();
  
  // Get unique dates from sentences
  const datesWithSentences = useMemo(() => {
    const uniqueDates = new Set<string>();
    
    sentences.forEach(sentence => {
      const date = new Date(sentence.createdAt);
      uniqueDates.add(format(date, 'yyyy-MM-dd'));
    });
    
    return Array.from(uniqueDates).map(dateStr => new Date(dateStr));
  }, [sentences]);
  
  return (
    <CalendarComponent
      className={cn("p-3 pointer-events-auto", className)}
      components={{
        DayContent: (props: DayContentProps) => {
          // Check if this day has sentences
          const hasSentences = datesWithSentences.some(date => 
            isSameDay(date, props.date)
          );
          
          return (
            <div className="relative h-full w-full flex items-center justify-center">
              <span className={cn(
                hasSentences && "text-[#0EA5E9] font-medium"
              )}>{props.date.getDate()}</span>
              {hasSentences && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-[#0EA5E9]" />
              )}
            </div>
          );
        }
      }}
      {...props}
    />
  );
};

export default SentencesCalendar;
