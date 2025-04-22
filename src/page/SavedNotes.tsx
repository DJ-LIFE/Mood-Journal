import { useLocation } from 'react-router-dom';

export const SavedNotes = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get('date');

  const savedMoods = JSON.parse(localStorage.getItem('moodData') || '[]');
  const moodForDate = savedMoods.find((mood: any) => mood.date === date);
  return (
    <div className="saved-notes">
      {moodForDate ? (
        <div className='bg-white p-4 rounded-lg shadow-md mb-4flex flex-col justify-between items-center gap-4 w-96'>
            <div className='flex justify-between items-center gap-4'>
            <p>{moodForDate.title}</p>
            <p>{moodForDate.emoji}</p>
            </div>
          <h1 className="text-sm text-gray-500">Mood for {date}</h1>
          
        </div>
      ) : (
        <p>No mood saved for this date.</p>
      )}
    </div>
  );
};
