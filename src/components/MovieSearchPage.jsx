import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import MovieItem from './MovieItem'; 

const MovieSearchPage = () => {
  const { searchQuery } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [movieList, setMovieList] = useState([]); // Define your movie list state here
  const params = useParams();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://moviestates-alternative.codestates-seb.link/movies?page=1&limit=20&title=${encodeURIComponent(searchQuery)}&orderBy=NAME&sortBy=asc`
        );
        const result = await response.json();
        setSearchResults(result.data);
      } catch (error) {
        console.error('검색 오류:', error);
      }
    };

    const fetchMovieList = async () => {
      try {
        const response = await fetch(
          'https://moviestates-alternative.codestates-seb.link/movies/top'
        );
        const result = await response.json();
        setMovieList(result.data);
      } catch (error) {
        console.error('Error fetching movie list:', error);
      }
    };

    fetchSearchResults();
    fetchMovieList(); // Fetch movie list data
  }, [searchQuery]);

  return (
    <div className="movie-search-page">
      <h2>검색 결과</h2>
      <div className="search-results">
        {searchResults.map((item) => (
          <Link key={item.id} to={`/movie/${item.id}`}>
            <div>
              <img src={item.postImage} alt={item.title} />
              <p>{item.title}</p>
            </div>
          </Link>
        ))}
      </div>

      <h2>영화 목록</h2>
      <div className="movie__container">
        {movieList.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieSearchPage;
