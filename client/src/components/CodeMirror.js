import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css"; // Choose a theme
import "codemirror/mode/javascript/javascript"; // Change to your desired mode

const CodeEditor = () => {
  const [code, setCode] = useState("// Write your code here...");

  return (
    <CodeMirror
      value={code}
      options={{
        lineNumbers: true,
        mode: "javascript",
        theme: "material", // Choose a theme
      }}
      onBeforeChange={(editor, data, value) => {
        setCode(value);
      }}
    />
  );
};
export default CodeEditor;
