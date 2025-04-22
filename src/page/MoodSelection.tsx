import { useEffect, useState } from 'react';
import { MoodData } from '../types';
import { useNavigate } from 'react-router-dom';
import { getUserLocation } from '../lib/userLocation';

export const MoodSelection = () => {
  const navigate = useNavigate();

  const [moodData, setMoodData] = useState<MoodData>({ title: '', emoji: ''});
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await getUserLocation();
        setLocation(res);
      } catch (err) {
        setError('Failed to fetch location');
      }
    };
    fetchLocation();
  }, []);
  console.log(location);
  console.log(error);

  // Fet

  const handleOnchange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMoodData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOnClick = (mood: string) => {
    setMoodData((prevState) => ({ ...prevState, emoji: mood }));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (moodData.title && moodData.emoji) {
      const existingData = JSON.parse(localStorage.getItem('moodData') || '[]');
      const updatedData = [...existingData, moodData];
      localStorage.setItem('moodData', JSON.stringify(updatedData));
      alert('Mood saved successfully!');
    } else {
      alert('Please select a mood and add a note.');
    }
    setMoodData({ title: '', emoji: '' });
  };

  // Populating today's Date
  const todaysDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="max-w-500 rounded-2xl p-4">
      <div>
        <form
          className="h-125 w-100 shadow-2xl border-transparent p-4 flex flex-col items-center py-20"
          onSubmit={handleSave}
        >
          <div className="flex justify-between items-center p-2">
            <h1 className="text-2xl font-bold text-center mb-4 text-orange-500">
              How are you feeling today?
            </h1>
            <div className="font-semibold text-nowrap">{todaysDate}</div>
          </div>
          <div className="flex justify-between gap-2 my-2">
            {moodOptions.map((mood) => (
              <button
                key={mood.moodTheme}
                className="cursor-pointer hover:scale-110 transition-all duration-300"
                onClick={() => handleOnClick(mood.moodIcon)}
                type="button"
              >
                {mood.moodIcon}
              </button>
            ))}
          </div>
          <textarea
            name="title"
            id=""
            value={moodData.title}
            onChange={handleOnchange}
            className="bg-white p-2 rounded-lg shadow-sm"
            placeholder="Add a note ..."
          />

          <button
            type="submit"
            className="mt-5 py-2 px-4 border rounded-lg shadow-2xl text-white bg-amber-700"
          >
            Save
          </button>
        </form>
        <button onClick={() => navigate('saved')}>Go to saved</button>
      </div>
      <div>
      
      </div>
    </section>
  );
};

const moodOptions = [
  { moodIcon: '😊', moodTheme: 1 },
  { moodIcon: '😑', moodTheme: 2 },
  { moodIcon: '☹️', moodTheme: 3 },
  { moodIcon: '😡', moodTheme: 4 },
  { moodIcon: '🤒', moodTheme: 5 },
];
