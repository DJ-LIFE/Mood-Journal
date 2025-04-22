import React from 'react';

interface CalendarProps {
  savedDates: string[];
  onDateClick?: (date: string) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ savedDates, onDateClick }) => {
  const daysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();

  const isDateSaved = (date: string) => savedDates.includes(date);

  const renderCalendar = () => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const days = daysInMonth(month, year);

    const calendarDays = [];
    for (let day = 1; day <= days; day++) {
      const isToday = day === today.getDate();
      const date = new Date(year, month, day);
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      calendarDays.push(
        <div
          key={day}
          className={`calendar-day p-2 rounded-lg text-center shadow-md transition-all duration-300 ${
            isToday
              ? 'bg-orange-500 text-white font-bold'
              : isDateSaved(formattedDate)
              ? 'bg-yellow-500 text-white font-semibold'
              : 'bg-gray-100 hover:bg-blue-100'
          }`}
        >
          {day}
        </div>
      );
    }
    const handleDateClick = (day: number) => {
      const selectedDate = new Date(year, month, day);
      const formattedDate = selectedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      if (onDateClick) {
        onDateClick(formattedDate);
      }
    };

    const handleMonthClick = (direction: 'prev' | 'next') => {
      const newMonth = direction === 'prev' ? month - 1 : month + 1;
      const newYear = newMonth < 0 ? year - 1 : newMonth > 11 ? year + 1 : year;
      const newDays = daysInMonth(newMonth, newYear);
      const newCalendarDays = [];
      for (let day = 1; day <= newDays; day++) {
        const date = new Date(newYear, newMonth, day);
        const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        newCalendarDays.push(
          <div
            key={day}
            className={`calendar-day p-2 rounded-lg text-center shadow-md transition-all duration-300 ${
              isDateSaved(formattedDate)
                ? 'bg-yellow-500 text-white font-semibold'
                : 'bg-gray-100 hover:bg-blue-100'
            }`}
          >
            {day}
          </div>
        );
      }
      return newCalendarDays;
  };
    return (
      <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
        <div className="text-center flex justify-between items-center text-lg font-semibold mb-4">
          <button className="bg-orange-500 text-white py-1 px-3 rounded hover:bg-orange-600" onClick={() => handleMonthClick('prev')}>
            {'<'}
          </button>
          <span>
            {today.toLocaleString('default', { month: 'long' })} {year}
          </span>
          <button className="bg-orange-500 text-white py-1 px-3 rounded hover:bg-orange-600" onClick={() => handleMonthClick('next')}>
            {'>'}
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center font-medium text-gray-700">
          {weekDays.map((day) => (
            <button key={day} className="calendar-weekday p-2 cursor-pointer">
              {day}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 cursor-pointer w-full mt-2">
          {calendarDays.map((calendarDay, index) => (
            <div
              key={index}
              onClick={() => handleDateClick(index + 1)}
              className={calendarDay.props.className}
            >
              {calendarDay.props.children}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return <div>{renderCalendar()}</div>;
};

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
