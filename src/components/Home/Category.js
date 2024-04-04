import React, { useState } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { GiThermometerCold } from "react-icons/gi";
import { MdOutlinePets } from "react-icons/md";
import { ImSvg } from "react-icons/im";
import { MdOutlineGrain } from "react-icons/md";
import { FaCarrot, FaLayerGroup } from "react-icons/fa";
import ItemModal from "../Models/ItemModal";
import DeleteConfirmationModal from "../Models/DeleteConfirmationModal";
import ItemCard from "./ItemCard";
import { TbMeat } from "react-icons/tb";
import { MdBakeryDining } from "react-icons/md";
import { GiManualJuicer } from "react-icons/gi";
import CartEmpty from "../../emptyCart.jpg";
import NotificationModel from "../Models/NotificationModel";
export default function Category({
  categoryItems,
  allItems,
  setFoodItems,
  selectedCategory,
  CategoryType,
}) {
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showNotificationModel, setShowNotificationModel] = useState(false);
  const [deleteItemName, setDeleteItemName] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [selectedItemName, setSelectedItemName] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const notificationTimer = () => {
    setShowNotificationModel(true);
    setTimeout(() => {
      setShowNotificationModel(false);
    }, 4000);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItemName(null);
    setNewItemName("");
    setNewItemQuantity("");
  };

  const openDeleteModal = (itemName) => {
    setShowModalDelete(true);
    setDeleteItemName(itemName);
  };

  const closeDeleteModal = () => {
    setShowModalDelete(false);
    setDeleteItemName("");
  };
  const closeNotificationModel = () => {
    setShowNotificationModel(false);
  };
  const handleAddNewItem = () => {
    if (selectedItemName) {
      const updatedItems = allItems.map((item) =>
        item.name === selectedItemName
          ? { ...item, name: newItemName, quantity: newItemQuantity }
          : item
      );
      setFoodItems(updatedItems);
      setNotificationTitle("Updated Item");
      setNotificationMessage(`Item ${newItemName} has been updated`);
      notificationTimer();
    } else {
      const newItem = {
        name: newItemName,
        quantity: newItemQuantity,
        category: selectedCategory,
      };
      setFoodItems([...allItems, newItem]);
      setNotificationTitle("Added Item");
      setNotificationMessage(`Item ${newItemName} has been added`);
      notificationTimer();
    }
    setNewItemName("");
    setNewItemQuantity("");
    closeModal();
  };

  const handleEditItem = (itemName) => {
    const selectedItem = allItems.find((item) => item.name === itemName);
    if (selectedItem) {
      setNewItemName(selectedItem.name);
      setNewItemQuantity(selectedItem.quantity);
      setSelectedItemName(itemName);
      openModal();
    }
  };

  const handleDeleteItem = () => {
    const updatedItems = allItems.filter(
      (item) => item.name !== deleteItemName
    );
    setFoodItems(updatedItems);
    setNotificationTitle("Deleted Item");
    setNotificationMessage(`Item ${deleteItemName} has been deleted`);
    notificationTimer();
    closeDeleteModal();
  };
  const renderIconCategory = (selectedCategory) => {
    switch (selectedCategory) {
      case CategoryType.PRODUCE:
        return <FaCarrot />;
      case CategoryType.MEAT:
        return <TbMeat />;
      case CategoryType.BAKERY:
        return <MdBakeryDining />;
      case CategoryType.SNACK_BEVERAGE:
        return <GiManualJuicer />;
      case CategoryType.PET:
        return <MdOutlinePets />;
      case CategoryType.HOUSEHOLD_PERSONAL:
        return <ImSvg />;
      case CategoryType.DAIRY_FROZEN:
        return <GiThermometerCold />;
      case CategoryType.SPICE_GRAIN:
        return <MdOutlineGrain />;

      default:
        return "";
    }
  };

  return (
    <>
      <div className="category-view">
        <div className="container-list">
          <div className="container-add">
            <span className="all-list-title">
              {renderIconCategory()}
              {selectedCategory} Items
              <span className="counter">{categoryItems.length}</span>
            </span>
            {categoryItems.length === 0 && (
              <img src={CartEmpty} alt={CartEmpty} className="emptyList" />
            )}
            {categoryItems.map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                handleEditItem={handleEditItem}
                handleDeleteItem={openDeleteModal}
              >
                {" "}
                {renderIconCategory(selectedCategory)}
              </ItemCard>
            ))}
          </div>
          <div className="container-all-list">
            <span className="all-list-title">
              <FaLayerGroup />
              ALL Items <span className="counter">{allItems.length}</span>
            </span>
            {allItems.length === 0 && (
              <img src={CartEmpty} alt={CartEmpty} className="emptyList" />
            )}
            {allItems.map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                handleEditItem={handleEditItem}
                handleDeleteItem={openDeleteModal}
              >
                {" "}
                {renderIconCategory(item.category)}
              </ItemCard>
            ))}
          </div>
        </div>
        <div className="add-btn">
          <button className="add-button" onClick={openModal}>
            <RiAddCircleLine /> <span>Add New Item</span>
          </button>
        </div>
      </div>

      <ItemModal
        showModal={showModal}
        closeModal={closeModal}
        selectedItemName={selectedItemName}
        newItemName={newItemName}
        setNewItemName={setNewItemName}
        newItemQuantity={newItemQuantity}
        setNewItemQuantity={setNewItemQuantity}
        handleAddNewItem={handleAddNewItem}
      />
      <DeleteConfirmationModal
        showModalDelete={showModalDelete}
        closeDeleteModal={closeDeleteModal}
        deleteItemName={deleteItemName}
        handleDeleteItem={handleDeleteItem}
      />
      <NotificationModel
        showNotificationModel={showNotificationModel}
        closeNotificationModel={closeNotificationModel}
        notificationTitle={notificationTitle}
        notificationMessage={notificationMessage}
      />
    </>
  );
}
