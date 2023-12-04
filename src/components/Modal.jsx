import React from 'react';
import './Modal.css'; 

export default function Modal({ onClose, children }) {
  return (
    <div className="modal">
      <div className="modal-content">
        {children}
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}