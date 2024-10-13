// Modal.js
import React from "react";
import "./Modal.css"; // Create this CSS file for styling

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-colla-overlay" onClick={onClose}>
      <div className="modal-colla-content" onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: "20px" }}>{message}</h2>
        <button className="modal-colla-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
