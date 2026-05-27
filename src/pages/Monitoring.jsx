import '../css/Monitoring.css';

const IconCamera = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const IconUser = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>;
const IconAlert = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const IconLoc = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;

const Monitoring = () => {
  // 위험 구역 현황 데이터
  const zones = [
    { id: 1, name: 'Zone A (용접실)', coords: '124.5, 45.2', status: '위험', color: '#ff4d4f' },
    { id: 2, name: 'Zone B (자재창고)', coords: '210.1, 88.4', status: '주의', color: '#faad14' },
    { id: 3, name: 'Zone C (조립라인)', coords: '15.8, 122.9', status: '안전', color: '#52c41a' },
  ];

  // 실시간 감지 정보 데이터
  const detections = {
    totalWorkers: 5,
    dangerZoneWorkers: 0,
    riskLevel: 0,
    lastEvent: 'Zone A 내 비인가 작업자 진입'
  };

  return (
    <div className="monitoring-content">
      <div className="monitoring-layout">
        
        {/* 왼쪽: 단일 대형 CCTV 화면 */}
        <div className="main-cctv-area">
          <div className="cctv-header">
            <span className="cctv-title">Main CCTV - Factory Floor A</span>
            <span className="live-tag">LIVE</span>
          </div>
          <div className="cctv-large-view">
            <div className="overlay-info">
              <p>REC 00:45:12</p>
              <p>CAM 01</p>
            </div>
            <div className="cctv-placeholder">
              <IconCamera />
              <p>실시간 영상 스트리밍 중...</p>
            </div>
          </div>
        </div>

        {/* 오른쪽: 감지 정보 및 위험 구역 현황 */}
        <div className="side-data-area">
          
          {/* 1. 실시간 감지 정보 */}
          <section className="data-card detection-card">
            <h3 className="card-title">실시간 감지 정보</h3>
            <div className="detection-stats">
              <div className="stat-item">
                <div className="stat-label"><IconUser /> 감지된 작업자 수</div>
                <div className="stat-value">{detections.totalWorkers}<span>명</span></div>
              </div>
              <div className="stat-item danger">
                <div className="stat-label"><IconAlert /> 위험 구역 내 작업자</div>
                <div className="stat-value">{detections.dangerZoneWorkers}<span>명</span></div>
              </div>
              <div className="stat-item">
                <div className="stat-label"><IconAlert /> 위험 상황</div>
                <div className="stat-value highlight">{detections.riskLevel}</div>
              </div>
            </div>
          </section>

          {/* 2. 위험 구역 현황 */}
          <section className="data-card zone-card">
            <h3 className="card-title">위험 구역 현황</h3>
            <div className="zone-table">
              <div className="table-header">
                <span>구역 이름</span>
                <span>좌표</span>
                <span>상태</span>
              </div>
              {zones.map(zone => (
                <div key={zone.id} className="table-row">
                  <span className="z-name">{zone.name}</span>
                  <span className="z-coords"><IconLoc /> {zone.coords}</span>
                  <span className="z-status" style={{ color: zone.color }}>{zone.status}</span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Monitoring;