import React, { useContext } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import DashboardIcon from "../../assets/dashboard_icon.svg";
import AddIcon from "../../assets/add_icon.svg";
import { AuthContext } from "../../context/AuthContext";
import Avatar from "../avatar/Avatar";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
         {user &&  <Avatar src={user?.photoURL}/>}
          {/* avatar & username here later */}
         {user &&  <p>Привет {user?.displayName}</p>}
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="add project icon" />
                <span>Новый проект</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
