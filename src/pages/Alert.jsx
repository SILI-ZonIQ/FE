import { useState } from 'react';
import styles from '../css/Alert.module.css';

const cx = (...classNames) => classNames.filter(Boolean).map((className) => styles[className]).join(' ');

const IconSearch = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IconCamera = () => <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;

const Alert = () => {
  const [filters, setFilters] = useState({
    dateStart: '2025-05-01',
    dateEnd: '2025-05-20'
  });

  const [appliedFilters, setAppliedFilters] = useState({
    dateStart: '2025-05-01',
    dateEnd: '2025-05-20'
  });

  const [logs] = useState([
    { id: 1, date: '2025-05-20', time: '09:29:12', area: 'Zone A' },
    { id: 2, date: '2025-05-20', time: '09:28:44', area: 'Zone B' },
    { id: 3, date: '2025-05-19', time: '14:15:30', area: '정문' },
    { id: 4, date: '2025-05-19', time: '11:05:12', area: '전기실' },
    { id: 5, date: '2025-05-18', time: '16:40:05', area: 'Zone C' },
    { id: 6, date: '2025-05-18', time: '10:20:33', area: '컨베이어' },
    { id: 7, date: '2025-05-17', time: '15:10:22', area: 'Zone A' },
    { id: 8, date: '2025-05-17', time: '13:45:01', area: 'Zone C' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [selectedVideoLog, setSelectedVideoLog] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    setAppliedFilters({
      dateStart: filters.dateStart,
      dateEnd: filters.dateEnd
    });
    setCurrentPage(1); 
  };

  const handleReset = () => {
    const defaultFilters = {
      dateStart: '2025-05-01',
      dateEnd: '2025-05-20'
    };
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setCurrentPage(1);
  };

  const filteredLogs = logs.filter(log => {
    return log.date >= appliedFilters.dateStart && log.date <= appliedFilters.dateEnd;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderVideoModal = () => {
    if (!selectedVideoLog) return null;

    return (
      <div className={cx('video-modal-overlay')} onClick={() => setSelectedVideoLog(null)}>
        <div className={cx('video-modal-window')} onClick={(e) => e.stopPropagation()}>
          <div className={cx('video-modal-header')}>
            <h4>{selectedVideoLog.area} - 위험 녹화 영상 분할 보기</h4>
            <button onClick={() => setSelectedVideoLog(null)} aria-label="닫기">×</button>
          </div>
          <div className={cx('video-modal-body')}>
            <div className={cx('video-screen-container')}>
              <div className={cx('video-live-indicator')}>● 당시 상황 기록</div>
              <div className={cx('video-placeholder-box')}>
                <IconCamera />
                <p>[{selectedVideoLog.date} {selectedVideoLog.time}] 발생 위험 감지 영상</p>
                <span>카메라 피드 데이터 수집 완료 및 아카이빙됨</span>
              </div>
            </div>
            <div className={cx('video-info-strip')}>
              <span><strong>발생 일시:</strong> {selectedVideoLog.date} {selectedVideoLog.time}</span>
              <span><strong>관제 구역:</strong> {selectedVideoLog.area}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={cx('alert-log-content')}>
      <section className={cx('filter-section')} style={{ borderRadius: '6px' }}>
        <div className={cx('filter-grid')}>
          <div className={cx('filter-group')}>
            <label>조회 기간</label>
            <div className={cx('date-inputs')}>
              <input type="date" name="dateStart" value={filters.dateStart} onChange={handleFilterChange} />
              <span>~</span>
              <input type="date" name="dateEnd" value={filters.dateEnd} onChange={handleFilterChange} />
            </div>
          </div>
        </div>
        <div className={cx('filter-actions')}>
          <button className={cx('reset-btn')} onClick={handleReset}>초기화</button>
          <button className={cx('search-btn')} onClick={handleSearch}><IconSearch /> 검색하기</button>
        </div>
      </section>

      <section className={cx('log-table-section')} style={{ borderRadius: '6px' }}>
        <div className={cx('table-header-actions')}>
          <h3 className={cx('table-title')}>검색 결과 <span>({filteredLogs.length}건)</span></h3>
        </div>
        <div className={cx('log-main-table')}>
          <div className={cx('t-head')}>
            <span>날짜/시간</span>
            <span>발생 구역</span>
            <span>작업</span>
          </div>
          <div className={cx('t-body')}>
            {currentLogs.length > 0 ? (
              currentLogs.map(log => (
                <div key={log.id} className={cx('t-row')}>
                  <div className={cx('t-datetime')}>
                    <span className={cx('d')}>{log.date}</span>
                    <span className={cx('t')}>{log.time}</span>
                  </div>
                  <span className={cx('t-area')}>{log.area}</span>
                  <div className={cx('t-action-cell')}>
                    <button 
                      className={cx('btn-video-trigger')}
                      onClick={() => setSelectedVideoLog(log)}
                    >
                      영상 보기
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={cx('no-data-msg')}>
                검색 조건에 일치하는 위험 로그가 없습니다.
              </div>
            )}
          </div>
        </div>
        
        {filteredLogs.length > 0 && (
          <div className={cx('pagination')}>
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={cx(currentPage === number && 'active')}
              >
                {number}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        )}
      </section>

      {renderVideoModal()}
    </div>
  );
};

export default Alert;