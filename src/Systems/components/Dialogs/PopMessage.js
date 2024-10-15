import useKeyDown from 'hooks/useKeyDown';
import PropTypes from 'prop-types';

const PopMessage = ({ children, setShowPopMessage }) => (

  <div
    className="min-w-screen min-h-screen z-50 absolute top-0 min-w-[100%] left-0"
    onClick={() => setShowPopMessage(() => false)}
    onKeyDown={(e) => useKeyDown(e, 'Enter', [() => setShowPopMessage(() => false)])}
    role="button"
    tabIndex={0}
  >
    <div
      className="transition-all duration-300 ease-in-out absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 border-brand-400/80 border-[0.05px] bg-gray-light rounded-lg  shadow-lg text-white z-50"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => useKeyDown(e, 'Enter', [(y) => y.stopPropagation()])}
      role="button"
      tabIndex={0}

    >

      {children}
    </div>
  </div>

);

PopMessage.propTypes = {
  children: PropTypes.node.isRequired,
  setShowPopMessage: PropTypes.func.isRequired,
};

export default PopMessage;
