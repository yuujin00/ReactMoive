import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Join.css';

export default function Join() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [birth, setBirth] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState('');
  const [birthError, setBirthError] = useState('');

  const navigate = useNavigate();

  const isPasswordValid = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return regex.test(password);
  };

  const Join_API = `https://moviestates-alternative.codestates-seb.link/auth/register`;

  const validateEmail = (email) => {
    if (!email.includes('@') || !(email.includes('.com') || email.includes('.net'))) {
      setEmailError('유효한 이메일을 입력해주세요.');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (password) => {
    if (!isPasswordValid(password)) {
      setPasswordError('비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  const validatePasswordCheck = (passwordCheck) => {
    if (password !== passwordCheck) {
      setPasswordCheckError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    } else {
      setPasswordCheckError('');
    }
  };

  const validateBirth = (birth) => {
    if (!/^\d{8}$/.test(birth)) {
      setBirthError('생년월일은 YYYYMMDD 형식으로 입력해주세요.');
    } else {
      setBirthError('');
    }
  };

  const handleJoin = () => {
    validateEmail(email);
    validatePassword(password);
    validatePasswordCheck(passwordCheck);
    validateBirth(birth);

    if (emailError || passwordError || passwordCheckError || birthError) {
      return;
    }

    // 유효성 검사 통과 시 회원가입 로직 실행
    fetch(Join_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        name,
        nickname,
        birth
      })
    })
      .then((response) => {
        if (response.ok) {
          // 회원가입 성공 시 처리
          navigate('/login'); // 로그인 페이지로 이동
        } else {
          alert('회원가입에 실패하였습니다.');
        }
      })
      .catch((error) => {
        alert('회원가입에 실패하였습니다.');
      });
  };

  return (
    <div className="Join">
      <p className="post-Image">
        <img src="https://file.koreafilm.or.kr/thm/02/99/17/79/tn_DPK019466.jpg" alt="Movie Poster" />
      </p>
      <div className="Login-form">
        <div className="Join-form">
          <h3 className="Join-comment">회원가입</h3>
          <div>
            <label>Email: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value); // 입력값 변경 시 유효성 검사 수행
              }}
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value); // 입력값 변경 시 유효성 검사 수행
              }}
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <div>
            <label>PasswordCheck: </label>
            <input
              type="password"
              value={passwordCheck}
              onChange={(e) => {
                setPasswordCheck(e.target.value);
                validatePasswordCheck(e.target.value); // 입력값 변경 시 유효성 검사 수행
              }}
            />
            {passwordCheckError && <p className="error-message">{passwordCheckError}</p>}
          </div>
          <div>
            <label>Name: </label>
            <input type="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Nickname: </label>
            <input type="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
          </div>
          <div>
            <label>Birth: </label>
            <input
              type="birth"
              value={birth}
              onChange={(e) => {
                setBirth(e.target.value);
                validateBirth(e.target.value); // 입력값 변경 시 유효성 검사 수행
              }}
            />
            {birthError && <p className="error-message">{birthError}</p>}
          </div>

          <button className="Login-button" onClick={handleJoin}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
