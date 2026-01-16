import IssueList from "../issues/IssueList";
import Notifications from "../components/Notifications";

function TechnicianDashboard() {
  return (
    <>
      <h1>Technician Dashboard</h1>
      <Notifications />
      <IssueList />
      {/* Resolve button comes next */}
    </>
  );
}

export default TechnicianDashboard;
