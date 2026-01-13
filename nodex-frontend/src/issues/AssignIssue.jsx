import { useEffect, useState } from "react";
import api from "../api/axios";

function AssignIssue({ issueId, onAssigned }) {
  const [technicians, setTechnicians] = useState([]);
  const [selectedTech, setSelectedTech] = useState("");

  useEffect(() => {
    api.get("users/technicians/")
      .then(res => setTechnicians(res.data))
      .catch(err => console.error(err));
  }, []);

  const assign = async () => {
    if (!selectedTech) return alert("Select a technician");

    try {
      await api.patch(`issues/${issueId}/`, {
        assigned_to: selectedTech,
        status: "assigned",
      });
      alert("Issue assigned");
      onAssigned();
    } catch (err) {
      alert("Failed to assign issue");
    }
  };

  return (
    <div>
      <select onChange={(e) => setSelectedTech(e.target.value)}>
        <option value="">Assign technician</option>
        {technicians.map(t => (
          <option key={t.id} value={t.id}>
            {t.username}
          </option>
        ))}
      </select>
      <button onClick={assign}>Assign</button>
    </div>
  );
}

export default AssignIssue;


