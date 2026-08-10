import React, { useState } from "react";
import "./style.css";
import logo from "./images/logo.png";
import { toast } from "react-toastify";
import { Link, NavLink, useNavigate } from "react-router-dom";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");

    toast.success("Logged out successfully");

    navigate("/login");
  };
  return (
    <div>
      <div className="nav-container">
        <div className="logo-container">
          <img id="nav-logo" src={logo} alt="TaskPilot AI Logo" />
          <p id="nav-heading">TaskPilot AI</p>
        </div>
        <div className="navLinks-container">
          <NavLink to="/" className="nav-links">
            Dashboard
          </NavLink>
          <NavLink to="/tasks" className="nav-links">
            Tasks
          </NavLink>
          <NavLink to="/calendar" className="nav-links">
            Calendar
          </NavLink>
          <NavLink to="/analytics" className="nav-links">
            Analytics
          </NavLink>
          <NavLink to="/setting" className="nav-links">
            Settings
          </NavLink>
        </div>
        <div className="navButtons-container">
          {localStorage.getItem("isLoggedIn") ? (
            <button id="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link id="login-button" to="/login">
                Login
              </Link>

              <Link id="signup-button" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
        <i
          id="menu-icon"
          className="fa-solid fa-bars"
          onClick={() => setMenuOpen(!menuOpen)}
        ></i>
      </div>
      <div className={menuOpen ? "mobile-menu active" : "mobile-menu"}>
        <div className="mobile-links">
          <NavLink to="/" className="nav-links" end>
            Dashboard
          </NavLink>
          <NavLink to="/tasks" className="nav-links">
            Tasks
          </NavLink>
          <NavLink to="/calendar" className="nav-links">
            Calendar
          </NavLink>
          <NavLink to="/analytics" className="nav-links">
            Analytics
          </NavLink>
          <NavLink to="/setting" className="nav-links">
            Settings
          </NavLink>
        </div>
        <div className="mobile-buttons">
          {localStorage.getItem("isLoggedIn") ? (
            <button id="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link id="login-button" to="/login">
                Login
              </Link>

              <Link id="signup-button" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Navbar;
