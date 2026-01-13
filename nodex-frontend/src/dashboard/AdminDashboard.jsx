import { useEffect, useState } from "react";
import api from "../api/axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function AdminDashboard() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [technicianFilter, setTechnicianFilter] = useState("");
  const [technicians, setTechnicians] = useState([]);


  useEffect(() => {
  const fetchIssues = async () => {
    try {
      const params = {};
      if (statusFilter) params.status = statusFilter;
      if (technicianFilter) params.technician = technicianFilter;

      const res = await api.get("issues/", { params });
      setIssues(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load issues");
    } finally {
      setLoading(false); // ✅ ALWAYS stop loading
    }
  };

  fetchIssues();
}, [statusFilter, technicianFilter]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Prepare analytics data
  const totalIssues = issues.length;
  const resolvedCount = issues.filter(issue => issue.status === "resolved").length;
  const unresolvedCount = issues.filter(issue => issue.status !== "resolved").length;

  // Issues per technician
  const techMap = {};
  issues.forEach(issue => {
    if (issue.assigned_to) {
      techMap[issue.assigned_to] = (techMap[issue.assigned_to] || 0) + 1;
    }
  });
  const issuesPerTechnician = Object.keys(techMap).map(key => ({
    technician: key,
    count: techMap[key]
  }));

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      <h3>Filters</h3>

        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="open">Open</option>
          <option value="assigned">Assigned</option>
          <option value="resolved">Resolved</option>
        </select>

        <select value={technicianFilter} onChange={e => setTechnicianFilter(e.target.value)}>
          <option value="">All Technicians</option>
          {technicians.map(t => (
            <option key={t.id} value={t.id}>
              {t.username}
            </option>
          ))}
        </select>

      <div style={{ marginBottom: "20px" }}>
        <h3>Total Issues: {totalIssues}</h3>
      </div>

      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        <div>
          <h3>Resolved vs Unresolved</h3>
          <ResponsiveContainer width={300} height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: "Resolved", value: resolvedCount },
                  { name: "Unresolved", value: unresolvedCount }
                ]}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                <Cell key="resolved" fill={COLORS[0]} />
                <Cell key="unresolved" fill={COLORS[1]} />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3>Issues per Technician</h3>
          <ResponsiveContainer width={400} height={300}>
            <BarChart data={issuesPerTechnician}>
              <XAxis dataKey="technician" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
