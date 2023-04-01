import React from 'react';
import { useState, useCallback } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import NavBar from './components/NavBar';
import Diary from './pages/Diary';
import VisionBoard from './pages/VisionBoard'
import DiaryEntry from './components/DiaryEntry';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AccountBox } from "./components/accountBox/accountBox";
import "./App.css";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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

  // const trackDownload = useCallback(async (photo) => {
  //   try {
  //     await fetch('/api/unsplash/download', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ downloadLocation: photo.links.download_location }),
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  return (
    <ApolloProvider client={client}>
    <Router>
      <div className='App'>
        <NavBar />
        <div className='page-container'>
          <Routes>
            <Route path='/diary' element={<Diary />} />
            <Route path='/visionboard' element={<VisionBoard />} />
            <Route path='/login-signup' element={<AccountBox />} />
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
