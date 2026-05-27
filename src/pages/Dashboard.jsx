import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/Dashboard.css';
import Monitoring from './Monitoring';
import PlcStatus from './PLC';
import AlertLog from './Alert';
import Settings from './Setting'; 

// --- Icons ---
const IconDashboard = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
const IconMonitor = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconPLC = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="10" x2="6" y2="14"/><line x1="18" y1="10" x2="18" y2="14"/></svg>;
const IconAlert = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const IconUser = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>;
const IconSettings = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const IconLogout = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  
  // 💡 로그인 화면에서 전달한 동적 사용자 이름 (없으면 기본값 '홍길동')
  const userName = location.state?.username || '홍길동';

  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alerts, setAlerts] = useState([
    { id: 1, message: '위험 구역 01 진입 감지', time: '2025-05-20 09:29:12', type: 'danger', isRead: false },
    { id: 2, message: '안전모 미착용 감지', time: '2025-05-20 09:28:44', type: 'danger', isRead: false },
    { id: 3, message: '작업 허가가 승인되었습니다.', time: '2025-05-20 09:15:30', type: 'info', isRead: false }
  ]);

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  const handleEmergencyStop = () => {
    const isConfirmed = window.confirm('모든 설비를 즉시 정지하시겠습니까?');
    if (isConfirmed) {
      alert('성공적으로 장비를 정지시켰습니다.');
      const newAlert = {
        id: Date.now(),
        message: '관리자에 의해 긴급 정지 명령이 실행되었습니다.',
        time: new Date().toLocaleString(),
        type: 'danger',
        isRead: false
      };
      setAlerts([newAlert, ...alerts]);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const week = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
    return `${y}-${m}-${d} (${week})`;
  };

  const formatTime = (date) => date.toLocaleTimeString('en-GB', { hour12: false });

  const headerTitles = {
    dashboard: { title: '메인 대시보드', sub: '전체 작업 현황 및 설비 상태를 한눈에 모니터링합니다.' },
    monitoring: { title: '실시간 모니터링', sub: '현장의 모든 카메라와 위험 요소를 실시간으로 감시합니다.' },
    plc: { title: 'PLC 설비 상태', sub: '개별 PLC 장비의 가동 상태 및 상세 파라미터를 관리합니다.' },
    alertLog: { title: '위험 알림 로그', sub: '과거 발생한 모든 위험 알림 기록을 검색하고 분석합니다.' },
    settings: { title: '시스템 설정', sub: '안전 구역, 위험 구역 및 통신 설정을 관리합니다.' }
  };

  const renderDashboardContent = () => (
    <>
      <section className="summary-section">
        <div className="summary-card">
          <span className="card-label">작업 상태</span>
          <div className="card-value-box">
            <div className="card-icon blue" style={{ color: '#174275', backgroundColor: '#f0f4ff', padding: '8px', borderRadius: '10px' }}><IconSettings /></div>
            <span className="card-value">진행 중</span>
          </div>
          <span className="card-subtext">작업 허가번호: W-2025-0520-001</span>
        </div>
        <div className="summary-card">
          <span className="card-label">작업자 수</span>
          <div className="card-value-box">
            <div className="card-icon blue" style={{ color: '#174275', backgroundColor: '#f0f4ff', padding: '8px', borderRadius: '10px' }}><IconUser /></div>
            <span className="card-value">2 / <span style={{ color: '#999', fontSize: '18px' }}>5명</span></span>
          </div>
          <span className="card-subtext">위험구역 허용 인원: 5명</span>
        </div>
        <div className="summary-card">
          <span className="card-label">위험 알림</span>
          <div className="card-value-box">
            <div className="card-icon orange" style={{ color: '#ff9c12', backgroundColor: '#fff7e6', padding: '8px', borderRadius: '10px' }}><IconAlert /></div>
            <span className="card-value">{unreadCount} <span style={{ fontSize: '16px', color: '#999' }}>건</span></span>
          </div>
          <span className="card-subtext">미확인 알림 수</span>
        </div>
        <div className="summary-card">
          <span className="card-label">설비 상태 (PLC)</span>
          <div className="card-value-box">
            <div className="card-icon green" style={{ color: '#52c41a', backgroundColor: '#f6ffed', padding: '8px', borderRadius: '10px' }}><IconPLC /></div>
            <span className="card-value">정상</span>
          </div>
          <span className="card-subtext">설비 가동 중</span>
        </div>
        <div className="summary-card">
          <span className="card-label">위험 구역</span>
          <div className="card-value-box">
            <div className="card-icon purple" style={{ color: '#722ed1', backgroundColor: '#f9f0ff', padding: '8px', borderRadius: '10px' }}><IconMonitor /></div>
            <span className="card-value">2 <span style={{ fontSize: '16px', color: '#999' }}>개</span></span>
          </div>
          <span className="card-subtext">설정된 위험 구역</span>
        </div>
      </section>

      <section className="middle-section">
        <div className="cctv-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700' }}>실시간 CCTV 모니터링</h3>
            <span style={{ fontSize: '12px', color: '#174275', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '8px', height: '8px', backgroundColor: '#174275', borderRadius: '50%' }}></span> 실시간
            </span>
          </div>
          <div className="cctv-screen">
            <div style={{ texttext: 'center' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              <p style={{ marginTop: '15px', fontSize: '14px' }}>카메라 화면이 여기에 표시됩니다.</p>
            </div>
          </div>
        </div>
        <div className="recent-alerts">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700' }}>최근 알림</h3>
            <span style={{ fontSize: '13px', color: '#999', cursor: 'pointer' }}>전체 보기 &gt;</span>
          </div>
          <div className="alert-list">
            {alerts.map(alert => (
              <div key={alert.id} style={{ display: 'flex', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #f5f7fa', gap: '15px' }}>
                <div style={{ 
                  color: alert.type === 'danger' ? '#ff4d4f' : '#174275', 
                  backgroundColor: alert.type === 'danger' ? '#fff1f0' : '#f0f4ff',
                  padding: '10px', borderRadius: '50%'
                }}>
                  <IconAlert />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>{alert.message}</p>
                  <p style={{ fontSize: '12px', color: '#999' }}>{alert.time}</p>
                </div>
                <span style={{ 
                  fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '6px',
                  backgroundColor: alert.isRead ? '#f5f5f5' : '#fff1f0',
                  color: alert.isRead ? '#999' : '#ff4d4f'
                }}>
                  {alert.isRead ? '확인' : '미확인'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#174275" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <div className="logo-text">
            <h1 className="brand-name">
              <span className="brand-zon">ZON</span>
              <span className="brand-iq">IQ</span>
            </h1>
            <p className="brand-subtitle">작업안전 통합제어 시스템</p>
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className={`nav-item ${activeMenu === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveMenu('dashboard')}>
            <IconDashboard /> <span>메인 대시보드</span>
          </div>
          <div className={`nav-item ${activeMenu === 'monitoring' ? 'active' : ''}`} onClick={() => setActiveMenu('monitoring')}>
            <IconMonitor /> <span>실시간 모니터링</span>
          </div>
          <div className={`nav-item ${activeMenu === 'plc' ? 'active' : ''}`} onClick={() => setActiveMenu('plc')}>
            <IconPLC /> <span>PLC 설비 상태</span>
          </div>
          <div className={`nav-item ${activeMenu === 'alertLog' ? 'active' : ''}`} onClick={() => setActiveMenu('alertLog')}>
            <IconAlert /> <span>위험 알림 로그</span>
          </div>
          <div className="nav-item"><IconUser /> <span>작업자 관리</span></div>
          <div className={`nav-item ${activeMenu === 'settings' ? 'active' : ''}`} onClick={() => setActiveMenu('settings')}>
            <IconSettings /> <span>설정</span>
          </div>
        </nav>
        
        <div className="emergency-stop-section">
          <div className="emergency-button-wrapper">
            <button className="emergency-button" onClick={handleEmergencyStop}>
              <span>긴급</span>
              <span>정지</span>
            </button>
            <p className="emergency-text">모든 설비 즉시 정지</p>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="nav-item logout" onClick={handleLogout} style={{ cursor: 'pointer' }}>
            <IconLogout /> <span>로그아웃</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="content-header">
          <div className="header-left">
            <h2>{headerTitles[activeMenu]?.title}</h2>
            <p>{headerTitles[activeMenu]?.sub}</p>
          </div>
          <div className="header-right">
            <div className="user-profile">
              <div className="profile-info">
                {/* 💡 로그인한 사용자 이름 뒤에 '님'을 동적으로 붙이고, 역할을 분리 배치 */}
                <span className="user-name">{userName}님</span>
                <span className="user-role">작업자</span>
              </div>
            </div>
            <div className="header-clock">
              <span className="header-date">{formatDate(currentTime)}</span>
              <span className="header-time">{formatTime(currentTime)}</span>
            </div>
          </div>
        </header>

        {activeMenu === 'dashboard' && renderDashboardContent()}
        {activeMenu === 'monitoring' && <Monitoring alerts={alerts} />}
        {activeMenu === 'plc' && <PlcStatus />}
        {activeMenu === 'alertLog' && <AlertLog />}
        {activeMenu === 'settings' && <Settings />}

        <footer className="dashboard-footer">
          <p>© 2025 ZONIQ. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;