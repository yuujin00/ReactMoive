import React from 'react';
import { useState, useEffect } from "react";
//js
import MovieItem from "./MovieItem";
//css
import "./MovieList.css";
import Header from "./Header";

export default function MovieList() {
  const [movieList, setMovieList] = useState([]);
  const SERVER_API = "https://moviestates-alternative.codestates-seb.link/movies/top";

  useEffect(() => {
    fetch(SERVER_API)
      .then((response) => response.json())
      .then((result) => {
        setMovieList(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="movie__container">
      {movieList.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
}