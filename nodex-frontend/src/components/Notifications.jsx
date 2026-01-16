import { useEffect, useState } from "react";
import api from "../api/axios";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("notifications/")
      .then(res => {
        setNotifications(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>🔔 Notifications</h3>

      {notifications.length === 0 && <p>No notifications</p>}

      <ul>
        {notifications.map(n => (
          <li key={n.id}>
            {n.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
