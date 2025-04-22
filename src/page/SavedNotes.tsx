import { useLocation, useNavigate } from 'react-router-dom';

export const SavedNotes = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get('date');

  const savedMoods = JSON.parse(localStorage.getItem('moodData') || '[]');
  const moodsForDate = savedMoods.filter((mood: any) => mood.date === date);

  const navigate = useNavigate();

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
      <button onClick={() => navigate(-1)} className='p-2 bg-amber-100 rounded-lg text-sm font-semibold px-4 cursor-pointer hover:scale-105 transition-all duration-200'>Go Back</button>
    </div>
  );
};
