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
                <p className="font-bold">{mood.title}</p>
                <p className="text-2xl">{mood.emoji}</p>
            </div>
        ))
      }
      {moodData.length === 0 && <p className="text-center text-gray-500">No saved moods found.</p>}
      </div>
    </section>
  );
};
