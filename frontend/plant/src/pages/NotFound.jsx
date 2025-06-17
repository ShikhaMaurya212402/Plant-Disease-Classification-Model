// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => (
  <div className="not-found">
    <div className="not-found__container">
      <h1 className="not-found__title">404</h1>

      <p className="not-found__message">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link to="/" className="not-found__home-link">
        Go back to Home
      </Link>
    </div>
  </div>
);

export default NotFound;
