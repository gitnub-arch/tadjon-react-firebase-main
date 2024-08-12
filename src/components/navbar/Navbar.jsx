import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/temple.svg";

import "./Navbar.css";
import { useLogout } from "../../hooks/useLogout";
import { AuthContext } from "../../context/AuthContext";

export const Navbar = () => {
  const { isPending, logout } = useLogout();
  const { user } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <ul>
        {!user && (
          <>
            <li className="logo">
              <img src={Logo} alt="Tadjon logo" />
              <span>The Tadjon</span>
            </li>
            <li>
              <Link to="/login">Войти</Link>
            </li>
            <li>
              <Link to="/signup">Регистрация</Link>
            </li>
          </>
        )}

        {user && (
          <li>
            {!isPending && (
              <button className="btn" onClick={logout}>
                Выйти
              </button>
            )}
            {isPending && (
              <button className="btn" disabled>
                Идет выход...
              </button>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};