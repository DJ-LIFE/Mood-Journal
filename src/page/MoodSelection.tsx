import { useEffect, useState } from 'react';
import { MoodData } from '../types';
import { useNavigate } from 'react-router-dom';
import { getUserLocation } from '../lib/userLocation';
import { Calendar } from '../components/Calendar';
import axios from 'axios';
import { weatherEmojis } from '../lib/weatherEmoji';
import { CustomButton } from '../components/CustomButton';

export const MoodSelection = () => {
  const navigate = useNavigate();

  // Populating today's Date
  const todaysDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const [moodData, setMoodData] = useState<MoodData & { weather?: string }>({
    title: '',
    emoji: '',
    date: todaysDate,
    weather: '',
  });
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [savedDates, setSavedDates] = useState<string[]>([]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await getUserLocation();
        setLocation(res);
        localStorage.setItem('location', JSON.stringify(res));
      } catch (err) {
        setError('Failed to fetch location');
      }
    };
    fetchLocation();
  }, []);
  console.log(location);
console.log(error);
  // Fetch weather

  useEffect(() => {
    const fetchWeatherData = async () => {
      const location = JSON.parse(localStorage.getItem('location') || '{}');
      const lat = location.latitude;
      const lon = location.longitude;
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=86d5bcf30efaebc3c4a4df73fd8c76ad`
        );
        setWeatherData(response.data.list);
        console.log(response.data, 'resData');
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchWeatherData();
  }, []);

  useEffect(() => {
    if (weatherData) {
      const weatherDescription = `${weatherEmojis[weatherData[0].weather[0].main.toLowerCase()]} ${(weatherData[0].main.temp - 273.15).toFixed(1)}°C`;
      setMoodData((prevState) => ({ ...prevState, weather: weatherDescription }));
    }
  }, [weatherData]);

  useEffect(() => {
    const fetchSavedDates = () => {
      const savedMoods = JSON.parse(localStorage.getItem('moodData') || '[]');
      const dates = savedMoods.map((mood: MoodData) => mood.date);
      setSavedDates(dates);
    };
    fetchSavedDates();
  }, []);

  const handleOnchange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMoodData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOnClick = (mood: string) => {
    setMoodData((prevState) => ({ ...prevState, emoji: mood }));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!moodData.emoji) {
      alert('Please select a mood.');
      return;
    }
    if (!moodData.title.trim()) {
      alert('Please add a note.');
      return;
    }
    const existingData = JSON.parse(localStorage.getItem('moodData') || '[]');
    const updatedData = [...existingData, moodData];
    localStorage.setItem('moodData', JSON.stringify(updatedData));
    alert('Mood saved successfully!');
    setMoodData({ title: '', emoji: '', date: todaysDate, weather: moodData.weather });
  };

  const handleDateClick = (date: string) => {
    const savedMoods = JSON.parse(localStorage.getItem('moodData') || '[]');
    const moodForDate = savedMoods.find((mood: MoodData) => mood.date === date);
    if (moodForDate) {
      navigate(`/saved?date=${encodeURIComponent(date)}`);
    } else {
      alert('No mood saved for this date.');
    }
  };

  return (
    <section className="max-w-500 scroll-auto rounded-2xl p-4 m-4 bg-white shadow-2xl border-transparent flex flex-col md:flex-row items-center justify-center gap-4">
      <div>
        <div className="flex flex-col justify-center items-center p-2">
          <h1 className="text-2xl font-bold text-center mb-4 text-orange-500">
            How are you feeling today?
          </h1>

          <div className='flex justify-between items-center w-full gap-4 px-6'>
            <div className="font-semibold text-nowrap">{todaysDate}</div>
            {weatherData && (
              <div className="text-sm font-semibold">
                <span>{weatherEmojis[weatherData[0].weather[0].main.toLowerCase()]}</span>
                {(weatherData[0].main.temp - 273.15).toFixed(1)}°C
              </div>
            )}
          </div>
        </div>
        <form
          className="h-80 w-100  border-transparent p-4 flex flex-col items-center justify-center"
          onSubmit={handleSave}
        >
          <div className="flex justify-between gap-2 my-2">
            {moodOptions.map((mood) => (
              <CustomButton
                key={mood.moodTheme}
                onClick={() => handleOnClick(mood.moodIcon)}
              >
                <span className="h-10 w-10">{mood.moodIcon}</span>
              </CustomButton>
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

          <CustomButton
            type="submit"
            className="mt-5 py-2 px-4 border rounded-lg shadow-2xl text-white bg-amber-700"
          >
            Save
          </CustomButton>
        </form>
        <div className='p-2 bg-amber-100 rounded-lg text-sm font-semibold px-4 cursor-pointer hover:scale-105 transition-all duration-200'>Click on Date to go check your Saved notes</div>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-center mb-4 text-orange-500">
          Calendar
        </h1>
        <Calendar savedDates={savedDates} onDateClick={handleDateClick} />
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
