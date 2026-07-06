import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/login.module.css';

const cx = (...classNames) =>
  classNames.filter(Boolean).map((className) => styles[className]).join(' ');

import { API_URL } from '../config';;

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
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!name.trim() || !phoneNumber.trim()) {
      alert('이름과 전화번호를 모두 입력해주세요.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/workers/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phoneNumber.trim(),
        }),
      });

      const data = await response.json();

      if (data.result !== 'success') {
        alert(data.message || '로그인에 실패했습니다.');
        return;
      }

      localStorage.setItem('worker_id', data.worker_id);
      localStorage.setItem('worker_name', data.name);

      navigate('/dashboard', {
        state: {
          username: data.name,
        },
      });
    } catch (error) {
      console.error(error);
      alert('서버 연결에 실패했습니다. FastAPI 서버가 켜져 있는지 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cx('login-container')}>
      <div className={cx('login-card')}>
        <div className={cx('login-header')}>
          <div className={cx('logo-icon')}><ShieldIcon size={64} /></div>

          <h1 className={cx('brand-name')}>
            <span className={cx('brand-zon')}>ZON</span>
            <span className={cx('brand-iq')}>IQ</span>
          </h1>
        </div>

        <div className={cx('divider')}></div>

        <div className={cx('login-body')}>
          <h2 className={cx('login-title')}>로그인</h2>
          <p className={cx('login-subtitle')}>계정 정보를 입력하여 로그인해주세요.</p>

          <form className={cx('login-form')} onSubmit={handleLogin}>
            <div className={cx('input-group')}>
              <span className={cx('input-icon')}><UserIcon /></span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력해주세요"
              />
            </div>

            <div className={cx('input-group')}>
              <span className={cx('input-icon')}><PhoneIcon /></span>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="전화번호를 입력해주세요"
              />
            </div>

            <button type="submit" className={cx('login-button')} disabled={loading}>
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>
        </div>
      </div>

      <footer className={cx('login-footer')}>
        <p className={cx('copyright')}>© 2025 ZONIQ. All rights reserved.</p>
        <div className={cx('footer-links')}>
          <span>개인정보처리방침</span> | <span>이용약관</span> | <span>고객센터</span>
        </div>
      </footer>
    </div>
  );
};

export default Login;