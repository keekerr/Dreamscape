import React from 'react';
import { useState, useCallback } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import NavBar from './components/NavBar';
import Diary from './pages/Diary';
import VisionBoard from './pages/VisionBoard'
import DiaryEntry from './components/DiaryEntry';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import { AccountBox } from "./components/accountBox/accountBox";
import "./App.css";
import styled from "styled-components";

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

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
`;

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

  return (
    <ApolloProvider client={client}>
    <Router>
      <div className='App'>
        <NavBar />
        <AppContainer>
          <Routes>
            <Route path='/*' element={<Navigate replace to="/visionboard" />} />
            <Route path='/diary' element={<Diary />} />
            <Route path='/visionboard' element={<VisionBoard />} />
            <Route path='/login-signup' element={<AccountBox />} />
          </Routes>
        </AppContainer>
      </div>
    </Router>
    </ApolloProvider>
  );
}


export default App;
