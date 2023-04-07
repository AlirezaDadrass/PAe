import * as monaco from "monaco-editor";
import { useEffect } from "react";
import { format } from "sql-formatter";
import sqlkeys from "./sqlkeys";

export default function SqlEditor(props) {
  useEffect(() => {
    const model = props.codeModel ?? monaco.editor.createModel("sql", "sql");

    monaco.languages.registerDocumentFormattingEditProvider("sql", {
      provideDocumentFormattingEdits(model, options) {
        var formatted = format(model.getValue(), {
          indent: " ".repeat(options.tabSize),
        });
        return [
          {
            range: model.getFullModelRange(),
            text: formatted,
          },
        ];
      },
    });
    monaco.languages.registerDocumentRangeFormattingEditProvider("sql", {
      provideDocumentRangeFormattingEdits(model, range, options) {
        var formatted = format(model.getValueInRange(range), {
          indent: " ".repeat(options.tabSize),
        });
        return [
          {
            range: range,
            text: formatted,
          },
        ];
      },
    });
    monaco.languages.registerCompletionItemProvider("sql", {
      resolveCompletionItem: async function (item) {
        lastPos = item;
      },

      provideCompletionItems: async function (model, position) {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        var word = model.getWordUntilPosition(position);
        var range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        let r = await fetch("http://localhost:3000/rpc/get_metadata", requestOptions);
        let rr = await r.json();

        let a = rr.map((m) => {
          return {
            label: m.name,
            kind:
              m.type == "routine"
                ? monaco.languages.CompletionItemKind.Function
                : m.type == "table"
                ? monaco.languages.CompletionItemKind.Class
                : m.type == "view"
                ? monaco.languages.CompletionItemKind.Class
                : m.type == "sequence"
                ? monaco.languages.CompletionItemKind.Struct
                : m.type == "column"
                ? monaco.languages.CompletionItemKind.Field
                : monaco.languages.CompletionItemKind.Module,
            detail: m.parent,
            insertText: m.name,
            range: range,
          };
        });

        return {
          suggestions: sqlkeys(range).concat(a),
        };
      },
    });

    const editor = monaco.editor.create(document.getElementById("ed1"), {
      model: model,
      value: "text",
      language: "javascript",
      automaticLayout: true,
      theme: "vs-dark",
    });
    editor.layout({});
    window.onresize = () => {
      console.log("Window resize");
      editor.layout({});
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        position: "relative",
        padding: "1rem",
        borderRadius: "10px",
        display: "block",
        flex: 1,
      }}
    >
      <div id="ed1" style={{ height: "100%" }}></div>
    </div>
  );
}
