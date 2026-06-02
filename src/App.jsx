import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* 로그인 페이지 */}
        <Route path="/" element={<Login />} />

        {/* 대시보드 및 하위 메뉴 페이지들 */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/monitoring" element={<Dashboard />} />
        <Route path="/plc" element={<Dashboard />} />
        <Route path="/alert" element={<Dashboard />} />
        <Route path="/settings" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;