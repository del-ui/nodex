import { useEffect, useState } from "react";
import api from "../api/axios";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    api.get("notifications/")
      .then(res => setNotifications(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h3>Notifications</h3>
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
