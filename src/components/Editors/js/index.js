import * as monaco from "monaco-editor";
import { useEffect } from "react";
import { elm } from "./mui";

export default function JsEditor(props) {
  useEffect(() => {
    function createDependencyProposals(range) {
      // returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
      // here you could do a server side lookup

      return elm.map((m) => ({
        label: m.component,
        kind: monaco.languages.CompletionItemKind.Function,
        detail: "Material",
        documentation: m.doc,
        insertText: `"${m.component}"`,
        range: range,
      }));
    }
    monaco.languages.registerCompletionItemProvider("javascript", {
      provideCompletionItems: function (model, position) {
        // find out if we are completing a property in the 'dependencies' object.
        var textUntilPosition = model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });
        console.log(textUntilPosition);
        var match = textUntilPosition.match(/ component:/);
        if (!match) {
          return { suggestions: [] };
        }
        var word = model.getWordUntilPosition(position);
        var range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };
        return {
          suggestions: createDependencyProposals(range),
        };
      },
    });
    const model = props.codeModel ?? monaco.editor.createModel("js", "javascript");
    let editor = monaco.editor.create(document.getElementById("ed"), {
      model: model,
      value: "text",
      language: "javascript",
      automaticLayout: true,
      scrollBeyondLastLine: false,
      theme: "vs-dark",
    });
    editor.layout({});
    editor.getAction("editor.action.formatDocument").run();
    window.onresize = () => {
      console.log("Window resize");
      editor.layout({});
    };
    editor.onDidChangeModelContent((m) => {
      props.onChange(editor.getModel().getValue());
    });
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        padding: "1rem",
        borderRadius: "10px",
      }}
    >
      <div id="ed" style={{ height: "100%" }}></div>
    </div>
  );
}
