import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css'; // 경로 및 소문자 파일명 반영

const ShieldIcon = ({ size = 48, color = "#0046B4" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const UserIcon = ({ size = 20, color = "#999" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const PhoneIcon = ({ size = 20, color = "#999" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!name.trim() || !phoneNumber.trim()) {
      alert('이름과 전화번호를 모두 입력해주세요.');
      return;
    }
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      {/* 상단 우측 시계 제거됨 */}

      <div className="login-card">
        <div className="login-header">
          {/* 방패 아이콘 크기 64로 확대 */}
          <div className="logo-icon"><ShieldIcon size={64} /></div>
          
          {/* 브랜드명 분리 및 크기 조정 */}
          <h1 className="brand-name">
            <span className="brand-zon">ZON</span>
            <span className="brand-iq">IQ</span>
          </h1>
          <p className="brand-subtitle">작업안전 통합제어 시스템</p>
        </div>
        <div className="divider"></div>
        <div className="login-body">
          <h2 className="login-title">로그인</h2>
          <p className="login-subtitle">계정 정보를 입력하여 로그인해주세요.</p>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <span className="input-icon"><UserIcon /></span>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="이름을 입력해주세요" 
              />
            </div>
            <div className="input-group">
              <span className="input-icon"><PhoneIcon /></span>
              <input 
                type="text" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
                placeholder="전화번호를 입력해주세요" 
              />
            </div>
            <button type="submit" className="login-button">로그인</button>
          </form>
        </div>
      </div>

      <footer className="login-footer">
        <p className="copyright">© 2025 ZONIQ. All rights reserved.</p>
        <div className="footer-links">
          <span>개인정보처리방침</span> | <span>이용약관</span> | <span>고객센터</span>
        </div>
      </footer>
    </div>
  );
};

export default Login;