import React, { useState, useRef } from "react";
import "./OldCode.css";
import { FaCheck } from "react-icons/fa";

export default function OldCode({ date, code, room, language }) {
  const [isCopied, setIsCopied] = useState(false);
  const paragraphRef = useRef(null);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", options)
      .replace(/(\w+)\s(\d+),\s(\d+)/, "$2-$1-$3");
  };
  const handleCopy = () => {
    if (paragraphRef.current) {
      const textToCopy = paragraphRef.current.innerText;
      navigator.clipboard.writeText(textToCopy).then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 3000); // Reset after 2 seconds
      });
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
      <div ref={paragraphRef} className="oldcode-paragraph">
        {code.split("\n").map((line, index) => (
          <p key={index}>{line}</p> // Render each line in a new paragraph
        ))}
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
