import React from 'react'
import "../OldCode/OldCode.css";

export default function OldCode() {
   const copyToClipboard = () => {
    const paragraph = document.getElementById('oldcode-paragraph').innerText;
    navigator.clipboard.writeText(paragraph);
    alert('Code copied to clipboard!');
  };

  return (
    <div className="oldcode-card">
      <div className="oldcode-date">July 28, 2024</div>
      <hr className="oldcode-hr" />
      <button className="oldcode-copy-button" onClick={copyToClipboard}>Copy Code</button>
      <p id="oldcode-paragraph" className="oldcode-paragraph">
        This is a small paragraph under the date, providing some additional information.
      </p>
    </div>
  );
};
