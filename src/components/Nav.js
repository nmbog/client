import React from "react";
import plantImage from "./img/plant-2.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="dropdown">
        <button className="dropbtn">
          <img src={plantImage} alt="menu" class="plant_icon"></img>
          <i class="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <h2>The Plant Spot</h2>
          <div>
            <button onClick={signOut}>Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
