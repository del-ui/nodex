import { useState } from "react";
import api from "../api/axios";

function CreateIssue({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access");
    if (!token) {
      setError("You must be logged in to create an issue.");
      return;
    }

    try {
      await api.post("issues/", { title, description });
      setTitle("");
      setDescription("");
      setError("");
      if (onSuccess) onSuccess(); // refresh IssueList
      alert("Issue created successfully!");
    } catch (err) {
      console.error("Failed to create issue:", err);
      if (err.response && err.response.status === 401) {
        setError("Unauthorized: Please log in again.");
      } else {
        setError("Failed to create issue. Check console for details.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
      <h3>Create New Issue</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "300px", padding: "5px", marginBottom: "10px" }}
        />
      </div>
      <div>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ width: "300px", padding: "5px", marginBottom: "10px" }}
        />
      </div>
      <button type="submit" style={{ padding: "5px 15px" }}>Create Issue</button>
    </form>
  );
}

export default CreateIssue;
