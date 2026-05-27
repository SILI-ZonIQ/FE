import { useState } from 'react';
import '../css/Alert.css';


const IconSearch = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
//const IconFilter = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>;
const IconDownload = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;

const AlertLog = () => {
  // 필터 상태 관리
  const [filters, setFilters] = useState({
    dateStart: '2025-05-01',
    dateEnd: '2025-05-20',
    type: '전체',
    worker: '',
    status: '전체'
  });

  // 샘플 로그 데이터
  const [logs] = useState([
    { id: 1, date: '2025-05-20', time: '09:29:12', type: '위험 구역 진입', worker: '작업자 02', area: 'Zone A', status: '미확인' },
    { id: 2, date: '2025-05-20', time: '09:28:44', type: '안전모 미착용', worker: '작업자 05', area: 'Zone B', status: '확인완료' },
    { id: 3, date: '2025-05-19', time: '14:15:30', type: '비인가 접근', worker: '외부인', area: '정문', status: '확인완료' },
    { id: 4, date: '2025-05-19', time: '11:05:12', type: '화재 감지', worker: '시스템', area: '전기실', status: '긴급조치' },
    { id: 5, date: '2025-05-18', time: '16:40:05', type: '낙상 사고', worker: '작업자 01', area: 'Zone C', status: '확인완료' },
    { id: 6, date: '2025-05-18', time: '10:20:33', type: '장비 오작동', worker: '시스템', area: '컨베이어', status: '확인완료' },
  ]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="alert-log-content">
      {/* 검색 필터 섹션 */}
      <section className="filter-section">
        <div className="filter-grid">
          <div className="filter-group">
            <label>조회 기간</label>
            <div className="date-inputs">
              <input type="date" name="dateStart" value={filters.dateStart} onChange={handleFilterChange} />
              <span>~</span>
              <input type="date" name="dateEnd" value={filters.dateEnd} onChange={handleFilterChange} />
            </div>
          </div>
          <div className="filter-group">
            <label>위험 유형</label>
            <select name="type" value={filters.type} onChange={handleFilterChange}>
              <option>전체</option>
              <option>위험 구역 진입</option>
            </select>
          </div>
          <div className="filter-group">
            <label>상태</label>
            <select name="status" value={filters.status} onChange={handleFilterChange}>
              <option>전체</option>
              <option>미확인</option>
              <option>확인완료</option>
              <option>긴급조치</option>
            </select>
          </div>
        </div>
        <div className="filter-actions">
          <button className="reset-btn">초기화</button>
          <button className="search-btn"><IconSearch /> 검색하기</button>
        </div>
      </section>

      {/* 로그 테이블 섹션 */}
      <section className="log-table-section">
        <div className="table-header-actions">
          <h3 className="table-title">검색 결과 <span>({logs.length}건)</span></h3>
          <button className="download-btn"><IconDownload /> 엑셀 다운로드</button>
        </div>
        <div className="log-main-table">
          <div className="t-head">
            <span>날짜/시간</span>
            <span>위험 유형</span>
            <span>작업자</span>
            <span>발생 구역</span>
            <span>처리 상태</span>
            <span>상세보기</span>
          </div>
          <div className="t-body">
            {logs.map(log => (
              <div key={log.id} className="t-row">
                <div className="t-datetime">
                  <span className="d">{log.date}</span>
                  <span className="t">{log.time}</span>
                </div>
                <span className="t-type">{log.type}</span>
                <span className="t-worker">{log.worker}</span>
                <span className="t-area">{log.area}</span>
                <div className="t-status">
                  <span className={`status-tag ${log.status === '미확인' ? 'unread' : log.status === '긴급조치' ? 'urgent' : 'done'}`}>
                    {log.status}
                  </span>
                </div>
                <button className="view-btn">조회</button>
              </div>
            ))}
          </div>
        </div>
        
        {/* 페이지네이션 */}
        <div className="pagination">
          <button disabled>&lt;</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>&gt;</button>
        </div>
      </section>
    </div>
  );
};

export default AlertLog;