import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewsFeed from './pages/NewsFeed';
import SinglePost from './pages/SinglePost';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/news" element={<NewsFeed />} />
        <Route path="/news/:id" element={<SinglePost />} />
      </Routes>
    </BrowserRouter>
  );
}
