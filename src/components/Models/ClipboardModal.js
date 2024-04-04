// DeleteConfirmationModal.js
import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import "./Model.css";

export default function ClipboardModal({
  handleClipboardShowModal,
  handleCloseClipboardModal,
  clipboardMessageModal
}) {
  return (
    <>
      {handleClipboardShowModal && (
        <div className="modal-visible">
          <div className="modal-content">
            <div className="close-btn-wrapper">
              <IoMdCloseCircle
                size={30}
                color={"#508D69"}
                name="times"
                className="close-btn"
                onClick={handleCloseClipboardModal}
              />
            </div>
            <h2 className="modal-title">Clipboard of your food items list</h2>
            <p className="modal-message">{clipboardMessageModal}</p>
            <div style={{display:'flex', justifyContent:"center"}}>
              <button className="cancel-btn" onClick={handleCloseClipboardModal}>
                <RxCrossCircled />
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
