import { useState, useEffect } from "react";
import api from "../api/axios";

function ReporterDashboard() {
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage.getItem("access");

  // Fetch reporter's issues
  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      try {
        const res = await api.get("/issues/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setIssues(res.data);
      } catch (err) {
        console.error("Error fetching issues:", err);
        setError("Failed to load issues.");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [accessToken]);

  // Handle issue creation
  const handleCreateIssue = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError("Please fill in both title and description.");
      return;
    }

    try {
      const res = await api.post(
        "/issues/",
        { title, description },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setIssues((prev) => [...prev, res.data]); // Add new issue to list
      setTitle("");
      setDescription("");
      setError("");
    } catch (err) {
      console.error("Error creating issue:", err);
      setError("Failed to create issue.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto" }}>
      <h2>Reporter Dashboard</h2>

      {/* Create Issue Form */}
      <form onSubmit={handleCreateIssue} style={{ marginBottom: "20px" }}>
        <h3>Create New Issue</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <button type="submit" style={{ padding: "8px 16px" }}>
          Create Issue
        </button>
      </form>

      {/* Display Issues */}
      <h3>Your Issues</h3>
      {loading ? (
        <p>Loading issues...</p>
      ) : issues.length === 0 ? (
        <p>No issues created yet.</p>
      ) : (
        <ul>
          {issues.map((issue) => (
            <li key={issue.id} style={{ marginBottom: "10px" }}>
              <strong>{issue.title}</strong>
              <p>{issue.description}</p>
              <small>Status: {issue.status}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReporterDashboard;
