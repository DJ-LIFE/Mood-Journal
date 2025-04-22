import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MoodSelection } from './page/MoodSelection';
import { Layout } from './components/Layout';
import { SavedMoods } from './page/SavedMoods';

function App() {
  return (
    <BrowserRouter>
    <Layout>
      <Routes>
          <Route path="/" element={<MoodSelection />} />
          <Route path="/saved" element={<SavedMoods />} />
      </Routes>
    </Layout>
    </BrowserRouter>
  );
}

export default App;
