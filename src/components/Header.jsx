import React, { useState } from 'react';
import { Link, useLocation,  useNavigate } from 'react-router-dom';
import SearchPage from './SearchPage.jsx';

import './Header.css';

const Header = ({ loggedIn, setLoggedIn }) => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const navigate = useNavigate();
  
  const API_URL = 'https://moviestates-alternative.codestates-seb.link/movies'; // 수정된 API 주소

  async function handleSearchSubmit(searchQuery) {
    try {
      const response = await fetch(`${API_URL}?page=1&limit=20&title=${encodeURIComponent(searchQuery)}&orderBy=NAME&sortBy=asc`);
      const result = await response.json();
      setSearchResults(result.data);
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
      } catch (error) {
      console.error('검색 오류:', error);
    }
  }

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit(event);
    }
  };

  return (
    <header className={`header ${location.pathname.includes('/login') || location.pathname.includes('/join') ? 'hidden' : ''}`}>
      <nav className="nav">
        <Link to="/" className="logo-link">
          <div className="logo">Movie</div>
        </Link>
        <div className="search-bar">
          <SearchPage onSearch={handleSearchSubmit} />
        </div>
        <div className="auth-buttons">
          {loggedIn ? (
            <button onClick={handleLogout}>로그아웃</button>
          ) : (
            <>
              <Link to="/login"><button>로그인</button></Link>
              <Link to="/join"><button>회원가입</button></Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;