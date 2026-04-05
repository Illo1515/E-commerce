"use client";

import { signIn } from "next-auth/react";

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2 className="modal-title">로그인</h2>
        <p className="modal-subtitle">소셜 계정으로 1초 만에 시작하세요!</p>
        
        <div className="login-buttons">
          <button 
            className="btn btn-google" 
            onClick={() => signIn("google")}
          >
            Google로 계속하기
          </button>
          <button 
            className="btn btn-kakao" 
            onClick={() => signIn("kakao")}
          >
            카카오로 계속하기
          </button>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }
        .modal-content {
          background: #fff;
          border-radius: 24px;
          padding: 40px;
          width: 90%;
          max-width: 400px;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
          text-align: center;
        }
        .modal-close {
          position: absolute;
          top: 16px; right: 16px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
        }
        .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: #333;
        }
        .modal-subtitle {
          color: #666;
          margin-bottom: 24px;
        }
        .login-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .btn-google {
          background: #ffffff;
          color: #333;
          border: 1px solid #ddd;
        }
        .btn-kakao {
          background: #FEE500;
          color: #000000;
          border: none;
        }
      `}</style>
    </div>
  );
}
