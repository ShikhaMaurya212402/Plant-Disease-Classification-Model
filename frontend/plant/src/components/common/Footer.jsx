import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import Wlogoo from "./loggw.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          {/* Company Info */}
          <div className="footer__section">
            <div className="footer__logo">
              <div className="footer__logo-icon">
                <img src={Wlogoo} alt="Logo" style={{ width: "200px" }} />
              </div>
            </div>
            <p className="footer__description">
              AI-powered plant disease identification system helping farmers and gardeners maintain healthy plants.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__section">
            <h3 className="footer__title">Quick Links</h3>
            <ul className="footer__links">
              <li>
                <Link to="/" className="footer__link">
                  <svg className="footer__link-icon" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/classify" className="footer__link">
                  <svg className="footer__link-icon" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h18v2H3V3zm0 6h18v2H3V9zm0 6h12v2H3v-2z" />
                  </svg>
                  Disease Classification
                </Link>
              </li>
              <li>
                <Link to="/history" className="footer__link">
                  <svg className="footer__link-icon" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 3a9 9 0 109 9h-2a7 7 0 11-7-7V3l4 4-4 4V8a5 5 0 105 5h2a7 7 0 11-7-7V3z" />
                  </svg>
                  Classification History
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer__link">
                  <svg className="footer__link-icon" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.67 0 8 1.34 8 4v4H4v-4c0-2.66 5.33-4 8-4zm0-2a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="footer__section">
            <h3 className="footer__title">Features</h3>
            <ul className="footer__links">
              <li>
                <a href="#" className="footer__link">
                  <svg className="footer__link-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 00-3 19.47V22h6v-.53A10 10 0 0012 2zm1 14h-2v-2h2zm0-4h-2V7h2z" />
                  </svg>
                  AI Disease Detection
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  <svg className="footer__link-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h12v2H3v-2z" />
                  </svg>
                  Treatment Recommendations
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  <svg className="footer__link-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 00-3 19.47V22h6v-.53A10 10 0 0012 2zm4 13h-2v2h-4v-2H8v-2h8v2z" />
                  </svg>
                  Plant Health Monitoring
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  <svg className="footer__link-icon" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.67 0 8 1.34 8 4v4H4v-4c0-2.66 5.33-4 8-4zm0-2a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                  Expert Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__section">
            <h3 className="footer__title">Contact</h3>
            <div className="footer__contact">
              <p className="footer__contact-item">
                <span className="footer__contact-icon">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4h16v2H4V4zm0 14h16v2H4v-2zm0-7h16v2H4v-2z" />
                  </svg>
                </span>
                support@plantcare.com
              </p>
              <p className="footer__contact-item">
                <span className="footer__contact-icon">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.36 11.36 0 003.55.57 1 1 0 011 1v3.36a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.36a1 1 0 011 1 11.36 11.36 0 00.57 3.55 1 1 0 01-.21 1.11l-2.1 2.13z" />
                  </svg>
                </span>
                +91 98765 43210
              </p>
              <p className="footer__contact-item">
                <span className="footer__contact-icon">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1114.5 9 2.5 2.5 0 0112 11.5z" />
                  </svg>
                </span>
                Baripada, Odisha, India
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer__bottom">
          <div className="footer__bottom-content">
            <p className="footer__copyright">
              © {currentYear} PlantCare. All rights reserved.
            </p>
            <div className="footer__legal">
              <a href="#" className="footer__legal-link">Privacy Policy</a>
              <a href="#" className="footer__legal-link">Terms of Service</a>
              <a href="#" className="footer__legal-link">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
