import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MovieGenre() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [movies, setMovies] = useState([]);
  
  // 장르 목록을 가져오는 API 주소
  const GENRES_API = 'https://moviestates-alternative.codestates-seb.link/movies/genres';
  
  // 선택한 장르에 해당하는 영화 목록을 가져오는 API 주소
  const MOVIES_BY_GENRE_API = `https://moviestates-alternative.codestates-seb.link/movies/genre`;
  
  useEffect(() => {
    // 장르 목록 가져오기
    fetch(GENRES_API)
      .then((res) => res.json())
      .then((data) => {
        setGenres(data);
      })
      .catch((error) => {
        console.error('Error fetching genres:', error);
      });
  }, []);
  
  useEffect(() => {
    // 선택한 장르에 해당하는 영화 목록 가져오기
    if (selectedGenre) {
  fetch(MOVIES_BY_GENRE_API)
        .then((res) => res.json())
        .then((data) => { setMovies(data.data);
        })
        .catch((error) => {
          console.error('Error fetching movies by genre:', error);
        });
    } else {
      setMovies([]);
    }
  }, [selectedGenre]);

  return (
    <div className="movie-genre">
      <h3>장르별 영화 목록</h3>
      <div className="genre-list">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => setSelectedGenre(genre.id)}
            className={selectedGenre === genre.id ? 'selected' : ''}
          >
            {genre.name}
          </button>
        ))}
      </div>
      <div className="movie-list">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-item">
            <img src={movie.postImage} alt={movie.title} />
            <p>{movie.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
