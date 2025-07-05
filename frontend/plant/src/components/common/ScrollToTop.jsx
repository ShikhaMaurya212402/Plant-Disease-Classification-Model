import React, { useEffect, useState } from 'react';
import './ScrollToTop.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-to-top-container">
      {isVisible && (
        <div className={`scroll-wrapper ${isVisible ? 'pop-in' : 'pop-out'}`}>
          <button onClick={scrollToTop} className="scroll-button">
            <div className="animated-border"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="arrow-icon"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ScrollToTop;