import React, { useState } from "react";
import Logo from "../../logo.png";
import "./Home.css";
import { FaSearch } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { MdOutlineCloudSync } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import ProfileModal from "../Models/ProfileModal";
import SyncModal from "../Models/SyncModal";
import ClipboardModal from "../Models/ClipboardModal";
import ResultModal from "../Models/ResultModal";

export default function Header({
  userEmail,
  totalItems,
  handelSyncList,
  syncMessageModal,
  foodItems,
}) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [showClipboradModal, setShowClipboradModal] = useState(false);
  const [clipboardMessageModal, setClipboardMessageModal] = useState("");
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultFilter, setResultFilter] = useState([]);
  const [searchText, SetsearchText] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook
  const closeResultModal = () => {
    setShowResultModal(false);
  };
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Copied to clipboard:", text);
      setClipboardMessageModal(
        "Your items list has been saved to the clipboard successfully, allowing you to easily share it."
      );
    } catch (error) {
      console.error("Failed to copy:", error);
      setClipboardMessageModal("Failed to copy");
    }
  };
  const convertfoodListTotext = () => {
    return foodItems.map((item) => `${item.name}: ${item.quantity}`).join("\n");
  };
  const handelShowProfileModal = () => {
    setShowProfileModal(true);
  };
  const handelShowSyncModal = () => {
    setShowSyncModal(true);
    handelSyncList();
  };
  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };
  const handleCloseSyncModal = () => {
    setShowSyncModal(false);
  };
  const handleCloseClipboardModal = () => {
    setShowClipboradModal(false);
  };
  const handerLogout = () => {
    handelSyncList();
    navigate("/");
  };
  const displayUsername = (email) => {
    const atIndex = email.indexOf("@");
    const username = email.slice(0, atIndex);
    return username;
  };
  const copyFoodItemList = () => {
    setShowClipboradModal(true);
    copyToClipboard(convertfoodListTotext());
  };
  const searchHandle = (event) => {
    event.preventDefault();
    // Filter items based on the search text
    const filteredItems = foodItems.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    if(filteredItems.length > 0)
    {
      SetsearchText("");
    }
    setResultFilter(filteredItems);
    setShowResultModal(true);
  };

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img src={Logo} alt="Logo" className="logo" />
        </div>

        <form action="#" className="search" onSubmit={searchHandle}>
          <input
            type="text"
            name="search"
            id="search"
            className="search__input"
            placeholder="search"
            onChange={(event) => SetsearchText(event.target.value)}
            value={searchText}
          />
          <button className="search__button"
          disabled = {searchText === ""}>
            <FaSearch className="serach__icon" />
          </button>
        </form>
        <nav className="user-nav">
          <div className="user-nav__icon-box" onClick={copyFoodItemList}>
            <FaRegCopy className="user-nav__icon" />
            <span className="user-nav__notification">{totalItems}</span>
          </div>

          <div className="user-nav__user" onClick={handelShowProfileModal}>
            <FaUserCircle className="user-nav__icon" />
            <span className="user-nav__user-name">
              {displayUsername(userEmail)}
            </span>
          </div>
          <div className="cloudSyn" onClick={handelShowSyncModal}>
            <MdOutlineCloudSync />
            <span className="cloudSyn-text">Sync List</span>
          </div>
          <div className="user-nav__icon-box" onClick={handerLogout}>
            <IoMdLogOut className="user-nav__icon" />
            <span className="cloudSyn-text">Logout</span>
          </div>
        </nav>
      </header>
      <ResultModal
        showModalResult={showResultModal}
        closeResultModal={closeResultModal}
        searchText={searchText}
        filterList={resultFilter}
      />
      <ProfileModal
        email={userEmail}
        showProfileModal={showProfileModal}
        handleCloseProfileModal={handleCloseProfileModal}
      />
      <SyncModal
        handleSyncShowModal={showSyncModal}
        handleCloseSyncModal={handleCloseSyncModal}
        syncMessageModal={syncMessageModal}
      />
      <ClipboardModal
        handleClipboardShowModal={showClipboradModal}
        handleCloseClipboardModal={handleCloseClipboardModal}
        clipboardMessageModal={clipboardMessageModal}
      />
    </>
  );
}
