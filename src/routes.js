// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";

// @mui icons
import Icon from "@mui/material/Icon";
import DatabaseDesign from "layouts/database-design";
import JavaScriptManagement from "layouts/javascript-management";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Sql Editor",
    key: "dbd",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/dbd",
    component: <DatabaseDesign />,
  },
  {
    type: "collapse",
    name: "Javascript Management",
    key: "jsm",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/jsm",
    component: <JavaScriptManagement />,
  },
];

export default routes;
