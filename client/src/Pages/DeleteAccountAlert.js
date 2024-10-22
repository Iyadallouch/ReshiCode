import React from "react";
import "../style/Alert.css"; // Import your CSS file

export default function DeleteAccountAlert({ show, onClose, onConfirm }) {
  if (!show) return null; // Don't render if not shown

  return (
    <div className="alert-custom-modal">
      <div className="alert-modal-dialog">
        <div className="modal-content">
          <div className="alert-modal-header">
            <h5 className="alert-modal-title">Confirm delete account</h5>
          </div>
          <div className="alert-modal-body">
            <p>Are you sure you want to delete your account?</p>
          </div>
          <div className="alert-modal-footer">
            <button
              type="button"
              className="alert-btn alert-btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="alert-btn alert-btn-primary"
              onClick={onConfirm}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
