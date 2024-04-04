// DeleteConfirmationModal.js
import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import "./Model.css";

export default function SyncModal({
  handleSyncShowModal,
  handleCloseSyncModal,
  syncMessageModal
}) {
  return (
    <>
      {handleSyncShowModal && (
        <div className="modal-visible">
          <div className="modal-content">
            <div className="close-btn-wrapper">
              <IoMdCloseCircle
                size={30}
                color={"#508D69"}
                name="times"
                className="close-btn"
                onClick={handleCloseSyncModal}
              />
            </div>
            <h2 className="modal-title">Sync the list of items to the Cloud.</h2>
            <p className="modal-message">{syncMessageModal? syncMessageModal:"Loading"}</p>
            <div style={{display:'flex', justifyContent:"center"}}>
              <button className="cancel-btn" onClick={handleCloseSyncModal}>
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
