import React from 'react';
import { useState, useCallback } from 'react';
import NavBar from './components/NavBar';
import Diary from './pages/Diary';
import VisionBoard from './pages/VisionBoard'
import DiaryEntry from './components/DiaryEntry';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginForm } from './components/accountBox/accountBox/loginForm';
import { SignupForm } from './components/accountBox/accountBox/signupForm';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

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
    <ApolloProvider client={client}>
    <Router>
      <div className='App'>
        <NavBar />
        <div className='page-container'>
          <Routes>
            <Route path='/diary' element={<Diary />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/signup' element={<SignupForm />} />
          </Routes>
        </div>
      </div>
    </Router>
    </ApolloProvider>
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
  );
}

export default App;