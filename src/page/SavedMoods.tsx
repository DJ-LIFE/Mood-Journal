import React, { useEffect } from 'react';
import { MoodData } from '../types';

export const SavedMoods = () => {
  const [moodData, setMoodData] = React.useState<MoodData[]>([]);
  const getSavedData = () => {
    const savedMoods = localStorage.getItem('moodData');
    return savedMoods ? JSON.parse(savedMoods) : null;
  }
  useEffect(() => {
    const savedMoods = getSavedData();
    if (savedMoods) {
      setMoodData(savedMoods);
    }
  }, []);
  console.log(moodData);
  const title = moodData.map((mood) => mood.title);
  console.log(title);
  return (
    <section>
      <div>
        <h1 className="text-xl p-2 shadow-md font-bold text-center mb-4 text-orange-500 border rounded-lg bg-amber-100">Saved Moods</h1>
      {
        moodData?.map((mood, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4 w-64 flex justify-between items-center gap-4">
              <div className="flex flex-col items-center">
                <span className="text-4xl">{mood.emoji}</span>
                <p className="text-sm text-gray-500">{mood.date}</p>
              </div>
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold">{mood.title}</h2>
              </div>
            </div>
        ))
      }
      {moodData.length === 0 && <p className="text-center text-gray-500">No saved moods found.</p>}
      </div>
    </section>
  );
};
