import React from 'react';
import './Loader.css';

const Loader = ({ 
  size = 'medium', 
  color = 'primary', 
  text = 'Loading...', 
  fullScreen = false,
  type = 'spinner' 
}) => {
  const getLoaderClass = () => {
    let classes = 'loader';
    
    if (fullScreen) {
      classes += ' loader--fullscreen';
    }
    
    return classes;
  };

  const getSpinnerClass = () => {
    let classes = `loader__${type}`;
    classes += ` loader__${type}--${size}`;
    classes += ` loader__${type}--${color}`;
    
    return classes;
  };

  const renderSpinner = () => {
    switch (type) {
      case 'dots':
        return (
          <div className={getSpinnerClass()}>
            <div className="loader__dot"></div>
            <div className="loader__dot"></div>
            <div className="loader__dot"></div>
          </div>
        );
      
      case 'bars':
        return (
          <div className={getSpinnerClass()}>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
          </div>
        );
      
      case 'plant':
        return (
          <div className={getSpinnerClass()}>
            <div className="loader__plant">
              <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 2C13.8 2 12 3.8 12 6C12 8.2 13.8 10 16 10C18.2 10 20 8.2 20 6C20 3.8 18.2 2 16 2Z"
                  fill="currentColor"
                  className="loader__plant-leaf"
                />
                <path
                  d="M16 12C12 12 8 14 8 18V28C8 29.1 8.9 30 10 30H22C23.1 30 24 29.1 24 28V18C24 14 20 12 16 12Z"
                  fill="currentColor"
                  className="loader__plant-stem"
                />
              </svg>
            </div>
          </div>
        );
      
      default:
        return (
          <div className={getSpinnerClass()}>
            <div className="loader__spinner-circle"></div>
          </div>
        );
    }
  };

  return (
    <div className={getLoaderClass()}>
      <div className="loader__content">
        {renderSpinner()}
        {text && <p className="loader__text">{text}</p>}
      </div>
    </div>
  );
};

export default Loader;
