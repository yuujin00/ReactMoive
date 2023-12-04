import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Modal from "./Modal.jsx"
import MovieReview from "./MovieReview.jsx"
import RelatedMovies from './RelatedMovies.jsx';

//css
import "./MovieDetail.css"
import "./MovieReview.css"
import './Modal.css';

export default function MovieDetail({ loggedIn, userNickname }) {

  const [showReviewModal, setShowReviewModal] = useState(false);//modal창
  const params = useParams()
  const [movieData, setMovieData] = useState(null)
  const MOVIE_DETAIL_API = `https://moviestates-alternative.codestates-seb.link/movies/${params.movieid}/detail`

  const handleReviewClick = () => {
    // "입력" 버튼 클릭 시 모달 보이도록 상태 업데이트
    setShowReviewModal(true);
  };

  const handleCloseModal = () => {
    setShowReviewModal(false);
  };

  useEffect(() => {
    fetch(MOVIE_DETAIL_API)
      .then((res) => res.json())
      .then((result) => setMovieData(result))
  }, [MOVIE_DETAIL_API])


  return (
    <div>
      {movieData &&
        (
          <div className="movie_detail">
            <div className='detail_name__starpoint'>
              <h2>{movieData.title}</h2>
              <h3>⭐ {Number(movieData.averageScore).toFixed(1)}</h3>
            </div>
            <div className='detail_poster_contents'>
              <div className="poster">
                <img src={movieData.postImage} />
              </div>
              <div className="detail_genre_character_plot">
                <span>
                  <h3 className="datail_genre">장르 {' '}
                    {movieData.genres.map((genres) => (
                      <div key={genres.id} >
                        <div key={genres.id}>ㅤ{genres.name}</div>
                      </div>
                    ))}
                  </h3>
                </span>


<div className="staffs-container">
  <div className="role-container">
    <h4>감독</h4>
    {movieData.staffs
      .filter(staff => staff.role === "감독")
      .map(staff => (
        <div key={staff.id}>{staff.name}</div>
      ))}
  </div>
  <div className="role-container">
    <h4>각본</h4>
    {movieData.staffs
      .filter(staff => staff.role === "각본")
      .map(staff => (
        <div key={staff.id}>{staff.name}</div>
      ))}
  </div>
  <div className="role-container">
    <h4>출연</h4>
    {movieData.staffs
      .filter(staff => staff.role === "출연")
      .map(staff => (
        <div key={staff.id}>{staff.name}</div>
      ))}
  </div>
</div>
<div className="plot">
  {movieData.plot}
</div>

              </div>
            </div>
          </div>
        )
      }

      <div className="Movie_review">
        <MovieReview
          handleReviewClick={handleReviewClick}
          showReviewModal={showReviewModal}
          handleCloseModal={handleCloseModal}
          movieId={params.movieid}
          loggedIn={loggedIn}
          userNickname={userNickname}
        />

        {/* 연관 영화 컴포넌트 추가 */}
        <RelatedMovies movieId={params.movieid} />

      </div>
    </div>
  )
}

