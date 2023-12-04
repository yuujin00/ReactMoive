import React from 'react';
import { Link } from 'react-router-dom';
//js
//css
import './MovieItem.css';

export default function MovieItem(props) {
  return (
    <Link to={`/movie/${props.movie.id}`}>
      <div className="movie__item">
        <img src={props.movie.postImage} />
        <div className="movie__info__wrapper">
          <span>{props.movie.title}</span>
          <span>⭐{Number(props.movie.averageScore).toFixed(1)}</span>
        </div>
      </div>
    </Link>
  )

}