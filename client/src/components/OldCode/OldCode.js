import React, { useState, useRef  } from 'react'
import "../OldCode/OldCode.css";
import { FaCheck } from 'react-icons/fa';


export default function OldCode() {
  const [isCopied, setIsCopied] = useState(false);
  const paragraphRef = useRef(null);

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
      <div className="oldcode-date">July 28, 2024</div>
      <hr className="oldcode-hr" />
      <button className="oldcode-copy-button" onClick={handleCopy}>
        {isCopied ? (
          <>
            Copied <FaCheck style={{ marginLeft: '8px' }} />
          </>
        ) : (
          "Copy Code"
        )}
      </button>
      <p ref={paragraphRef} className="oldcode-paragraph">This is a small paragraph under the date iyad test hellooo.</p>
    </div>
  );
};


