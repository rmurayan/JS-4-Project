import React from "react";
import { FaHome } from "react-icons/fa";
import { FaCarrot } from "react-icons/fa";
import { TbMeat } from "react-icons/tb";
import { MdBakeryDining } from "react-icons/md";
import { GiManualJuicer } from "react-icons/gi";
import { MdOutlinePets } from "react-icons/md";
import { ImSvg } from "react-icons/im";
import { MdOutlineGrain } from "react-icons/md";
import { GiThermometerCold } from "react-icons/gi";


import "./Sidebar.css";

export default function Sidebar({ handleCategoryClick,selectedCategory }) {
  return (
    <div className="sidebar">
      <nav>
        <ul className="side-nav">
          <li
            className={`side-nav__item ${
              selectedCategory === "Home" ? "side-nav__item--active" : ""
            }`}
          >
            <p
              className="side-nav__link"
              onClick={() => handleCategoryClick("Home")}
            >
              <FaHome className="side-nav__icon" />
              <span>Home</span>
            </p>
          </li>
          <li
            className={`side-nav__item ${
              selectedCategory === "Produce" ? "side-nav__item--active" : ""
            }`}
          >
            <p
              className="side-nav__link"
              onClick={() => handleCategoryClick("Produce")}
            >
              <FaCarrot className="side-nav__icon" />
              <span>Fresh Produce</span>
            </p>
          </li>
          <li
            className={`side-nav__item ${
              selectedCategory === "Meat" ? "side-nav__item--active" : ""
            }`}
          >
            <p
              className="side-nav__link"
              onClick={() => handleCategoryClick("Meat")}
            >
              <TbMeat className="side-nav__icon" />
              <span>Meat & Seafood

</span>
            </p>
          </li>
          <li
            className={`side-nav__item ${
              selectedCategory === "Bakery" ? "side-nav__item--active" : ""
            }`}
          >
            <p
              className="side-nav__link"
              onClick={() => handleCategoryClick("Bakery")}
            >
              <MdBakeryDining className="side-nav__icon" />
              <span>Bakery</span>
            </p>
          </li>
          <li
            className={`side-nav__item ${
              selectedCategory === "Dairy & Frozen" ? "side-nav__item--active" : ""
            }`}
          >
            <p
              className="side-nav__link"
              onClick={() => handleCategoryClick("Dairy & Frozen")}
            >
              <GiThermometerCold className="side-nav__icon" />
              <span>Dairy & Frozen</span>
            </p>
          </li>
          <li
            className={`side-nav__item ${
              selectedCategory === "Snack & Beverage" ? "side-nav__item--active" : ""
            }`}
          >
            <p
              className="side-nav__link"
              onClick={() => handleCategoryClick("Snack & Beverage")}
            >
              <GiManualJuicer className="side-nav__icon" />
              <span>Snacks & Beverages</span>
            </p>
          </li>
          <li
            className={`side-nav__item ${
              selectedCategory === "Household & Personal Care" ? "side-nav__item--active" : ""
            }`}
          >
            <p
              className="side-nav__link"
              onClick={() => handleCategoryClick("Household & Personal Care")}
            >
              <ImSvg className="side-nav__icon" />
              <span>Household & Personal Care</span>
            </p>
          </li>
          <li
            className={`side-nav__item ${
              selectedCategory === "Spice & Grain" ? "side-nav__item--active" : ""
            }`}
          >
            <p
              className="side-nav__link"
              onClick={() => handleCategoryClick("Spice & Grain")}
            >
              <MdOutlineGrain className="side-nav__icon" />
              <span>Spices & Grains</span>
            </p>
          </li>
          <li
            className={`side-nav__item ${
              selectedCategory === "Pet" ? "side-nav__item--active" : ""
            }`}
          >
            <p
              className="side-nav__link"
              onClick={() => handleCategoryClick("Pet")}
            >
              <MdOutlinePets className="side-nav__icon" />
              <span>Pet Supplies</span>
            </p>
          </li>
        </ul>
      </nav>
      <div className="legal">&copy; 2024 by group 9 . All rights reserved.</div>
    </div>
  );
}
