import React from 'react';
import NavBar from './components/NavBar';
import Diary from './pages/Diary';
import VisionBoard from './pages/VisionBoard'
import DiaryEntry from './components/DiaryEntry';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
        <NavBar />
        <div className='page-container'>
          <Routes>
            <Route path='/diary' element={<Diary />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
