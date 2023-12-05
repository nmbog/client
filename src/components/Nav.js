import React from "react";
import plantImage from "./img/plant-2.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const onNotificationClick = (notification) =>
    navigate(notification.cta.data.url);

  const signOut = () => {
    localStorage.removeItem("_id");
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="dropdown">
        <button className="dropbtn">
          <img src={plantImage} alt="menu" class="plant_icon"></img>
          <i class="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <Link to={signOut}>sign out</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
