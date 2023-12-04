import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "./Login.css"

export default function Login({ setLoggedIn, setUserNickname, setAccessToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    if (email.trim() === '' || password.trim() === '') {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    const loginData = {
      email: email,
      password: password
    };

    const LOGIN_API = `https://moviestates-alternative.codestates-seb.link/auth/login`

    fetch(LOGIN_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('로그인에 실패하였습니다.');
        }
      })
      .then(data => {
        setLoggedIn(true);
        setUserNickname(data.nickname);
        setAccessToken(data.accessToken);

        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userNickname', data.nickname);
        localStorage.setItem('accessToken', data.accessToken);

        navigate('/');
      })
      .catch(error => {
        setError(error.message);
      });
  };

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    const storedUserNickname = localStorage.getItem('userNickname');
    const storedToken = localStorage.getItem('accessToken');

    if (storedLoggedIn && storedUserNickname && storedToken) {
      setLoggedIn(true);
      setUserNickname(storedUserNickname);
      setAccessToken(storedToken);
    }
  }, []);

  useEffect(() => {
  // 토큰 만료 확인 및 갱신
  const storedToken = localStorage.getItem('accessToken');

  if (storedToken) {
    const decodedToken = JSON.parse(atob(storedToken.split('.')[1])); // Decoding the payload
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      // 토큰 만료 시, 갱신 요청
      fetch('your_token_refresh_endpoint', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${storedToken}`
        }
      })
      .then(response => response.json())
      .then(data => {
        const newToken = data.newAccessToken;
        // 새로운 토큰으로 로컬 저장소 업데이트
        localStorage.setItem('accessToken', newToken);
        setAccessToken(newToken); // 상태 업데이트
      })
      .catch(error => {
        // 토큰 갱신 실패 처리
      });
    }
  }
}, []);

  return (
    <div className="Login">
      <p className="post-Image"><img src="http://file.koreafilm.or.kr/thm/02/99/17/79/tn_DPK019466.jpg" /></p>
      <div className="Login-form">
        <h3 className="Login-comment">로그인</h3>
        <div>
          <label>Email: </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="Login-button" onClick={handleLogin}>로그인</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  )
}
