import { useLocation, useNavigate } from 'react-router-dom';
// Add this import for PDF generation
import jsPDF from 'jspdf';

export const SavedNotes = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get('date');

  const savedMoods = JSON.parse(localStorage.getItem('moodData') || '[]');
  const moodsForDate = savedMoods.filter((mood: any) => mood.date === date);

  const navigate = useNavigate();

  const exportToCSV = () => {
    const headers = ['Title,Emoji,Weather,Date'];
    const rows = moodsForDate.map((mood: any) =>
      [mood.title, mood.emoji, mood.weather || '', mood.date].join(',')
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `moods_${date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(`Moods for ${date}`, 10, 10);
    moodsForDate.forEach((mood: any, index: number) => {
      doc.text(
        `${index + 1}. Title: ${mood.title}, Emoji: ${mood.emoji}, Weather: ${
          mood.weather || 'N/A'
        }, Date: ${mood.date}`,
        10,
        20 + index * 10
      );
    });
    doc.save(`moods_${date}.pdf`);
  };

  return (
    <div className="shadow-2xl rounded-2xl p-4">
      <h1 className="text-xl p-2 shadow-md font-semibold text-center mb-4 text-orange-500 border rounded-lg bg-amber-100">
        Moods for {date}
      </h1>
      {moodsForDate.length > 0 ? (
        moodsForDate.map((mood: any, index: number) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md mb-4 flex flex-col justify-between items-center gap-4 w-96"
          >
            <div className="flex justify-between items-center gap-4 w-full">
              <p>{mood.title}</p>
              <p>{mood.emoji}</p>
            </div>
            <div className="flex justify-between items-center w-full">
              {' '}
              {mood.weather && (
                <div className="text-sm text-gray-500">
                  <p>{mood.weather}</p>
                </div>
              )}
              <h1 className="text-sm text-gray-500">{date}</h1>
            </div>
          </div>
        ))
      ) : (
        <p>No mood saved for this date.</p>
      )}
      <div className="flex gap-4 mt-4">
        <button
          onClick={exportToCSV}
          className="p-2 bg-blue-100 rounded-lg text-sm font-semibold px-4 cursor-pointer hover:scale-105 transition-all duration-200"
        >
          Export as CSV
        </button>
        <button
          onClick={exportToPDF}
          className="p-2 bg-green-100 rounded-lg text-sm font-semibold px-4 cursor-pointer hover:scale-105 transition-all duration-200"
        >
          Export as PDF
        </button>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="p-2 bg-amber-100 rounded-lg text-sm font-semibold px-4 cursor-pointer hover:scale-105 transition-all duration-200 mt-4"
      >
        Go Back
      </button>
    </div>
  );
};
