import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./dashboard/AdminDashboard";
import Login from "./auth/Login";
import Dashboard from "./dashboard/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

