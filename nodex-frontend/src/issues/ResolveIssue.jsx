import api from "../api/axios";

function ResolveIssue({ issueId, onResolved }) {
  const handleResolve = async () => {
    try {
      await api.patch(`issues/${issueId}/`, {
        status: "resolved",
      });
      if (onResolved) onResolved();
      alert("Issue resolved");
    } catch (err) {
      console.error(err);
      alert("Failed to resolve issue");
    }
  };

  return (
    <button onClick={handleResolve} style={{ marginLeft: "10px" }}>
      Resolve
    </button>
  );
}

export default ResolveIssue;
