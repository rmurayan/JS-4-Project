import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "../Sidebar/Sidebar";
import Home from "./Home";
import { useLocation } from "react-router-dom";
import Category from "./Category";
import { firestore } from "../../DB/database";
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";

export default function Main() {
  const [foodItems, setFoodItems] = useState([]);
  const location = useLocation();
  const userInfo = location.state?.userInfo;
  const userUid = userInfo.userUid;
  const CategoryType = {
    HOME: "Home",
    PRODUCE: "Produce",
    MEAT: "Meat",
    BAKERY: "Bakery",
    DAIRY_FROZEN: "Dairy & Frozen",
    SNACK_BEVERAGE: "Snack & Beverage",
    HOUSEHOLD_PERSONAL: "Household & Personal Care",
    SPICE_GRAIN: "Spice & Grain",
    PET: "Pet"
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const foodItemsCollection = collection(
          firestore,
          "users",
          userUid,
          "foodItems"
        );
        const querySnapshot = await getDocs(foodItemsCollection);

        // Extract the items array from the data
        const data = querySnapshot.docs.map((doc) => doc.data().items);

        // Parse the items array
        const foodItemsArray = data.map((item) => JSON.parse(item));

        // Flatten the array of arrays into a single array
        const flattenedFoodItems = foodItemsArray.flat();

        // Set the food items state
        setFoodItems(flattenedFoodItems);
      } catch (error) {
        console.error("Error fetching food items from Firestore: ", error);
        // Handle error fetching data
      }
    };
    fetchData();
  },[userUid]);

  const [syncMessageModal, setSyncMessageModal] = useState("");
  const handelSyncList = async () => {
    try {
      const foodItemsCollection = collection(
        firestore,
        "users",
        userUid,
        "foodItems"
      );
      const querySnapshot = await getDocs(foodItemsCollection);

      // Check if food items data already exists in Firebase
      if (querySnapshot.empty) {
        // If data doesn't exist, add a new document
        const itemsJSON = JSON.stringify(foodItems);
        await addDoc(foodItemsCollection, { items: itemsJSON });
      } else {
        // If data exists, update the existing document
        const docId = querySnapshot.docs[0].id; // Assuming there's only one document
        const itemsJSON = JSON.stringify(foodItems);
        await setDoc(doc(foodItemsCollection, docId), { items: itemsJSON });
      }
      setSyncMessageModal(
        "Your grocery list items have been synced to the cloud."
      );
    } catch (error) {
      setSyncMessageModal("Error saving food items to Firestore");
    }
  };

  const sortedFoodItems = [...foodItems].sort((a, b) => {
    // Compare category strings
    if (a.category < b.category) {
      return -1; // a should come before b
    }
    if (a.category > b.category) {
      return 1; // a should come after b
    }
    return 0; // categories are equal
  });

  const [selectedCategory, setSelectedCategory] = useState("Home");
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  // Function to return a list of items for a specific category
  const getItemsByCategory = (category) => {
    return foodItems.filter((item) => item.category === category);
  };

  const renderCategory = () => {
    switch (selectedCategory) {
      case CategoryType.PRODUCE:
        return (
          <Category
            categoryItems={getItemsByCategory(selectedCategory)}
            setFoodItems={setFoodItems}
            allItems={sortedFoodItems}
            selectedCategory={selectedCategory}
            CategoryType = {CategoryType}

          />
        );
      case CategoryType.SNACK_BEVERAGE:
        return (
          <Category
            categoryItems={getItemsByCategory(selectedCategory)}
            allItems={sortedFoodItems}
            setFoodItems={setFoodItems}
            selectedCategory={selectedCategory}
            CategoryType = {CategoryType}
          />
        );
      case CategoryType.MEAT:
        return (
          <Category
            categoryItems={getItemsByCategory(selectedCategory)}
            allItems={sortedFoodItems}
            setFoodItems={setFoodItems}
            selectedCategory={selectedCategory}
            CategoryType = {CategoryType}
          />
        );

      case CategoryType.BAKERY:
        return (
          <Category
            categoryItems={getItemsByCategory(selectedCategory)}
            allItems={sortedFoodItems}
            setFoodItems={setFoodItems}
            selectedCategory={selectedCategory}
            CategoryType = {CategoryType}

          />
          
        );
        case CategoryType.HOUSEHOLD_PERSONAL:
          return (
            <Category
              categoryItems={getItemsByCategory(selectedCategory)}
              allItems={sortedFoodItems}
              setFoodItems={setFoodItems}
              selectedCategory={selectedCategory}
              CategoryType = {CategoryType}

            />
          );
          case CategoryType.PET:
            return (
              <Category
                categoryItems={getItemsByCategory(selectedCategory)}
                allItems={sortedFoodItems}
                setFoodItems={setFoodItems}
                selectedCategory={selectedCategory}
                CategoryType = {CategoryType}
              />
            );
            case CategoryType.DAIRY_FROZEN:
              return (
                <Category
                  categoryItems={getItemsByCategory(selectedCategory)}
                  allItems={sortedFoodItems}
                  setFoodItems={setFoodItems}
                  selectedCategory={selectedCategory}
                  CategoryType = {CategoryType}

                />
                
              );
              case CategoryType.SPICE_GRAIN:
              return (
                <Category
                  categoryItems={getItemsByCategory(selectedCategory)}
                  allItems={sortedFoodItems}
                  setFoodItems={setFoodItems}
                  selectedCategory={selectedCategory}
                  CategoryType = {CategoryType}
                />
              );
              
      default:
        return (
        <Home items={foodItems} setItem={setFoodItems} 
        CategoryType = {CategoryType}
        />);
    }
  };
  return (
    <div className="main-container">
      <Header
        userEmail={userInfo.userEmail}
        totalItems={foodItems.length}
        syncMessageModal={syncMessageModal}
        foodItems = {foodItems}
        handelSyncList={handelSyncList}
      />
      <div className="content">
        <Sidebar
          handleCategoryClick={handleCategoryClick}
          selectedCategory={selectedCategory}
        />
        {renderCategory()}
      </div>
    </div>
  );
}
