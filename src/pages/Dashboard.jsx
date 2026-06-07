import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../css/dashboard.module.css";
import Monitoring from "./Monitoring";
import PlcStatus from "./PLC";
import AlertLog from "./Alert";


const cx = (...classNames) =>
    classNames
        .filter(Boolean)
        .map((className) => styles[className])
        .join(" ");


const IconDashboard = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
    </svg>
);
const IconMonitor = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);
const IconPLC = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="10" x2="6" y2="14" />
        <line x1="18" y1="10" x2="18" y2="14" />
    </svg>
);
const IconAlert = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);
const IconUser = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
    </svg>
);
const IconSettings = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
);
const IconLogout = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

const menuByPath = {
    "/dashboard": "dashboard",
    "/monitoring": "monitoring",
    "/plc": "plc",
    "/alert": "alertLog",
    "/settings": "settings",
};

const pathByMenu = {
    dashboard: "/dashboard",
    monitoring: "/monitoring",
    plc: "/plc",
    alertLog: "/alert",
    settings: "/settings",
};

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();


    const userName = location.state?.username || "홍길동";

    const activeMenu = menuByPath[location.pathname] || "dashboard";
    const [currentTime, setCurrentTime] = useState(new Date());
    const [alerts] = useState([
        {
            id: 1,
            message: "위험 구역 01 진입 감지",
            time: "2025-05-20 09:29:12",
            type: "danger",
            isRead: false,
        },
        {
            id: 2,
            message: "위험 구역 01 진입 감지",
            time: "2025-05-20 09:29:12",
            type: "danger",
            isRead: false,
        },
        {
            id: 3,
            message: "위험 구역 01 진입 감지",
            time: "2025-05-20 09:29:12",
            type: "danger",
            isRead: false,
        },
        {
            id: 4,
            message: "위험 구역 01 진입 감지",
            time: "2025-05-20 09:29:12",
            type: "danger",
            isRead: false,
        },
        {
            id: 5,
            message: "위험 구역 01 진입 감지",
            time: "2025-05-20 09:29:12",
            type: "danger",
            isRead: false,
        },{
            id: 6,
            message: "위험 구역 01 진입 감지",
            time: "2025-05-20 09:29:12",
            type: "danger",
            isRead: false,
        },{
            id: 7,
            message: "위험 구역 01 진입 감지",
            time: "2025-05-20 09:29:12",
            type: "danger",
            isRead: false,
        },
    ]);

    const unreadCount = alerts.filter((alert) => !alert.isRead).length;

    const handleLogout = () => {
        navigate("/");
    };

    const handleMenuClick = (menu) => {
        navigate(pathByMenu[menu], { state: { username: userName } });
    };

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        const week = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
        return `${y}-${m}-${d} (${week})`;
    };

    const formatTime = (date) =>
        date.toLocaleTimeString("en-GB", { hour12: false });

    const headerTitles = {
        dashboard: { title: "메인 대시보드" },
        monitoring: { title: "실시간 모니터링" },
        plc: { title: "설비 수리 관리" },
        alertLog: { title: "위험 알림 로그" },
        settings: { title: "시스템 설정" },
    };

    const renderDashboardContent = () => (
        <>
            <section className={cx("summary-section")}>
                <div className={cx("summary-card")}>
                    <span className={cx("card-label")}>작업 상태</span>
                    <div className={cx("card-value-box")}>
                        <div
                            className={cx("card-icon", "blue")}
                            style={{
                                color: "#174275",
                                backgroundColor: "#f0f4ff",
                                padding: "8px",
                                borderRadius: "10px",
                            }}
                        >
                            <IconSettings />
                        </div>
                        <span className={cx("card-value")}>진행 중</span>
                    </div>
                    <span className={cx("card-subtext")}>
                        작업 허가번호: W-2025-0520-001
                    </span>
                </div>
                <div className={cx("summary-card")}>
                    <span className={cx("card-label")}>작업자 수</span>
                    <div className={cx("card-value-box")}>
                        <div
                            className={cx("card-icon", "blue")}
                            style={{
                                color: "#174275",
                                backgroundColor: "#f0f4ff",
                                padding: "8px",
                                borderRadius: "10px",
                            }}
                        >
                            <IconUser />
                        </div>
                        <span className={cx("card-value")}>
                            2 /{" "}
                            <span style={{ color: "#999", fontSize: "18px" }}>
                                5명
                            </span>
                        </span>
                    </div>
                    <span className={cx("card-subtext")}>
                        위험구역 허용 인원: 5명
                    </span>
                </div>
                <div className={cx("summary-card")}>
                    <span className={cx("card-label")}>위험 알림</span>
                    <div className={cx("card-value-box")}>
                        <div
                            className={cx("card-icon", "orange")}
                            style={{
                                color: "#ff9c12",
                                backgroundColor: "#fff7e6",
                                padding: "8px",
                                borderRadius: "10px",
                            }}
                        >
                            <IconAlert />
                        </div>
                        <span className={cx("card-value")}>
                            {unreadCount}{" "}
                            <span style={{ fontSize: "16px", color: "#999" }}>
                                건
                            </span>
                        </span>
                    </div>
                    <span className={cx("card-subtext")}>미확인 알림 수</span>
                </div>
                <div className={cx("summary-card")}>
                    <span className={cx("card-label")}>설비 상태 (PLC)</span>
                    <div className={cx("card-value-box")}>
                        <div
                            className={cx("card-icon", "green")}
                            style={{
                                color: "#52c41a",
                                backgroundColor: "#f6ffed",
                                padding: "8px",
                                borderRadius: "10px",
                            }}
                        >
                            <IconPLC />
                        </div>
                        <span className={cx("card-value")}>정상</span>
                    </div>
                    <span className={cx("card-subtext")}>설비 가동 중</span>
                </div>
                <div className={cx("summary-card")}>
                    <span className={cx("card-label")}>위험 구역</span>
                    <div className={cx("card-value-box")}>
                        <div
                            className={cx("card-icon", "purple")}
                            style={{
                                color: "#722ed1",
                                backgroundColor: "#f9f0ff",
                                padding: "8px",
                                borderRadius: "10px",
                            }}
                        >
                            <IconMonitor />
                        </div>
                        <span className={cx("card-value")}>
                            2{" "}
                            <span style={{ fontSize: "16px", color: "#999" }}>
                                개
                            </span>
                        </span>
                    </div>
                    <span className={cx("card-subtext")}>설정된 위험 구역</span>
                </div>
            </section>

            <section className={cx("middle-section")}>
                <div
                    className={cx("cctv-container")}
                    style={{
                        borderRadius: "6px",
                        border: "none",
                        "boxShadow": "no",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "20px",
                        }}
                    >
                        <h3 style={{ fontSize: "18px", fontWeight: "700" }}>
                            실시간 CCTV 모니터링
                        </h3>
                        <span
                            style={{
                                fontSize: "12px",
                                color: "#174275",
                                fontWeight: "700",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                            }}
                        >
                            <span
                                style={{
                                    width: "8px",
                                    height: "8px",
                                    backgroundColor: "#174275",
                                    borderRadius: "50%",
                                }}
                            ></span>{" "}
                            실시간
                        </span>
                    </div>
                    <div
                        className={cx("cctv-screen")}
                        style={{
                            borderRadius: "6px",
                            border: "none",
                            "boxShadow": "0 4px 12px rgba(0, 0, 0, 0.03)",
                        }}
                    >
                        <div style={{ texttext: "center" }}>
                            <svg
                                width="64"
                                height="64"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#ddd"
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                <circle cx="12" cy="13" r="4" />
                            </svg>
                            <p style={{ marginTop: "15px", fontSize: "14px" }}>
                                카메라 화면이 여기에 표시됩니다.
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className={cx("recent-alerts")}
                    style={{
                        borderRadius: "6px",
                        border: "none",
                        "boxShadow": "0 4px 12px rgba(0, 0, 0, 0.03)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "20px",
                        }}
                    >
                        <h3 style={{ fontSize: "18px", fontWeight: "700" }}>
                            최근 알림
                        </h3>
                        
                    </div>
                    <div className={cx("alert-list")}>
                        {alerts.map((alert) => (
                            <div
                                key={alert.id}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "15px 0",
                                    borderBottom: "1px solid #f5f7fa",
                                    gap: "15px",
                                }}
                            >
                                <div
                                    style={{
                                        color:
                                            alert.type === "danger"
                                                ? "#ff4d4f"
                                                : "#174275",
                                        backgroundColor:
                                            alert.type === "danger"
                                                ? "#fff1f0"
                                                : "#f0f4ff",
                                        padding: "10px",
                                        borderRadius: "50%",
                                    }}
                                >
                                    <IconAlert />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            color: "#333",
                                            marginBottom: "4px",
                                        }}
                                    >
                                        {alert.message}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: "12px",
                                            color: "#999",
                                        }}
                                    >
                                        {alert.time}
                                    </p>
                                </div>
                                <span
                                    style={{
                                        fontSize: "11px",
                                        fontWeight: "700",
                                        padding: "4px 10px",
                                        borderRadius: "6px",
                                        backgroundColor: alert.isRead
                                            ? "#f5f5f5"
                                            : "#fff1f0",
                                        color: alert.isRead
                                            ? "#999"
                                            : "#ff4d4f",
                                    }}
                                >
                                    {alert.isRead ? "확인" : "미확인"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );

    return (
        <div className={cx("dashboard-container")}>
            <aside className={cx("sidebar")}>
                <div 
                    className={cx("sidebar-logo")} 
                    onClick={() => handleMenuClick("dashboard")}
                    style={{ cursor: "pointer" }}
                >
                    <svg
                        width="50"
                        height="50"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#174275"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <div className={cx("logo-text")}>
                        <h1
                            className={cx("brand-name")}
                            style={{ fontSize: "35px", lineHeight: "1.2" }}
                        >
                            <span className={cx("brand-zon")}>ZON</span>
                            <span className={cx("brand-iq")}>IQ</span>
                        </h1>
                        <p
                            className={cx("brand-subtitle")}
                            style={{ fontSize: "12px", whiteSpace: "nowrap" }}
                        >
                            작업안전 통합제어 시스템
                        </p>
                    </div>
                </div>
                <nav className={cx("sidebar-nav")}>
                    <div
                        className={cx(
                            "nav-item",
                            activeMenu === "dashboard" && "active"
                        )}
                        onClick={() => handleMenuClick("dashboard")}
                    >
                        <IconDashboard /> <span>메인 대시보드</span>
                    </div>
                    <div
                        className={cx(
                            "nav-item",
                            activeMenu === "monitoring" && "active"
                        )}
                        onClick={() => handleMenuClick("monitoring")}
                    >
                        <IconMonitor /> <span>실시간 모니터링</span>
                    </div>
                    <div
                        className={cx(
                            "nav-item",
                            activeMenu === "plc" && "active"
                        )}
                        onClick={() => handleMenuClick("plc")}
                    >
                        <IconPLC /> <span>설비 수리 관리</span>
                    </div>
                    <div
                        className={cx(
                            "nav-item",
                            activeMenu === "alertLog" && "active"
                        )}
                        onClick={() => handleMenuClick("alertLog")}
                    >
                        <IconAlert /> <span>위험 알림 로그</span>
                    </div>
                </nav>

                <div className={cx("sidebar-footer")}>
                    <div
                        className={cx("nav-item", "logout")}
                        onClick={handleLogout}
                        style={{ cursor: "pointer" }}
                    >
                        <IconLogout /> <span>로그아웃</span>
                    </div>
                </div>
            </aside>

            <main className={cx("main-content")}>
                <header className={cx("content-header")}>
                    <div className={cx("header-left")}>
                        <h2>{headerTitles[activeMenu]?.title}</h2>
                        <p>{headerTitles[activeMenu]?.sub}</p>
                    </div>
                    <div className={cx("header-right")}>
                        <div
                            className={cx("user-profile")}
                            style={{
                                borderRadius: "6px",
                                border: "none",
                                "boxShadow": "0 4px 12px rgba(0, 0, 0, 0.03)",
                            }}
                        >
                            <div
                                className={cx("profile-info")}
                                style={{ borderRadius: "6px" }}
                            >
                                <span className={cx("user-name")}>
                                    {userName}님
                                </span>
                                <span className={cx("user-role")}>작업자</span>
                            </div>
                        </div>
                        <div
                            className={cx("header-clock")}
                            style={{
                                borderRadius: "6px",
                                border: "none",
                                "boxShadow": "0 4px 12px rgba(0, 0, 0, 0.03)",
                            }}
                        >
                            <span className={cx("sheader-date")}>
                                {formatDate(currentTime)}
                            </span>
                            <span className={cx("header-time")}>
                                {formatTime(currentTime)}
                            </span>
                        </div>
                    </div>
                </header>

                {activeMenu === "dashboard" && renderDashboardContent()}
                {activeMenu === "monitoring" && <Monitoring alerts={alerts} />}
                {activeMenu === "plc" && <PlcStatus />}
                {activeMenu === "alertLog" && <AlertLog />}

                <footer className={cx("dashboard-footer")}>
                    <p className={cx("copyright")}>© 2025 ZONIQ. All rights reserved.</p>
                </footer>
            </main>
        </div>
    );
};

export default Dashboard;