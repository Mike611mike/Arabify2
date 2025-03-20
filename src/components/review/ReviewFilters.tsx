
import React from 'react';
import { Search, Calendar, ListFilter, CheckCircle2, Clock, Star } from 'lucide-react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import SentencesCalendar from '@/components/SentencesCalendar';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface ReviewFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  masterFilter: 'all' | 'mastered' | 'unmastered' | 'favorite';
  setMasterFilter: (filter: 'all' | 'mastered' | 'unmastered' | 'favorite') => void;
  clearDateFilter: () => void;
}

const ReviewFilters: React.FC<ReviewFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedDate,
  setSelectedDate,
  masterFilter,
  setMasterFilter,
  clearDateFilter
}) => {
  return (
    <div className="flex flex-col space-y-4 mb-6 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-spotify-text" />
        </div>
        <input
          type="text"
          placeholder="Search sentences..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full bg-spotify-light bg-opacity-70 rounded-full py-2 px-4 
                    text-spotify-white focus:outline-none focus:ring-1 focus:ring-spotify-green"
        />
      </div>
      
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="bg-spotify-light bg-opacity-70 border-none"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, 'PP') : 'Filter by date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
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
        
        <ToggleGroup 
          type="single" 
          value={masterFilter}
          onValueChange={(value) => {
            if (value) setMasterFilter(value as 'all' | 'mastered' | 'unmastered' | 'favorite');
          }}
          className="bg-spotify-light bg-opacity-30 p-1 rounded-lg w-full"
        >
          <ToggleGroupItem value="all" className="flex-1 data-[state=on]:bg-spotify-green data-[state=on]:text-black">
            All
          </ToggleGroupItem>
          <ToggleGroupItem value="mastered" className="flex-1 data-[state=on]:bg-spotify-green data-[state=on]:text-black">
            <CheckCircle2 size={16} className="mr-1" />
            Mastered
          </ToggleGroupItem>
          <ToggleGroupItem value="unmastered" className="flex-1 data-[state=on]:bg-spotify-green data-[state=on]:text-black">
            <Clock size={16} className="mr-1" />
            Learning
          </ToggleGroupItem>
          <ToggleGroupItem value="favorite" className="flex-1 data-[state=on]:bg-yellow-500 data-[state=on]:text-black">
            <Star size={16} className="mr-1" fill="currentColor" />
            Favorites
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

export default ReviewFilters;
