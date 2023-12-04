import React, { useState, useEffect } from 'react';
import './RelatedMovies.css';
import { Link, useParams } from 'react-router-dom';

export default function RelatedMovies() {
  const [relatedMovies, setRelatedMovies] = useState([]);
  const params = useParams();
  const RELATED_MOVIES_API = `https://moviestates-alternative.codestates-seb.link/movies/${params.movieid}/related`;

  useEffect(() => {
    fetch(RELATED_MOVIES_API)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          setRelatedMovies(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching related movies:', error);
      });
  }, [RELATED_MOVIES_API]);

  return (
    <div className="related-movies">
      <h3>연관 영화</h3>
      <div className="related-movies-list">
        {relatedMovies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="related-movie">
            <img src={movie.postImage} alt={movie.title} />
            {/* <p>{movie.title}</p> */}
          </Link>
        ))}
      </div>

    </div>
  );
}
