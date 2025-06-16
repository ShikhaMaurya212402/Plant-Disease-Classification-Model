import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Main Footer Content */}
        <div className="footer__content">
          {/* Company Info */}
          <div className="footer__section">
            <div className="footer__logo">
              <div className="footer__logo-icon">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M16 2C13.8 2 12 3.8 12 6C12 8.2 13.8 10 16 10C18.2 10 20 8.2 20 6C20 3.8 18.2 2 16 2Z"
                    fill="currentColor"
                  />
                  <path
                    d="M16 12C12 12 8 14 8 18V28C8 29.1 8.9 30 10 30H22C23.1 30 24 29.1 24 28V18C24 14 20 12 16 12Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="footer__logo-text">PlantCare</span>
            </div>
            <p className="footer__description">
              AI-powered plant disease identification system helping farmers and gardeners maintain healthy plants.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__section">
            <h3 className="footer__title">Quick Links</h3>
            <ul className="footer__links">
              <li><Link to="/" className="footer__link">Home</Link></li>
              <li><Link to="/classify" className="footer__link">Disease Classification</Link></li>
              <li><Link to="/history" className="footer__link">Classification History</Link></li>
              <li><Link to="/about" className="footer__link">About Us</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div className="footer__section">
            <h3 className="footer__title">Features</h3>
            <ul className="footer__links">
              <li><a href="#" className="footer__link">AI Disease Detection</a></li>
              <li><a href="#" className="footer__link">Treatment Recommendations</a></li>
              <li><a href="#" className="footer__link">Plant Health Monitoring</a></li>
              <li><a href="#" className="footer__link">Expert Consultation</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__section">
            <h3 className="footer__title">Contact</h3>
            <div className="footer__contact">
              <p className="footer__contact-item">
                <span className="footer__contact-icon">📧</span>
                support@plantcare.com
              </p>
              <p className="footer__contact-item">
                <span className="footer__contact-icon">📱</span>
                +91 98765 43210
              </p>
              <p className="footer__contact-item">
                <span className="footer__contact-icon">📍</span>
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
