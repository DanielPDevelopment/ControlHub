import { HiX } from 'react-icons/hi';
import { useSystem } from 'contexts/Systems/SystemContext';
import useKeyDown from 'hooks/useKeyDown';
import PropTypes from 'prop-types';
import ProjectSection from './components/ProjectSection';
import ch2 from '../../assets/img/ch2.png';
import SystemInfo from './components/SystemInfo';
import SystemDetails from './components/SystemDetails';

const Sidebar = ({ open, onClose }) => {
  const { isConnected } = useSystem();
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-gray-light pb-10 shadow-xl transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? 'translate-x-0' : '-translate-x-96'
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden text-white"
        onClick={onClose}
        onKeyDown={(e) => useKeyDown(e, 'Enter', [onClose])}
        role="button"
        tabIndex={0}
      >
        <HiX />
      </span>

      <div className="mx-[46px] mt-[50px] flex items-center">
        <div className="mt-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-white dark:text-white">
          <div className="flex items-end">
            <img
              src={ch2}
              alt="Logo"
              className="h-10"
              style={{ width: 'auto' }}
            />
            <span className="text-gray-500 leading-[35px] font-poppins">
              ontrol
              <span className="font-medium text-brand-400">
                h
                <span className="" />
                ub
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />

      <ProjectSection />

      {/* System Info Section */}
      <div className="">
        {isConnected ? (
          <>
            <SystemInfo />
            <SystemDetails />
          </>
        ) : ''}
      </div>

    </div>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;
