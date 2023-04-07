import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import SqlEditor from "components/Editors/sql";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function DatabaseDesign() {
  return (
    <DashboardLayout style={{ padding: 0, display: "flex", flexDirection: "column", height: "100vh" }}>
      <DashboardNavbar />
      <SqlEditor />
    </DashboardLayout>
  );
}

export default DatabaseDesign;
