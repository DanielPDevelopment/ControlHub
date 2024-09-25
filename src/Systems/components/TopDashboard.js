import { clickableStyling } from 'hooks/InfoAndMeta/useSystems';
import { PiFoldersBold } from 'react-icons/pi';
import { SiGnometerminal } from 'react-icons/si';
import { MdViewModule } from 'react-icons/md';
import { useSystem } from 'contexts/Systems/SystemContext';
import useKeyDown from 'hooks/useKeyDown';
import PropTypes from 'prop-types';
import { moduleData } from './Modules/moduleInfo';

const TopDashboard = ({ userState, setUserState }) => {
  const { activeSystem } = useSystem();
  const activatedModules = activeSystem.modules ? activeSystem.modules : null;

  return (
    <div className="w-full  mb-10 bg-gray-light flex flex-wrap p-4 shadow-lg">
      {/* shortcuts */}
      <div className="flex flex-wrap justify-start w-full">
        <div className="flex flex-wrap border-r border-black mr-4">
          <PiFoldersBold
            className={`${clickableStyling} ${userState === 'directories' ? 'text-green-400' : ''}`}
            onClick={() => setUserState(() => 'directories')}
          />
          <SiGnometerminal
            className={`${clickableStyling} ${userState === 'terminal' ? 'text-green-400' : ''}`}
            onClick={() => setUserState(() => 'terminal')}
          />
          <MdViewModule
            className={`${clickableStyling} ${userState === 'modules' ? 'text-green-400' : ''}`}
            onClick={() => {
              setUserState(() => 'modules');
            }}
          />
        </div>
        <div className="module-Side flex flex-wrap">
          {activatedModules && activatedModules.map((module) => (
            <div
              key={module}
              className={`${clickableStyling} ${userState === module.toLowerCase() ? 'text-green-400' : ''}`}
              onClick={() => {
                setUserState(() => module.toLowerCase());
              }}
              onKeyDown={(e) => useKeyDown(e, 'Enter', [() => setUserState(() => module.toLowerCase())])}
              role="button"
              tabIndex={0}
            >
              {moduleData.filter(
                (item) => item.name.toLowerCase() === module.toLowerCase(),
              )[0].component}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

TopDashboard.propTypes = {
  userState: PropTypes.string.isRequired,
  setUserState: PropTypes.func.isRequired,
};

export default TopDashboard;
