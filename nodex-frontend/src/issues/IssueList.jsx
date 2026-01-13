import { useEffect, useState } from "react";
import api from "../api/axios";
import ResolveIssue from "./ResolveIssue";
import AssignIssue from "./AssignIssue";



function IssueList({ refresh }) {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIssues = async () => {
      const token = localStorage.getItem("access");
      if (!token) {
        setError("You are not logged in or token is missing.");
        return;
      }

      try {
        const res = await api.get("issues/");
        setIssues(res.data);
        setError(""); // clear any previous error
      } catch (err) {
        console.error("Failed to fetch issues:", err);
        setError("Failed to fetch issues. Make sure you are logged in.");
      }
    };

    fetchIssues();
  }, [refresh]); // refresh triggers reload

  return (
    <div>
      <h2>Issues</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {issues.length === 0 && !error && <p>No issues yet</p>}
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <strong>{issue.title}</strong> — {issue.status}
            {!issue.assigned_to && (
              <AssignIssue
                issueId={issue.id}
                onAssigned={() => window.location.reload()}
              />
            )}
                {issue.status !== "resolved" && issue.assigned_to && (
                  <ResolveIssue
                    issueId={issue.id}
                    onResolved={() => window.location.reload()}
                  />
                )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IssueList;



