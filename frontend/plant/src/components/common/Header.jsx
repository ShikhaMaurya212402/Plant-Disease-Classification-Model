import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logoo from "./LOGGO.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        {/* Logo */}
        <div className="header__logo">
          <Link to="/" className="header__logo-link" onClick={closeMenu}>
            <div className="header__logo-icon">
              <img src={logoo} alt="Logo" style={{width : "200px"}}/>
            </div>
            {/* <span className="header__logo-text">PlantCare</span> */}
          </Link>
        </div>

        {/* Navigation */}
        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link
                to="/"
                className={`header__nav-link ${isActiveRoute('/') ? 'header__nav-link--active' : ''}`}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li className="header__nav-item">
              <Link
                to="/classify"
                className={`header__nav-link ${isActiveRoute('/classify') ? 'header__nav-link--active' : ''}`}
                onClick={closeMenu}
              >
                Classify
              </Link>
            </li>
            <li className="header__nav-item">
              <Link
                to="/history"
                className={`header__nav-link ${isActiveRoute('/history') ? 'header__nav-link--active' : ''}`}
                onClick={closeMenu}
              >
                History
              </Link>
            </li>
            <li className="header__nav-item">
              <Link
                to="/about"
                className={`header__nav-link ${isActiveRoute('/about') ? 'header__nav-link--active' : ''}`}
                onClick={closeMenu}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>

        {/* CTA Button */}
        <div className="header__cta">
          <Link to="/classify" className="header__cta-button" onClick={closeMenu}>
            Start Classification
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`header__menu-toggle ${isMenuOpen ? 'header__menu-toggle--open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="header__menu-line"></span>
          <span className="header__menu-line"></span>
          <span className="header__menu-line"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
