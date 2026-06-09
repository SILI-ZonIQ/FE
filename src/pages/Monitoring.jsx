import styles from '../css/Monitoring.module.css';

const cx = (...classNames) => classNames.filter(Boolean).map((className) => styles[className]).join(' ');

const IconCamera = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const IconLoc = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;

const Monitoring = () => {

  const zones = [
    { id: 1, name: 'Zone A (용접실)', coords: '124.5, 45.2', status: '위험', color: '#ff4d4f' },
    { id: 2, name: 'Zone B (자재창고)', coords: '210.1, 88.4', status: '주의', color: '#faad14' },
    { id: 3, name: 'Zone C (조립라인)', coords: '15.8, 122.9', status: '안전', color: '#52c41a' },
    { id: 4, name: 'Zone A (용접실)', coords: '124.5, 45.2', status: '위험', color: '#ff4d4f' },
    { id: 5, name: 'Zone B (자재창고)', coords: '210.1, 88.4', status: '주의', color: '#faad14' },
    { id: 6, name: 'Zone C (조립라인)', coords: '15.8, 122.9', status: '안전', color: '#52c41a' },
    { id: 7, name: 'Zone D (생산라인)', coords: '95.2, 67.8', status: '위험', color: '#ff4d4f' },
    { id: 8, name: 'Zone B (자재창고)', coords: '210.1, 88.4', status: '주의', color: '#faad14' },
    { id: 9, name: 'Zone C (조립라인)', coords: '15.8, 122.9', status: '안전', color: '#52c41a' },
    { id: 10, name: 'Zone E (저장소)', coords: '180.7, 145.3', status: '주의', color: '#faad14' },
    { id: 11, name: 'Zone F (출입구)', coords: '30.1, 200.5', status: '안전', color: '#52c41a' },
    { id: 12, name: 'Zone G (설비실)', coords: '60.4, 95.6', status: '위험', color: '#ff4d4f' },
    { id: 13, name: 'Zone H (관리실)', coords: '140.2, 180.1', status: '주의', color: '#faad14' },
    { id: 14, name: 'Zone I (휴게실)', coords: '220.8, 50.3', status: '안전', color: '#52c41a' }
  ];

  return (
    <div className={cx('monitoring-content')}>
      <div className={cx('monitoring-layout')}>

        <div className={cx('main-cctv-area')}>
          <div className={cx('cctv-header')}>
            <span className={cx('cctv-title')}>Main CCTV - Factory Floor A</span>
            <span className={cx('live-tag')}>LIVE</span>
          </div>
          <div className={cx('cctv-large-view')}>
            <div className={cx('overlay-info')}>
              <p>REC 00:45:12</p>
              <p>CAM 01</p>
            </div>
            <div className={cx('cctv-placeholder')}>
              <IconCamera />
              <p>실시간 영상 스트리밍 중...</p>
            </div>
          </div>
        </div>

        <div className={cx('side-data-area')}>
          <section className={cx('data-card', 'zone-card')}>
            <h3 className={cx('card-title')}>위험 구역 현황</h3>

            <div className={cx('table-scroll-container')}>
              <div className={cx('zone-table')}>
                <div className={cx('table-header')}>
                  <span className={cx('h-cell')}>구역 이름</span>
                  <span className={cx('h-cell')}>좌표</span>
                  <span className={cx('h-cell', 'text-right')}>상태</span>
                </div>
                <div className={cx('table-body')}>
                  {zones.map(zone => (
                    <div key={zone.id} className={cx('table-row')}>
                      <span className={cx('z-name')}>{zone.name}</span>
                      <span className={cx('z-coords')}><IconLoc /> {zone.coords}</span>
                      <span className={cx('z-status')} style={{ color: zone.color }}>{zone.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </section>
        </div>

      </div>
    </div>
  );
};

export default Monitoring;