import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      // Call the Django JWT login endpoint
      const res = await api.post("/token/", { username, password });

      // Save JWT tokens in localStorage
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      // --- STEP 1: Role-based dashboard navigation ---
      const userRole = res.data.user?.role; // assuming backend sends user info
      switch (userRole) {
        case "ADMIN":
          navigate("/dashboard/admin");
          break;
        case "TECHNICIAN":
          navigate("/dashboard/technician");
          break;
        case "REPORTER":
          navigate("/dashboard/reporter");
          break;
        default:
          navigate("/dashboard"); // fallback
      }

      setError(""); // Clear any previous error
    } catch (err) {
      console.error("Login failed:", err);

      if (err.response && err.response.status === 401) {
        setError("Invalid username or password.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button type="submit" style={{ padding: "8px 16px" }}>Login</button>
      </form>
    </div>
  );
}

export default Login;
