import React from 'react';
import NavBar from './components/NavBar';
import Diary from  './pages/Diary'
import DiaryEntry from './components/DiaryEntry'

function App() {
  return (
    <div>
    <NavBar />
      <Diary />
      <DiaryEntry />
    </div>
  );
}


export default App;
