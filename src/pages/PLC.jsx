import { useState } from 'react';
import styles from '../css/PLC.module.css';

// styles는 PLC 화면 전용 CSS 이름표 모음입니다.
// cx는 버튼 상태처럼 class가 여러 개 필요할 때 CSS Module 이름으로 바꿔서 붙여줍니다.
const cx = (...classNames) => classNames.filter(Boolean).map((className) => styles[className]).join(' ');

// --- 💡 모달 전용 SVG 아이콘 정의 ---
const IconClock = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconCalendar = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IconHourglass = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}><path d="M5 2h14M5 22h14M19 2v4c0 3-2.5 5.5-5.5 5.5s-5.5-2.5-5.5-5.5V2M19 22v-4c0-3-2.5-5.5-5.5-5.5S8 15 8 18v4"/></svg>;
const IconBriefcase = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const IconBox = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
const IconSearch = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IconWrench = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;

// 화면 확인용 초기 더미데이터입니다.
const initialRepairHistoryData = [
  {
    id: 12,
    name: '로봇암 1호기',
    code: 'PLC-RA-001',
    location: '조립 라인 A',
    type: '모터 과열',
    date: '2025-05-20',
    breakdownDate: '2025-05-20 09:15',
    startDate: '2025-05-20 09:30',
    endDate: '2025-05-20 10:10',
    duration: '00:40 (40분)',
    manager: '김철수',
    status: '완료',
    part: '모터 냉각팬 (Cooling Fan)',
    inspection: '정상',
    cause: '모터 냉각팬의 노후화로 인해 냉각 성능이 저하되어 모터 과열이 발생함.',
    actions: ['냉각팬 교체', '배선 및 연결 상태 점검', '모터 동작 테스트 및 온도 확인', '정상 동작 확인 후 완료'],
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 11,
    name: '컨베이어 벨트',
    code: 'PLC-CV-014',
    location: '포장 라인 B',
    type: '벨트 이탈',
    date: '2025-05-18',
    breakdownDate: '2025-05-18 13:20',
    startDate: '2025-05-18 13:45',
    endDate: '2025-05-18 14:30',
    duration: '00:45 (45분)',
    manager: '이영희',
    status: '완료',
    part: '벨트 장력 조절 롤러',
    inspection: '정상',
    cause: '장시간 가동으로 벨트 장력이 느슨해져 주행 위치가 틀어짐.',
    actions: ['벨트 위치 재정렬', '장력 조절', '롤러 마모 상태 확인', '시운전 후 정상 확인'],
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df7b?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 10,
    name: '용접기 2호기',
    code: 'PLC-WD-002',
    location: '용접실 C',
    type: '전원 이상',
    date: '2025-05-17',
    breakdownDate: '2025-05-17 10:05',
    startDate: '2025-05-17 10:25',
    endDate: '2025-05-17 11:00',
    duration: '00:35 (35분)',
    manager: '박민수',
    status: '완료',
    part: '전원 릴레이',
    inspection: '정상',
    cause: '전원 릴레이 접점 불량으로 순간 전원 차단 현상이 발생함.',
    actions: ['전원 릴레이 교체', '입력 전압 측정', '용접 출력 테스트', '재발 여부 확인'],
    image: 'https://images.unsplash.com/photo-1565608438257-fac3c27beb36?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 9,
    name: 'PLC 제어 패널',
    code: 'PLC-CP-009',
    location: '제어실',
    type: '통신 오류',
    date: '2025-05-16',
    breakdownDate: '2025-05-16 15:10',
    startDate: '2025-05-16 15:40',
    endDate: '-',
    duration: '진행 중',
    manager: '김철수',
    status: '진행중',
    part: '이더넷 통신 모듈',
    inspection: '점검중',
    cause: '네트워크 통신 모듈 응답 지연으로 PLC 상태값 수집이 불안정함.',
    actions: ['통신 케이블 점검', '모듈 재시작', '네트워크 로그 확인', '예비 모듈 교체 검토'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 8,
    name: '경광등',
    code: 'PLC-LT-003',
    location: '자재 하역장',
    type: '점등 불량',
    date: '2025-05-15',
    breakdownDate: '2025-05-15 08:40',
    startDate: '2025-05-15 09:00',
    endDate: '2025-05-15 09:20',
    duration: '00:20 (20분)',
    manager: '이영희',
    status: '완료',
    part: 'LED 램프 모듈',
    inspection: '정상',
    cause: 'LED 램프 모듈 수명 저하로 일부 색상이 점등되지 않음.',
    actions: ['LED 모듈 교체', '신호 입력 확인', '경고음 동작 확인', '상태 표시 정상 확인'],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80'
  }
];

// 설비 선택시 자동 매칭될 기기별 메타 정보 맵
const machineMetaMap = {
  '로봇 암 1호기': { code: 'PLC-RA-001', location: '조립 라인 A', type: '모터 과열' },
  '컨베이어 벨트': { code: 'PLC-CV-014', location: '포장 라인 B', type: '벨트 이탈' },
  '용접기 2호기': { code: 'PLC-WD-002', location: '용접실 C', type: '전원 이상' },
  'PLC 제어 패널': { code: 'PLC-CP-009', location: '제어실', type: '통신 오류' },
};

const PlcStatus = () => {
  const [activeTab, setActiveTab] = useState('register');
  const [selectedRepair, setSelectedRepair] = useState(null);

  // ⭕ 폼 초기 상태 선언
  const initialFormState = {
    machinery: '',
    breakdownDate: '2025-05-20',
    startDate: '2025-05-20',
    endDate: '',
    reason: '',
    content: '',
    assignee: ''
  };

  const [repairForm, setRepairForm] = useState(initialFormState);

  // ⭕ 가변 상태로 변경: 신규 데이터 추가가 가능하도록 useState 바인딩
  const [historyLogs, setHistoryLogs] = useState(initialRepairHistoryData);

  const [selectedDetail, setSelectedDetail] = useState({
    name: '로봇 암 1호기',
    breakdownDate: '2025-05-19 14:20',
    startDate: '2025-05-19 15:00',
    endDate: '2025-05-19 17:30',
    reason: '지속적인 고부하 작업으로 인한 모터 온도 급상승',
    content: '모터 냉각팬 교체 및 내부 먼지 청소 진행 후 정상 가동 확인',
    manager: '김철수',
    status: '완료'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRepairForm({ ...repairForm, [name]: value });
  };

  // ⭕ 초기화 버튼 클릭 핸들러
  const handleClearForm = () => {
    setRepairForm(initialFormState);
  };

  // ⭕ 저장 버튼 클릭 시 실시간 리스트 추가 로직
  const handleSave = () => {
    // 필수 항목 유효성 검사 (*)
    if (!repairForm.machinery) return alert('설비를 선택해주세요.');
    if (!repairForm.breakdownDate) return alert('고장 발생 일시를 입력해주세요.');
    if (!repairForm.startDate) return alert('수리 시작 일시를 입력해주세요.');
    if (!repairForm.reason.trim()) return alert('고장 원인을 입력하세요.');
    if (!repairForm.content.trim()) return alert('수리 내용을 입력하세요.');
    if (!repairForm.assignee.trim()) return alert('수리 담당자를 입력하세요.');

    // 설비 명칭 기반 메타데이터 추출
    const meta = machineMetaMap[repairForm.machinery] || { code: 'PLC-GEN-000', location: '미지정', type: '일반 점검' };
    
    // 수리 완료 일시 입력 여부에 따른 상태 분기 처리
    const isCompleted = repairForm.endDate !== '';

    // 새 리스트 객체 생성
    const newLog = {
      id: historyLogs.length > 0 ? Math.max(...historyLogs.map(l => l.id)) + 1 : 1,
      name: repairForm.machinery,
      code: meta.code,
      location: meta.location,
      type: meta.type,
      date: repairForm.startDate, // 리스트 표기용 메인 날짜
      breakdownDate: repairForm.breakdownDate,
      startDate: repairForm.startDate,
      endDate: isCompleted ? repairForm.endDate : '-',
      duration: isCompleted ? '정산 완료' : '진행 중',
      manager: repairForm.assignee,
      status: isCompleted ? '완료' : '진행중',
      part: '기본 소모품 교체',
      inspection: isCompleted ? '정상' : '점검중',
      cause: repairForm.reason,
      actions: repairForm.content.split(',').map(item => item.trim()), // 컴마 기준 배열화
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80'
    };

    // 최신 등록 건이 가장 위(배열 맨 앞)로 오도록 상태 관리 업데이트
    const updatedLogs = [newLog, ...historyLogs];
    setHistoryLogs(updatedLogs);

    // 우측 하단 상세 정보 영역에 방금 등록한 수리 내역 바로 자동 선택 노출
    setSelectedDetail({
      name: newLog.name,
      breakdownDate: newLog.breakdownDate,
      startDate: newLog.startDate,
      endDate: newLog.endDate,
      reason: newLog.cause,
      content: newLog.actions.join(', '),
      manager: newLog.manager,
      status: newLog.status
    });

    // 등록 완료 후 폼 입력값 깨끗하게 초기화
    handleClearForm();
    alert('수리 내역이 성공적으로 등록되었습니다.');
  };

  const handleRowClick = (log) => {
    setSelectedDetail({
      name: log.name,
      breakdownDate: log.breakdownDate,
      startDate: log.startDate,
      endDate: log.endDate,
      reason: log.cause,
      content: log.actions.join(', '),
      manager: log.manager,
      status: log.status
    });
  };

  const handleOpenDetail = (log, event) => {
    event?.stopPropagation();
    setSelectedRepair(log);
  };

  const renderHistoryList = () => (
    <section className={cx('history-page')}>
      <div className={cx('history-summary-grid')}>
        <div className={cx('history-summary-card')}>
          <span>전체 수리</span>
          <strong>{historyLogs.length}건</strong>
        </div>
        <div className={cx('history-summary-card')}>
          <span>완료</span>
          <strong>{historyLogs.filter((log) => log.status === '완료').length}건</strong>
        </div>
        <div className={cx('history-summary-card')}>
          <span>진행중</span>
          <strong>{historyLogs.filter((log) => log.status === '진행중').length}건</strong>
        </div>
      </div>

      <section className={cx('history-list-panel')}>
        <div className={cx('history-list-header')}>
          <div>
            <h3>전체 수리 이력</h3>
          </div>
        </div>

        <div className={cx('history-list')}>
          {historyLogs.map((log) => (
            <article key={log.id} className={cx('history-item')}>
              <div className={cx('history-item-main')}>
                <div className={cx('history-avatar')}>
                  {log.name.slice(0, 2)}
                </div>
                <div>
                  <div className={cx('history-title-row')}>
                    <h4>{log.name}</h4>
                    <span className={cx('badge-status', log.status === '완료' ? 'success' : 'progress')}>
                      {log.status}
                    </span>
                  </div>
                  <p>{log.code} · {log.location}</p>
                </div>
              </div>

              <div className={cx('history-meta')}>
                <span>{log.type}</span>
                <span>{log.date}</span>
                <span>{log.manager}</span>
              </div>

              <button className={cx('btn-table-view')} onClick={(event) => handleOpenDetail(log, event)}>
                보기
              </button>
            </article>
          ))}
        </div>
      </section>
    </section>
  );

  const renderRepairModal = () => {
    if (!selectedRepair) return null;

    return (
      <div className={cx('repair-modal-overlay')} onClick={() => setSelectedRepair(null)}>
        <section className={cx('repair-modal')} onClick={(event) => event.stopPropagation()}>
          <div className={cx('repair-modal-header')}>
            <h3>설비 수리 상세 정보</h3>
            <button onClick={() => setSelectedRepair(null)} aria-label="닫기">×</button>
          </div>

          <div className={cx('repair-modal-grid')}>
            <div className={cx('modal-card', 'equipment-card')}>
              <img src={selectedRepair.image} alt={`${selectedRepair.name} 설비 이미지`} />
              <div className={cx('modal-info-table')}>
                <span>설비명</span><strong>{selectedRepair.name}</strong>
                <span>설비번호</span><strong>{selectedRepair.code}</strong>
                <span>설비 위치</span><strong>{selectedRepair.location}</strong>
                <span>고장 유형</span><strong><em>{selectedRepair.type}</em></strong>
              </div>
            </div>

            <div className={cx('modal-card', 'time-card')}>
              <div><span style={{ color: '#666', display: 'flex', alignItems: 'center' }}><IconClock /></span><p>고장 발생 시간</p><strong>{selectedRepair.breakdownDate}</strong></div>
              <div><span style={{ color: '#666', display: 'flex', alignItems: 'center' }}><IconCalendar /></span><p>수리 시작 시간</p><strong>{selectedRepair.startDate}</strong></div>
              <div><span style={{ color: '#666', display: 'flex', alignItems: 'center' }}><IconClock /></span><p>수리 완료 시간</p><strong>{selectedRepair.endDate}</strong></div>
              <div><span style={{ color: '#666', display: 'flex', alignItems: 'center' }}><IconHourglass /></span><p>수리 소요 시간</p><strong>{selectedRepair.duration}</strong></div>
            </div>

            <div className={cx('modal-card', 'manager-card')}>
              <div><span style={{ color: '#e05252', display: 'flex', alignItems: 'center' }}><IconBriefcase /></span><p>수리 담당자</p><strong>{selectedRepair.manager}</strong></div>
              <div><span style={{ color: '#4a90e2', display: 'flex', alignItems: 'center' }}><IconBox /></span><p>사용 부품</p><strong>{selectedRepair.part}</strong></div>
              <div><span style={{ color: '#666', display: 'flex', alignItems: 'center' }}><IconSearch /></span><p>점검 결과</p><strong className={cx('success-text')}>{selectedRepair.inspection}</strong></div>
              <div><span style={{ color: '#666', display: 'flex', alignItems: 'center' }}><IconWrench /></span><p>수리 상태</p><strong className={cx(selectedRepair.status === '완료' ? 'success-text' : 'progress-text')}>{selectedRepair.status}</strong></div>
            </div>

            <div className={cx('modal-card', 'description-card')}>
              <h4>고장 원인</h4>
              <p>{selectedRepair.cause}</p>
              <h4>수리 내용</h4>
              <ul>
                {selectedRepair.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className={cx('repair-management-content')}>
      <div className={cx('repair-tabs')}>
        <button 
          className={cx(activeTab === 'register' && 'active')} 
          onClick={() => setActiveTab('register')}
        >
          수리 등록
        </button>
        <button 
          className={cx(activeTab === 'history' && 'active')} 
          onClick={() => setActiveTab('history')}
        >
          수리 이력
        </button>
      </div>

      {activeTab === 'history' ? renderHistoryList() : (
      <>
      <div className={cx('repair-grid-container')}>
        
        <section className={cx('repair-box', 'left-form-panel')}>
          <h3>수리 등록</h3>
          <div className={cx('form-scroll-area')}>
            <div className={cx('form-row')}>
              <label>설비 선택 <span className={cx('required')}>*</span></label>
              <select name="machinery" value={repairForm.machinery} onChange={handleInputChange}>
                <option value="">설비를 선택하세요.</option>
                <option value="로봇 암 1호기">로봇 암 1호기</option>
                <option value="컨베이어 벨트">컨베이어 벨트</option>
                <option value="용접기 2호기">용접기 2호기</option>
                <option value="PLC 제어 패널">PLC 제어 패널</option>
              </select>
            </div>

            <div className={cx('form-flex-row')}>
              <div className={cx('form-row', 'flex-1')}>
                <label>고장 발생 일시 <span className={cx('required')}>*</span></label>
                <input type="date" name="breakdownDate" value={repairForm.breakdownDate} onChange={handleInputChange} />
              </div>
              <div className={cx('form-row', 'flex-1')}>
                <label>수리 시작 일시 <span className={cx('required')}>*</span></label>
                <input type="date" name="startDate" value={repairForm.startDate} onChange={handleInputChange} />
              </div>
            </div>

            <div className={cx('form-row')}>
              <label>수리 완료 일시</label>
              <input type="date" name="endDate" value={repairForm.endDate} onChange={handleInputChange} />
            </div>

            <div className={cx('form-row')}>
              <label>고장 원인 <span className={cx('required')}>*</span></label>
              <textarea name="reason" placeholder="고장 원인을 입력하세요." value={repairForm.reason} onChange={handleInputChange}></textarea>
            </div>

            <div className={cx('form-row')}>
              <label>수리 내용 <span className={cx('required')}>*</span></label>
              <textarea name="content" placeholder="수리 내용을 컴마(,)로 구분하여 입력하세요. (예: 배선 점검, 팬 교체)" value={repairForm.content} onChange={handleInputChange}></textarea>
            </div>

            <div className={cx('form-row')}>
              <label>수리 담당자 <span className={cx('required')}>*</span></label>
              <input type="text" name="assignee" placeholder="담당자 이름을 입력하세요." value={repairForm.assignee} onChange={handleInputChange} />
            </div>
          </div>

          <div className={cx('form-actions-btn')}>
            <button className={cx('btn-clear')} onClick={handleClearForm}>초기화</button>
            <button className={cx('btn-save')} onClick={handleSave}>저장</button>
          </div>
        </section>

        <div className={cx('right-double-panel')}>
          
          <section className={cx('repair-box', 'right-history-panel')}>
            <div className={cx('panel-header-inline')}>
              <h3>최근 수리 이력</h3>
              <button className={cx('btn-text-more')} onClick={() => setActiveTab('history')}>전체 이력 보기 &gt;</button>
            </div>
            
            <div className={cx('repair-table-wrapper')}>
              <table className={cx('repair-mini-table')}>
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>설비명</th>
                    <th>고장유형</th>
                    <th>수리일</th>
                    <th>담당자</th>
                    <th>상태</th>
                    <th>작업</th>
                  </tr>
                </thead>
                <tbody>
                  {historyLogs.map((log) => (
                    <tr key={log.id} onClick={() => handleRowClick(log)} className={cx('clickable-row')}>
                      <td>{log.id}</td>
                      <td className={cx('text-bold')}>{log.name}</td>
                      <td>{log.type}</td>
                      <td>{log.date}</td>
                      <td>{log.manager}</td>
                      <td>
                        <span className={cx('badge-status', log.status === '완료' ? 'success' : 'progress')}>
                          {log.status}
                        </span>
                      </td>
                      <td><button className={cx('btn-table-view')} onClick={(event) => handleOpenDetail(log, event)}>보기</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cx('repair-box', 'right-detail-panel')}>
            <h3>선택된 수리 내역 상세</h3>
            
            {selectedDetail ? (
              <div className={cx('detail-info-grid')}>
                <div className={cx('detail-item')}><span className={cx('label')}>설비명</span><span className={cx('val')}>{selectedDetail.name}</span></div>
                <div className={cx('detail-item')}><span className={cx('label')}>수리 담당자</span><span className={cx('val')}>{selectedDetail.manager}</span></div>
                <div className={cx('detail-item')}><span className={cx('label')}>수리 상태</span><span className={cx('val')}>{selectedDetail.status}</span></div>
                <div className={cx('detail-item', 'full-width')}><span className={cx('label')}>고장 원인</span><span className={cx('val', 'text-block')}>{selectedDetail.reason}</span></div>
                <div className={cx('detail-item', 'full-width')}><span className={cx('label')}>수리 내용</span><span className={cx('val', 'text-block')}>{selectedDetail.content}</span></div>
              </div>
            ) : (
              <div className={cx('no-select-msg')}>목록에서 항목을 선택하면 상세 정보를 확인할 수 있습니다.</div>
            )}
          </section>
          
        </div>
      </div>
      </>
      )}

      {renderRepairModal()}
    </div>
  );
};

export default PlcStatus;