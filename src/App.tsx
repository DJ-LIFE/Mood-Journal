import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MoodSelection } from './page/MoodSelection';
import { Layout } from './components/Layout';
import { SavedNotes } from './page/SavedNotes';


function App() {
  return (
    <BrowserRouter>
    <Layout>
      <Routes>
          <Route path="/" element={<MoodSelection />} />
          <Route path="/saved" element={<SavedNotes />} />
      </Routes>
    </Layout>
    </BrowserRouter>
  );
}

export default App;
