
export const Calendar = () => {
const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

const renderCalendar = () => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const days = daysInMonth(month, year);

    const calendarDays = [];
    for (let day = 1; day <= days; day++) {
        calendarDays.push(<div key={day} className="calendar-day">{day}</div>);
    }

    return <div className="calendar-grid">{calendarDays}</div>;
};

return (
    <div>
        <h2>Calendar</h2>
        {renderCalendar()}
    </div>
);
}
