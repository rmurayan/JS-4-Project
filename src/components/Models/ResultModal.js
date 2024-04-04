import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { GiConfirmed } from "react-icons/gi";
import { AiFillCaretRight } from "react-icons/ai";

export default function ResultModal({
  showModalResult,
  closeResultModal,
  searchText,
  filterList
}) {
  return (
    <>
      {showModalResult && (
        <div className="modal-visible">
          <div className="modal-content">
            <div className="close-btn-wrapper">
              <IoMdCloseCircle
                size={30}
                color={"#508D69"}
                name="times"
                className="close-btn"
                onClick={closeResultModal}
              />
            </div>
            <h2 className="modal-title">Search results for {searchText}</h2>
            <div className="confirm-message">
              {filterList.length === 0 && (
                <div className="result-message">
                  <GiConfirmed className="result-icon" /> 
                  <p>There is not results for {searchText}</p>
                </div>
              )}
              {filterList.length > 0 && (
                <ul className="search-list">
                  {filterList.map((item, index) => (
                    <li key={index} className="search-item">
                      <AiFillCaretRight /> {item.name} - {item.category}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
