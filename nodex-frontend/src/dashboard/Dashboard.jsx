import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminDashboard from "./AdminDashboard";
import TechnicianDashboard from "./TechnicianDashboard";
import ReporterDashboard from "./ReporterDashboard";

function Dashboard() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    api.get("users/me/")
      .then(res => setRole(res.data.role))
      .catch(err => console.error(err));
  }, []);

  if (!role) return <p>Loading dashboard...</p>;

  if (role === "ADMIN") return <AdminDashboard />;
  if (role === "TECHNICIAN") return <TechnicianDashboard />;
  return <ReporterDashboard />;
}

export default Dashboard;
