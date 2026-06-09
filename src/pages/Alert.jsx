import { useEffect, useState } from 'react';
import styles from '../css/Alert.module.css';

const API_URL = 'http://127.0.0.1:8000';

const cx = (...classNames) => classNames.filter(Boolean).map((className) => styles[className]).join(' ');

const IconSearch = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;

const Alert = () => {
  // 조회기간 기본 날짜 세팅 (2026.01.01 ~ 2026.12.31)
  const [filters, setFilters] = useState({
    dateStart: '2026-01-01',
    dateEnd: '2026-12-31'
  });
  
  const [appliedFilters, setAppliedFilters] = useState({
    dateStart: '2026-01-01',
    dateEnd: '2026-12-31'
  });

  const [logs, setLogs] = useState([]);
  
  // [수정] 에디터 빨간 줄을 없애기 위해 화살표 함수 표현식(const)으로 명확하게 변경했습니다.
  const fetchDangerEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/danger-events`);
      const data = await response.json();

      console.log("위험로그 API 데이터:", data);

      const converted = data.map((item) => {
        const [date, time] = item.event_time.split(" ");
        return {
          id: item.event_id,
          date,
          time,
          area: "위험구역",
          machineStatus: item.machine_status,
          videoPath: item.video_path
        };
      });

      setLogs(converted);
    } catch (error) {
      console.error(error);
      alert("위험 로그 조회 실패");
    }
  };

  useEffect(() => {
    fetchDangerEvents();
  }, []);

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
      dateStart: '2026-01-01',
      dateEnd: '2026-12-31'
    };
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setCurrentPage(1);
  };

  const filteredLogs = logs.filter(log => {
    if (appliedFilters.dateStart && log.date < appliedFilters.dateStart) {
      return false;
    }
  
    if (appliedFilters.dateEnd && log.date > appliedFilters.dateEnd) {
      return false;
    }
  
    return true;
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
              <video
                controls
                width="100%"
                src={`http://127.0.0.1:8000/${selectedVideoLog.videoPath}`}
                style={{
                  width: '100%',
                  height: '420px',
                  backgroundColor: '#000',
                  borderRadius: '8px'
                }}
              />    
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
        <div className={cx('filter-wrapper')}>
          <div className={cx('filter-group')}>
            <label>조회 기간</label>
            <div className={cx('date-inputs')}>
              <input type="date" name="dateStart" value={filters.dateStart} onChange={handleFilterChange} />
              <span>~</span>
              <input type="date" name="dateEnd" value={filters.dateEnd} onChange={handleFilterChange} />
            </div>
          </div>
          <div className={cx('filter-actions')}>
            <button className={cx('reset-btn')} onClick={handleReset}>초기화</button>
            <button className={cx('search-btn')} onClick={handleSearch}><IconSearch /> 검색하기</button>
          </div>
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