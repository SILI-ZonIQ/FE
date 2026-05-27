import { useState } from 'react';
import '../css/Setting.css';

const Settings = () => {
  const [safetyZone, setSafetyZone] = useState({
    name: '메인 작업장 A',
    radius: 50,
    sensitivity: '높음'
  });

  const [dangerZones, setDangerZones] = useState([
    { id: 1, name: '용접 로봇 구역', type: '진입 금지', status: '활성' },
    { id: 2, name: '고압 프레스 구역', type: '주의', status: '활성' },
    { id: 3, name: '자재 하역장', type: '시간제한 진입', status: '비활성' }
  ]);

  const [plcConfig, setPlcConfig] = useState({
    ipAddress: '192.168.0.100',
    port: '502',
    protocol: 'Modbus TCP',
    interval: 1000
  });

  const handleDeleteZone = (id) => {
    setDangerZones(dangerZones.filter(zone => zone.id !== id));
  };

  return (
    <div className="settings-container">
      <div className="settings-grid">
        {/* 안전 구역 설정 */}
        <section className="settings-card">
          <div className="card-header">
            <h3>안전 구역 설정</h3>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>구역 명칭</label>
              <input 
                type="text" 
                value={safetyZone.name} 
                onChange={(e) => setSafetyZone({...safetyZone, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>감지 반경 (m)</label>
              <input 
                type="number" 
                value={safetyZone.radius} 
                onChange={(e) => setSafetyZone({...safetyZone, radius: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>감지 민감도</label>
              <select 
                value={safetyZone.sensitivity} 
                onChange={(e) => setSafetyZone({...safetyZone, sensitivity: e.target.value})}
              >
                <option>낮음</option>
                <option>보통</option>
                <option>높음</option>
              </select>
            </div>
            <button className="save-btn">설정 저장</button>
          </div>
        </section>

        {/* PLC 통신 설정 */}
        <section className="settings-card">
          <div className="card-header">
            <h3>PLC 통신 설정</h3>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>IP 주소</label>
              <input 
                type="text" 
                value={plcConfig.ipAddress} 
                onChange={(e) => setPlcConfig({...plcConfig, ipAddress: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>포트 번호</label>
              <input 
                type="text" 
                value={plcConfig.port} 
                onChange={(e) => setPlcConfig({...plcConfig, port: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>통신 프로토콜</label>
              <select 
                value={plcConfig.protocol} 
                onChange={(e) => setPlcConfig({...plcConfig, protocol: e.target.value})}
              >
                <option>Modbus TCP</option>
                <option>EtherNet/IP</option>
                <option>PROFINET</option>
              </select>
            </div>
            <button className="save-btn">연결 테스트</button>
          </div>
        </section>

        {/* 위험 구역 목록 관리 */}
        <section className="settings-card full-width">
          <div className="card-header">
            <h3>위험 구역 목록 관리</h3>
            <button className="add-btn">+ 구역 추가</button>
          </div>
          <div className="card-body">
            <table className="settings-table">
              <thead>
                <tr>
                  <th>구역 ID</th>
                  <th>구역 이름</th>
                  <th>위험 유형</th>
                  <th>상태</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {dangerZones.map(zone => (
                  <tr key={zone.id}>
                    <td>{zone.id.toString().padStart(2, '0')}</td>
                    <td>{zone.name}</td>
                    <td><span className={`type-tag ${zone.type === '진입 금지' ? 'danger' : 'warning'}`}>{zone.type}</span></td>
                    <td><span className={`status-dot ${zone.status === '활성' ? 'active' : ''}`}></span>{zone.status}</td>
                    <td>
                      <button className="edit-btn">수정</button>
                      {/* 👇 삭제 버튼에 이벤트 바인딩 */}
                      <button className="delete-btn" onClick={() => handleDeleteZone(zone.id)}>삭제</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;