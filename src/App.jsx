import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Monitoring from "./pages/Monitoring";

function App() {
  return (
    <Router>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/monitoring"
          element={<Monitoring />}
        />

      </Routes>

    </Router>
  );
}

export default App;