import React, { useContext, useEffect } from "react";
import img from "../images/img.png";
import { Link } from "react-router-dom";
import { Store } from "../context/store";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  let { state, dispatch } = useContext(Store);
  let user = state.userInfo;

  // console.log(user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  let handleLogout = () => {
    dispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div id="sidebar">
      <div className="sidebar_img">
        <img src={img} alt="Profile" />
      </div>
      <div className="sidebar_details">
        <p>Name: {user ? user.displayName : "A B M Shawon Islam"}</p>
        <p>Designation: MERN Stack Developer</p>
        <p>Office Time: 11am - 8pm</p>
        <p>Offday: Sunday</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="sidebar_link">
        <Link to="/">Emplyee List</Link>
        <Link to="/todayclass">Today Class</Link>
        <Link to="/postactivity">Post Activity</Link>
        <Link to="/activitylist">Activity List</Link>
      </div>
    </div>
  );
};

export default Sidebar;
