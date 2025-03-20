
import React from 'react';
import { Calendar, ListFilter } from 'lucide-react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import SentencesCalendar from '../SentencesCalendar';

interface DateFilterProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  clearDateFilter: () => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ 
  selectedDate, 
  setSelectedDate, 
  clearDateFilter 
}) => {
  return (
    <div className="flex space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-spotify-light bg-opacity-70 border-none"
          >
            <Calendar className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, 'PP') : 'Pick a date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <SentencesCalendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      
      {selectedDate && (
        <Button 
          variant="outline" 
          className="bg-spotify-light bg-opacity-70 border-none"
          onClick={clearDateFilter}
        >
          <ListFilter className="mr-2 h-4 w-4" />
          Clear Filter
        </Button>
      )}
    </div>
  );
};

export default DateFilter;
