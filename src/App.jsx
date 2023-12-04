import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import MovieGenre from './components/MovieGenre';
import Login from './components/Login';
import Join from './components/Join';
import Header from './components/Header';
import MovieSearchPage from './components/MovieSearchPage';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userNickname, setUserNickname] = useState(''); // Define userNickname state
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // 애플리케이션 로드 시 토큰 확인
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setLoggedIn(true);
      setAccessToken(storedToken);
    }
  }, []);

  return (
    <BrowserRouter>
      <main>
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route
            path="/movie/:movieid"
            element={<MovieDetail loggedIn={loggedIn} userNickname={userNickname} />} />
          <Route path="/movie" element={<MovieGenre />} />
          <Route
            path="/login"
            element={
              <Login
                setLoggedIn={setLoggedIn}
                setUserNickname={setUserNickname}
                setAccessToken={setAccessToken}
              />
            }
          />
          <Route path="/join" element={<Join />} />
          <Route path="/search/:searchQuery" element={<MovieSearchPage />} />
          
        </Routes>
      </main>
    </BrowserRouter>
  );
}
