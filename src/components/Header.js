"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import LoginModal from "./LoginModal";

export default function Header() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="main-header">
        <div className="logo">My App</div>
        <div className="auth-section">
          {session ? (
            <div className="user-profile">
              <span className="user-name">{session.user.name}님 환영합니다!</span>
              <button 
                className="btn-logout" 
                onClick={() => signOut()}
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button 
              className="btn-login" 
              onClick={() => setIsModalOpen(true)}
            >
              로그인
            </button>
          )}
        </div>
      </header>

      <LoginModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <style jsx>{`
        .main-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid rgba(255,255,255,0.3);
        }
        .logo {
          font-weight: 900;
          font-size: 1.5rem;
          color: #3b82f6;
        }
        .auth-section {
          display: flex;
          align-items: center;
        }
        .user-profile {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .user-name {
          font-weight: 500;
          color: #333;
        }
        .btn-login, .btn-logout {
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-login {
          background: #3b82f6;
          color: white;
          border: none;
        }
        .btn-logout {
          background: none;
          border: 1px solid #ccc;
          color: #666;
        }
      `}</style>
    </>
  );
}
