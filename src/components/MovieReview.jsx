import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from './Modal';

export default function MovieReview({
  handleReviewClick,
  showReviewModal,
  handleCloseModal,
  loggedInStatus, 
  loggedIn,
  userNickname,
  accessToken // New prop for access token
}) {

  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState('');
  const params = useParams();
  const REVIEW_API = `https://moviestates-alternative.codestates-seb.link/reviews/movie/${params.movieid}`;
  const API_URL = `https://moviestates-alternative.codestates-seb.link/reviews/${params.movieid}`;

  useEffect(() => {
    fetch(REVIEW_API)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, [REVIEW_API]);

  const handleWriteClick = () => {
    if (loggedIn && content !== '') {
      const newReview = {
        content,
        updatedAt: new Date().toLocaleDateString('ko-KR'),
        user: {
          nickname: userNickname,
        },
      };

      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(newReview),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}` // Include access token in headers
        }
      })
      .then(response => {
        console.log('Response status:', response.status);
        return response.json();
      })
      .then(data => {
        console.log('API response:', data);
        // Handle successful review upload here
        // You can add the new review to the reviews state
        // and clear the content input
        setReviews([newReview, ...reviews]);
        setContent('');
      })
      .catch(error => {
        console.error('Error uploading review:', error);
      });
    } else {
      alert('내용을 입력해주세요.');
    }
  };

  return (
    <div className="movie-review">
      {/* 리뷰 코멘트 입력 폼 */}
      <div className="review-form">
        <div className="review-content_box">
          <h3 className="review-comment">리뷰 코멘트 작성</h3>
          <div className="review-box">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="리뷰를 입력하세요"
            />
          </div>
          <div className="review-button">
            <button onClick={loggedIn ? handleWriteClick : handleReviewClick}>리뷰 작성</button>
          </div>
        </div>
      </div>

      {/*모달 컴포넌트 */}
      {showReviewModal && (
        <Modal onClose={handleCloseModal}>
          <h3>로그인이 필요한 서비스 입니다.</h3>
        </Modal>
      )}

      {/* 코멘트 목록 */}
      <ul className="comment-list">
        {reviews && reviews.map((review, index) => (
          <li className="comment-item" key={index}>
            <h3>{review.user.nickname}의 리뷰</h3> {review.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
