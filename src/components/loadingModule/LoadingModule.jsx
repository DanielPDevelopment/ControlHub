import ch2 from 'assets/img/ch2.png';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';

const LoadingModule = ({ message, img }) => (
  <>
    <div>
      <div className="fixed inset-0 z-40 backdrop-blur-sm backdrop-opacity-70" />
    </div>
    <div className="absolute
                        top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 border-brand-400/80
                        border-[0.05px]
                        bg-gray-light py-5 rounded-lg md:px-20 w-[90%] md:max-w-[500px] px-0 shadow-lg text-white z-50 flex flex-wrap justify-center"
    >
      <div className="flex items-end pb-2">
        <img
          src={ch2}
          alt="Logo"
          className="md:h-14 h-6"
          style={{ width: 'auto' }}
        />
        <span className="text-gray-500 md:leading-[60px] leading-[25px]font-poppins md:text-4xl text-md">
          ontrol
          <span className="font-medium text-brand-400">
            h
            <span className="" />
            ub
          </span>
        </span>
      </div>
      <span className="text-center pb-2 md:min-w-[100px] min-w-full w-full flex flex-wrap align-center w-full justify-center">
        <span className="text-brand-400 mr-2">
          <CircularProgress size={20} color="inherit" />
          {' '}
        </span>
        {' '}
        {message}
        <span className="text-creamyWhite/50" />
      </span>
      {img}
    </div>
  </>
);

LoadingModule.propTypes = {
  message: PropTypes.string.isRequired,
  img: PropTypes.node,
};

LoadingModule.defaultProps = {
  img: '',
};

export default LoadingModule;
