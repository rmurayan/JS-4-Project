// DeleteConfirmationModal.js
import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import "./Model.css";
import { MdEmail } from "react-icons/md";

export default function ProfileModal({
  email,
  showProfileModal,
  handleCloseProfileModal,
}) {
  return (
    <>
      {showProfileModal && (
        <div className="modal-visible">
          <div className="modal-content">
            <div className="close-btn-wrapper">
              <IoMdCloseCircle
                size={30}
                color={"#508D69"}
                name="times"
                className="close-btn"
                onClick={handleCloseProfileModal}
              />
            </div>
            <h2 className="modal-title">Profile Info</h2>
            <p className="confirm-message">
               <MdEmail/> {email}</p>
            <div style={{display:'flex', justifyContent:"center"}}>
              <button className="cancel-btn" onClick={handleCloseProfileModal}>
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
