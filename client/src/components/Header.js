import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/psyx_logo.png";

function Header({ isLoggedIn, showLogin, goProfile }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (section) => {
    setIsMenuOpen(false);
    navigate("/", { state: { scrollTarget: section } });
  };

  return (
    <>
      <header className="header">
        {/* Logo */}
        <div className="header__logo" onClick={() => scrollToSection("home")}>
          <img src={logo} alt="PsyX Logo" className="header-logo-img" />
        </div>

        {/* Desktop Nav */}
        <nav className="header__nav">
          <div className="nav-links">
            <button onClick={() => scrollToSection("home")}>Home</button>
            <button onClick={() => scrollToSection("about")}>About</button>
            <button onClick={() => navigate("/tests")}>Tests</button>
          </div>

          <div className="header-actions">
            {isLoggedIn ? (
              <button className="profile-btn" onClick={goProfile}>
                <FiUser size={18} /> Profile
              </button>
            ) : (
              <button className="login-btn" onClick={showLogin}>
                Login / Sign Up
              </button>
            )}
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>

        {/* Mobile Sidebar */}
        <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
          <div className="mobile-content">
            <button onClick={() => scrollToSection("home")}>Home</button>
            <button onClick={() => scrollToSection("about")}>About</button>
            <button
  onClick={() => {
    setIsMenuOpen(false);
    navigate("/tests");
  }}
>
  Tests
</button>

            {isLoggedIn ? (
        <button
  onClick={() => {
    setIsMenuOpen(false);
    goProfile();
  }}
>
  View Profile
</button>
            ) : (
          <button
  onClick={() => {
    setIsMenuOpen(false);
    showLogin();
  }}
>
  Login / Sign Up
</button>
            )}
          </div>
        </div>
      </header>

      <style>{`
        /* ===== HEADER ===== */
        .header {
          position: fixed;
          top: 0;
          width: 100%;
          height: 110px;
          background: #ffffff !important;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 50px;
          z-index: 1000;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }

        .header-logo-img {
          height: 95px;
          object-fit: contain;
          cursor: pointer;
        }

        .header__nav {
          display: flex;
          align-items: center;
          gap: 50px;
        }

        /* 🔥 REMOVE GREY PILL BACKGROUND */
        .nav-links {
          display: flex;
          gap: 40px;
          background: transparent !important;
          border-radius: 0 !important;
          padding: 0 !important;
        }

        .nav-links button {
          background: transparent !important;
          border: none;
          outline: none;
          box-shadow: none;
          color: #000;
          font-size: 18px;
          cursor: pointer;
        }

        .nav-links button:hover {
          color: #19fd91;
        }

        .login-btn,
        .profile-btn {
          background: #19fd91;
          color: black;
          border: none;
          padding: 9px 22px;
          border-radius: 25px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* ===== MOBILE ===== */
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: #000;
          cursor: pointer;
        }

        .mobile-menu {
          position: fixed;
          top: 110px;
          right: -100%;
          width: 270px;
          height: 100vh;
          background: #ffffff !important;
          transition: right 0.3s ease;
          padding: 30px 20px;
          box-shadow: -2px 0 8px rgba(0,0,0,0.05);
        }

        .mobile-menu.open {
          right: 0;
        }

        .mobile-content {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .mobile-content button {
          background: transparent;
          border: none;
          color: #000;
          font-size: 17px;
          text-align: left;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .header__nav {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }
        }
      `}</style>
    </>
  );
}

export default Header;
