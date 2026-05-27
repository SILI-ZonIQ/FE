import '../css/PlC.css';

const IconPLC = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="10" x2="6" y2="14"/><line x1="18" y1="10" x2="18" y2="14"/></svg>;
const IconCheck = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconAlert = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;

const PlcStatus = () => {
  const plcDevices = [
    { id: 'PLC-001', name: '메인 컨베이어 제어기', status: '정상', temp: '38.5°C', voltage: '220V', uptime: '124h 15m' },
    { id: 'PLC-002', name: '로봇 암 A-1 제어기', status: '정상', temp: '42.1°C', voltage: '218V', uptime: '88h 40m' },
    { id: 'PLC-003', name: '패키징 라인 제어기', status: '주의', temp: '55.2°C', voltage: '221V', uptime: '45h 12m' },
    { id: 'PLC-004', name: '냉각 시스템 제어기', status: '정상', temp: '32.8°C', voltage: '219V', uptime: '210h 05m' },
  ];

  const logs = [
    { id: 1, time: '10:45:12', device: 'PLC-003', msg: '냉각 팬 속도 저하 감지', type: 'warning' },
    { id: 2, time: '10:30:05', device: 'PLC-001', msg: '시스템 정기 자가진단 완료', type: 'success' },
    { id: 3, time: '09:15:44', device: 'PLC-002', msg: '펌웨어 업데이트 성공', type: 'success' },
    { id: 4, time: '08:50:22', device: 'PLC-004', msg: '전압 변동 감지 (허용 범위 내)', type: 'info' },
  ];

  return (
    <div className="plc-status-content">
      <div className="plc-grid">
        {/* PLC 장비 리스트 */}
        {plcDevices.map(device => (
          <div key={device.id} className={`plc-card ${device.status === '주의' ? 'warning' : ''}`}>
            <div className="plc-card-header">
              <div className="plc-icon-box">
                <IconPLC />
              </div>
              <div className="plc-title-box">
                <span className="plc-id">{device.id}</span>
                <h4 className="plc-name">{device.name}</h4>
              </div>
              <span className={`plc-status-badge ${device.status === '주의' ? 'warning' : 'success'}`}>
                {device.status === '정상' ? <IconCheck /> : <IconAlert />}
                {device.status}
              </span>
            </div>
            <div className="plc-card-body">
              <div className="param-item">
                <span className="label">현재 온도</span>
                <span className="value">{device.temp}</span>
              </div>
              <div className="param-item">
                <span className="label">입력 전압</span>
                <span className="value">{device.voltage}</span>
              </div>
              <div className="param-item">
                <span className="label">가동 시간</span>
                <span className="value">{device.uptime}</span>
              </div>
            </div>
            <div className="plc-card-footer">
              <button className="detail-btn">상세 제어</button>
              <button className="log-btn">로그 보기</button>
            </div>
          </div>
        ))}
      </div>

      {/* 설비 로그 섹션 */}
      <section className="plc-log-section">
        <h3 className="section-title">최근 설비 로그</h3>
        <div className="log-table">
          <div className="log-header">
            <span>시간</span>
            <span>장비 ID</span>
            <span>메시지</span>
            <span>상태</span>
          </div>
          {logs.map(log => (
            <div key={log.id} className="log-row">
              <span className="log-time">{log.time}</span>
              <span className="log-device">{log.device}</span>
              <span className="log-msg">{log.msg}</span>
              <span className={`log-type ${log.type}`}>{log.type.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PlcStatus;