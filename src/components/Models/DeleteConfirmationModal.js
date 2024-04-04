// DeleteConfirmationModal.js
import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { GiConfirmed } from "react-icons/gi";
import { RxCrossCircled } from "react-icons/rx";

export default function DeleteConfirmationModal({
  showModalDelete,
  closeDeleteModal,
  deleteItemName,
  handleDeleteItem
}) {
  return (
    <>
      {showModalDelete && (
        <div className="modal-visible">
          <div className="modal-content">
            <div className="close-btn-wrapper">
              <IoMdCloseCircle
                size={30}
                color={"#508D69"}
                name="times"
                className="close-btn"
                onClick={closeDeleteModal}
              />
            </div>
            <h2 className="modal-title">Confirm Deletion</h2>
            <p className="confirm-message">
              Are you sure you want to delete {deleteItemName}?
            </p>
            <div className="modal-btn-delete">
              <button className="done-btn" onClick={handleDeleteItem}>
                <GiConfirmed /> Yes
              </button>
              <button className="cancel-btn" onClick={closeDeleteModal}>
                <RxCrossCircled />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
