import JsEditor from "components/Editors/js";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState } from "react";
import * as monaco from "monaco-editor";
import { FormMaker } from "components/FormMaker";
function JavaScriptManagement() {
  const [code, setCode] = useState();
  const model = monaco.editor.createModel(
    `return {
      onInitialize: () => { },
      afterRender: () => { },
      onSubmit: () => { },
      afterSubmit: () => { },
      methods: {
        test: () => {
          alert("hahaha")
        }
      },
      buildTree: [
        {
          component: "Button",
          props: {
            color: "success",
            onClick: this.test
          },
          children: [
            "hello"
          ]
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
      <FormMaker model={code} />
      <JsEditor
        codeModel={model}
        onChange={(c) => {
          try {
            let f = new Function(c)();
            setCode(f);
          } catch (e) {
          }
        }}
      />
    </DashboardLayout>
  );
}

export default JavaScriptManagement;
