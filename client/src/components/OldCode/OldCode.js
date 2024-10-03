import React, { useState, useRef } from "react";
import "../OldCode/OldCode.css";
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
      <div className="oldcode-date">{formatDate(date)}</div>
      <h2>{room}</h2>
      <h2>{language}</h2>
      <hr className="oldcode-hr" />
      <button className="oldcode-copy-button" onClick={handleCopy}>
        {isCopied ? (
          <>
            Copied <FaCheck style={{ marginLeft: "8px" }} />
          </>
        ) : (
          "Copy Code"
        )}
      </button>
      <div ref={paragraphRef} className="oldcode-paragraph">
        {code.split('\n').map((line, index) => (
          <p key={index}>{line}</p> // Render each line in a new paragraph
        ))}
      </div>
    </div>
  );
}
