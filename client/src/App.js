import React, { useState, useCallback } from 'react';
import NavBar from './components/NavBar';
import Diary from  './pages/Diary'
import DiaryEntry from './components/DiaryEntry'

function App() {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);

  const handleSearch = useCallback(async () => {
    try {
      const response = await fetch(`/api/unsplash?query=${query}`);
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error(error);
    }
  }, [query]);

  const trackDownload = useCallback(async (photo) => {
    try {
      await fetch('/api/unsplash/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ downloadLocation: photo.links.download_location }),
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    // <div>
    //   <input
    //     type="text"
    //     value={query}
    //     onChange={e => setQuery(e.target.value)}
    //   />
    //   <button onClick={handleSearch}>Search</button>
    //   <div>
    //     {photos.map(photo => (
    //       <div key={photo.id}>
    //         <img src={photo.urls.thumb} alt={photo.alt_description} />
    //         <button onClick={() => trackDownload(photo)}>Download</button>
    //       </div>
    //     ))}
    //   </div>

    <div>
    <NavBar />
      <Diary />
      <DiaryEntry />
    </div>
  );
}

export default App;