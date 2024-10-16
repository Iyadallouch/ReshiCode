import React, { useState, useRef } from "react";
import "./OldCode.css";
import { FaCheck } from "react-icons/fa";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
export default function OldCode({ date, code, room, language }) {
  const [isCopied, setIsCopied] = useState(false);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", options)
      .replace(/(\w+)\s(\d+),\s(\d+)/, "$2-$1-$3");
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000); // Reset after 2 seconds
    });
  };
  const getLanguageExtension = () => {
    console.log(language);
    switch (language) {
      case "javascript":
        return javascript({ jsx: true });
      case "python":
        return python();
      case "java":
        return java();
      case "cpp":
        return cpp();
      default:
        return javascript(); // Default to JavaScript if no match
    }
  };
  return (
    <div className="oldcode-card">
      <div className="oldcode-copy-container">
        <button className="oldcode-copy-button" onClick={handleCopy}>
          {isCopied ? (
            <>
              Copied <FaCheck style={{ marginLeft: "8px" }} />
            </>
          ) : (
            "Copy Code"
          )}
        </button>
      </div>
      <div className="oldcode-paragraph">
        <CodeMirror
          value={code}
          height="200px"
          theme={vscodeDark}
          extensions={[getLanguageExtension()]}
          editable={false} // Set editable to false to make it uneditable
          className="oldcode-code-mirror"
        />
      </div>

      <hr className="oldcode-hr" />
      <div className="oldcode-info-container">
        <div className="oldcode-date">{formatDate(date)}</div>
        <div className="oldcode-date">{room}</div>
        <div className="oldcode-date">
          {language === "cpp" ? "C++" : language}
        </div>
      </div>
    </div>
  );
}
