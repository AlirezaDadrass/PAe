import JsEditor from "components/Editors/js";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState } from "react";
import * as monaco from "monaco-editor";
function JavaScriptManagement() {
  const [code, setCode] = useState();

  const model = monaco.editor.createModel(
    `const component = {
      onInitialize: () => { },
      afterRender: () => { },
      onSubmit: () => { },
      afterSubmit: () => { },
      methodes: {},
      buildTree: [
        {
          component: "TextField",
          propes: {
            color: "success"
          }
        }
      ]
    }`,
    "javascript"
  );
  return (
    <DashboardLayout
      style={{ padding: 0, display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <DashboardNavbar />
      <JsEditor
        codeModel={model}
        onChange={(c) => {
          setCode(c);
        }}
      />
    </DashboardLayout>
  );
}

export default JavaScriptManagement;
