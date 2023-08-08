'use client'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp } from '@fortawesome/free-regular-svg-icons';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const checkScrollPosition = () => {
    if (!isVisible && window.pageYOffset > 50) {
      setIsVisible(true);
    } else if (isVisible && window.pageYOffset <= 50) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition, { passive: true });

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, [isVisible]);

  return isVisible ? (
    <button 
      className="border border-gray-300 rounded fixed bottom-10 right-4 bg-white text-black hover:bg-black hover:text-primary text-lg px-2.5 py-1" 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <FontAwesomeIcon icon={faCircleUp} />
    </button>
  ) : null;
}

export default ScrollToTopButton;
