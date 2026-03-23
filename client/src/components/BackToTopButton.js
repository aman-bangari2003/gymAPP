import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down > 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <button 
        onClick={scrollToTop} 
        style={{
          opacity: isVisible ? 1 : 0,
          visibility: isVisible ? 'visible' : 'hidden',
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)'
        }}
        className="back-to-top-btn"
        aria-label="Back to top"
      >
        <ArrowUp size={24} color="white" />
      </button>

      <style>
        {`
          .back-to-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 55px;
            height: 55px;
            border-radius: 50%;
            background-color: var(--primary-color);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 990;
            box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
            transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.2s ease, box-shadow 0.2s ease;
          }
          .back-to-top-btn:hover {
            transform: scale(1.1) translateY(0) !important;
            background-color: #ea580c; /* slightly darker orange */
            box-shadow: 0 8px 25px rgba(249, 115, 22, 0.6);
          }
          .back-to-top-btn:active {
            transform: scale(0.95) translateY(0) !important;
          }

          @media (max-width: 768px) {
            .back-to-top-btn {
              width: 45px;
              height: 45px;
              bottom: 20px;
              right: 20px;
            }
          }
        `}
      </style>
    </>
  );
};

export default BackToTopButton;
