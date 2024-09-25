import React from 'react';
import PropTypes from 'prop-types';
import useKeyDown from 'hooks/useKeyDown';

function useOutsideAlerter(ref, setX) {
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setX(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setX]);
}

const Dropdown = (props) => {
  const {
    button, children, classNames, animation = false,
  } = props;
  const wrapperRef = React.useRef(null);
  const [openWrapper, setOpenWrapper] = React.useState(false);
  useOutsideAlerter(wrapperRef, setOpenWrapper);

  return (
    <div ref={wrapperRef} className="relative flex">
      <div className="flex" onClick={() => setOpenWrapper(!openWrapper)} onKeyDown={(e) => useKeyDown(e, 'Enter', [() => setOpenWrapper(!openWrapper)])} role="button" tabIndex={0}>
        {button}
      </div>
      <div
        className={`${classNames} absolute z-10 ${
          animation || 'origin-top-right transition-all duration-300 ease-in-out'
        } ${openWrapper ? 'scale-100' : 'scale-0'}`}
      >
        {children}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  button: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  classNames: PropTypes.string.isRequired,
  animation: PropTypes.bool,
};

Dropdown.defaultProps = {
  animation: false,
};

export default Dropdown;
