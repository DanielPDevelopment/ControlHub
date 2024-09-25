import React from 'react';

const useSearchToggle = () => {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const handleKeyPress = (event) => {
    if (event.ctrlKey && event.shiftKey && event.key === 'S') {
      setSearchOpen((prev) => !prev);
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  React.useEffect(() => {
    if (searchOpen) {
      const searchInput = document.getElementById('search');
      if (searchInput) {
        searchInput.focus();
      }
    }
  }, [searchOpen]);
  return [searchOpen, setSearchOpen, handleKeyPress];
};

export default useSearchToggle;
