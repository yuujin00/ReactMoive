import React, { useState } from 'react';

const SearchPage = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit(event);
    }
  };

  return (
    <div className="search-page">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyDown={handleSearchKeyDown}
        />
        <button type="submit">검색</button>
      </form>
    </div>
  );
};

export default SearchPage;