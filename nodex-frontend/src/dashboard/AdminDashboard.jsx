import IssueList from "../issues/IssueList";
import CreateIssue from "../issues/CreateIssue";
import { useState } from "react";
/*
function AdminDashboard() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>NODEX Admin Dashboard</h1>
      <CreateIssue onSuccess={() => setRefresh(!refresh)} />
      <IssueList refresh={refresh} />
    </div>
  );


}
*/

function AdminDashboard() {
  return (
    <>
      <h1>Admin Dashboard</h1>
      <IssueList />
      {/* Analytics next */}
    </>
  );
}



export default AdminDashboard;

