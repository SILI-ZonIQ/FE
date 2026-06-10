import styles from '../css/Monitoring.module.css';

const API_URL = "http://172.20.10.4:8000";

const cx = (...classNames) =>
  classNames.filter(Boolean).map((className) => styles[className]).join(' ');

const IconCamera = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const IconLoc = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const Monitoring = ({ latestEvent }) => {
  const zones = [
    {
      id: 1,
      name: '위험구역',
      coords: 'WinApp 드래그 설정',
      status: latestEvent ? '위험' : '안전',
      color: latestEvent ? '#ff4d4f' : '#52c41a'
    }
  ];

  const videoUrl = latestEvent?.video_path
    ? `${API_URL}/${latestEvent.video_path}`
    : '';

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
              <p>{latestEvent ? `REC ${latestEvent.event_time}` : 'REC 대기중'}</p>
              <p>CAM 01</p>
            </div>

            {videoUrl ? (
              <video
                controls
                muted
                autoPlay
                loop
                src={videoUrl}
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#000',
                  objectFit: 'contain',
                  borderRadius: '6px'
                }}
              />
            ) : (
              <div className={cx('cctv-placeholder')}>
                <IconCamera />
                <p>최근 위험 영상이 없습니다.</p>
              </div>
            )}
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