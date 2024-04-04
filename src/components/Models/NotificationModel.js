import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { GiConfirmed } from "react-icons/gi";

export default function NotificationModel({
  showNotificationModel,
  closeNotificationModel,
  notificationTitle,
  notificationMessage,
}) {
    console.log("notificationMessage",notificationMessage);
  return (
    <>
      {showNotificationModel && (
        <div className="modal-visible">
          <div className="modal-content">
            <div className="close-btn-wrapper">
              <IoMdCloseCircle
                size={30}
                color={"#508D69"}
                name="times"
                className="close-btn"
                onClick={closeNotificationModel}
              />
            </div>
            <h2 className="modal-title">
              Search results for {notificationTitle}
            </h2>
            <div className="confirm-message">
              <div className="result-message">
                <GiConfirmed className="result-icon" />
                <p> {notificationMessage}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
