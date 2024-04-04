import React, { useState } from "react";
import { GiThermometerCold } from "react-icons/gi";
import { MdOutlinePets } from "react-icons/md";
import { ImSvg } from "react-icons/im";
import { MdOutlineGrain } from "react-icons/md";
import { FaCarrot } from "react-icons/fa";
import { TbMeat } from "react-icons/tb";
import { MdBakeryDining } from "react-icons/md";
import { GiManualJuicer } from "react-icons/gi";
import ItemCard from "./ItemCard";
import ItemModal from "../Models/ItemModal";
import CartEmpty from "../../emptyCart.jpg";
import DeleteConfirmationModal from "../Models/DeleteConfirmationModal";
import NotificationModel from "../Models/NotificationModel";

export default function Home({ items, setItem, CategoryType }) {
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [deleteItemName, setDeleteItemName] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [selectedItemName, setSelectedItemName] = useState(null);
  const [showNotificationModel, setShowNotificationModel] = useState(false);

  const [notificationTitle, setNotificationTitle] = useState("");

  const [notificationMessage, setNotificationMessage] = useState("");

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
  const handleAddNewItem = () => {
    if (selectedItemName) {
      const updatedItems = items.map((item) =>
        item.name === selectedItemName
          ? { ...item, name: newItemName, quantity: newItemQuantity }
          : item
      );
      setItem(updatedItems);
      setNotificationTitle("Updated Item");
      setNotificationMessage(`Item ${newItemName} has been updated`);
      notificationTimer();
    }
    setNewItemName("");
    setNewItemQuantity("");
    closeModal();
  };

  const handleEditItem = (itemName) => {
    const selectedItem = items.find((item) => item.name === itemName);
    if (selectedItem) {
      setNewItemName(selectedItem.name);
      setNewItemQuantity(selectedItem.quantity);
      setSelectedItemName(itemName);
      openModal();
    }
  };

  const handleDeleteItem = () => {
    const updatedItems = items.filter((item) => item.name !== deleteItemName);
    setItem(updatedItems);
    setNotificationTitle("Deleted Item");
    setNotificationMessage(`Item ${deleteItemName} has been deleted`);
    notificationTimer();
    closeDeleteModal();
  };
  const notificationTimer = () => {
    setShowNotificationModel(true);
    setTimeout(() => {
      setShowNotificationModel(false);
    }, 4000);
  };
  const closeNotificationModel = () => {
    setShowNotificationModel(false);
  };
  const getCategoryTotal = (category) => {
    return items.reduce((total, item) => {
      if (item.category === category) {
        return total + 1;
      }
      return total;
    }, 0);
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
        <div className="category-section">
          <span className="category-title">
            <FaCarrot />
            Produce{" "}
            <span className="counter">
              {getCategoryTotal(CategoryType.PRODUCE)}
            </span>
          </span>
          {getCategoryTotal(CategoryType.PRODUCE) === 0 && (
            <img src={CartEmpty} alt={CartEmpty} className="emptyList" />
          )}
          {items.map(
            (item, index) =>
              item.category === CategoryType.PRODUCE && (
                <ItemCard
                  key={index}
                  item={item}
                  handleEditItem={handleEditItem}
                  handleDeleteItem={openDeleteModal}
                >
                  {renderIconCategory(item.category)}
                </ItemCard>
              )
          )}
        </div>

        <div className="category-section">
          <span className="category-title">
            <TbMeat />
            Meat{" "}
            <span className="counter">
              {getCategoryTotal(CategoryType.MEAT)}
            </span>
          </span>
          {getCategoryTotal(CategoryType.MEAT) === 0 && (
            <img src={CartEmpty} alt={CartEmpty} className="emptyList" />
          )}
          {items.map(
            (item, index) =>
              item.category === "Meat" && (
                <ItemCard
                  key={index}
                  item={item}
                  handleEditItem={handleEditItem}
                  handleDeleteItem={openDeleteModal}
                >
                  {renderIconCategory(item.category)}
                </ItemCard>
              )
          )}
        </div>

        <div className="category-section">
          <span className="category-title">
            <GiManualJuicer />
            Snack & Beverage
            <span className="counter">
              {getCategoryTotal(CategoryType.SNACK_BEVERAGE)}
            </span>
          </span>
          {getCategoryTotal(CategoryType.SNACK_BEVERAGE) === 0 && (
            <img src={CartEmpty} alt={CartEmpty} className="emptyList" />
          )}
          {items.map(
            (item, index) =>
              item.category === CategoryType.SNACK_BEVERAGE && (
                <ItemCard
                  key={index}
                  item={item}
                  handleEditItem={handleEditItem}
                  handleDeleteItem={openDeleteModal}
                >
                  {renderIconCategory(item.category)}
                </ItemCard>
              )
          )}
        </div>
        <div className="category-section">
          <span className="category-title">
            <MdBakeryDining />
            Barkery{" "}
            <span className="counter">
              {getCategoryTotal(CategoryType.BAKERY)}
            </span>
          </span>
          {getCategoryTotal(CategoryType.BAKERY) === 0 && (
            <img src={CartEmpty} alt={CartEmpty} className="emptyList" />
          )}
          {items.map(
            (item, index) =>
              item.category === CategoryType.BAKERY && (
                <ItemCard
                  key={index}
                  item={item}
                  handleEditItem={handleEditItem}
                  handleDeleteItem={openDeleteModal}
                >
                  {renderIconCategory(item.category)}
                </ItemCard>
              )
          )}
        </div>
        <div className="category-section">
          <span className="category-title">
            <MdBakeryDining />
            Dairy & Frozen
            <span className="counter">
              {getCategoryTotal(CategoryType.DAIRY_FROZEN)}
            </span>
          </span>
          {getCategoryTotal(CategoryType.DAIRY_FROZEN) === 0 && (
            <img src={CartEmpty} alt={CartEmpty} className="emptyList" />
          )}
          {items.map(
            (item, index) =>
              item.category === CategoryType.DAIRY_FROZEN && (
                <ItemCard
                  key={index}
                  item={item}
                  handleEditItem={handleEditItem}
                  handleDeleteItem={openDeleteModal}
                >
                  {renderIconCategory(item.category)}
                </ItemCard>
              )
          )}
        </div>
        <div className="category-section">
          <span className="category-title">
            <MdBakeryDining />
            Household & Personal Care
            <span className="counter">
              {getCategoryTotal(CategoryType.HOUSEHOLD_PERSONAL)}
            </span>
          </span>
          {getCategoryTotal(CategoryType.HOUSEHOLD_PERSONAL) === 0 && (
            <img src={CartEmpty} alt={CartEmpty} className="emptyList" />
          )}
          {items.map(
            (item, index) =>
              item.category === CategoryType.HOUSEHOLD_PERSONAL && (
                <ItemCard
                  key={index}
                  item={item}
                  handleEditItem={handleEditItem}
                  handleDeleteItem={openDeleteModal}
                >
                  {renderIconCategory(item.category)}
                </ItemCard>
              )
          )}
        </div>
        <div className="category-section">
          <span className="category-title">
            <MdBakeryDining />
            Spice & Grain{" "}
            <span className="counter">
              {getCategoryTotal(CategoryType.SPICE_GRAIN)}
            </span>
          </span>
          {getCategoryTotal(CategoryType.SPICE_GRAIN) === 0 && (
            <img src={CartEmpty} alt={CartEmpty} className="emptyList" />
          )}
          {items.map(
            (item, index) =>
              item.category === CategoryType.SPICE_GRAIN && (
                <ItemCard
                  key={index}
                  item={item}
                  handleEditItem={handleEditItem}
                  handleDeleteItem={openDeleteModal}
                >
                  {renderIconCategory(item.category)}
                </ItemCard>
              )
          )}
        </div>
        <div className="category-section">
          <span className="category-title">
            <MdBakeryDining />
            Pet{" "}
            <span className="counter">
              {getCategoryTotal(CategoryType.PET)}
            </span>
          </span>
          {getCategoryTotal(CategoryType.PET) === 0 && (
            <img src={CartEmpty} alt={CartEmpty} className="emptyList" />
          )}
          {items.map(
            (item, index) =>
              item.category === CategoryType.PET && (
                <ItemCard
                  key={index}
                  item={item}
                  handleEditItem={handleEditItem}
                  handleDeleteItem={openDeleteModal}
                >
                  {renderIconCategory(item.category)}
                </ItemCard>
              )
          )}
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
