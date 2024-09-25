import React, { useEffect } from 'react';
import { useSystem } from 'contexts/Systems/SystemContext';
import { getSystemIcons } from 'hooks/InfoAndMeta/useSystems';
import { VscDebugDisconnect } from 'react-icons/vsc';
import useKeyDown from 'hooks/useKeyDown';

const ProjectSection = () => {
  const {
    userSystems, isAdding, setIsAdding,
    setActiveSystem,
    selectActiveSystem,
    disconnectFromSystem, activeSystem,
    isConnected,
  } = useSystem();
  const [allSystems, setAllSystems] = React.useState(userSystems || []);

  useEffect(() => {
    setAllSystems(() => userSystems);
  }, [userSystems]);

  return (
    <>
      <div
        className="relative flex"
      >
        <div className="my-[2px] flex items-center px-4 min-h-[45px]">
          <div className="font-medium uppercase text-white">
            <div className="font-poppins font-bold uppercase text-white dark:text-white flex items-center justify-between">
              Systems
              {' '}
              {' '}
              [
              {!isAdding && (
              <span
                className="items-center text-[30px] line-auto text-brand-400 hover:text-brand-600 cursor-pointer font-normal"
                onClick={() => {
                  setIsAdding(true);
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth', // 'auto' for an instant jump
                  });
                  disconnectFromSystem();
                  setActiveSystem(null);
                }}
                onKeyDown={(e) => useKeyDown(e, 'Enter', [() => {
                  setIsAdding(true);
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth', // 'auto' for an instant jump
                  });
                  disconnectFromSystem();
                  setActiveSystem(null);
                }])}
                role="button"
                tabIndex={0}
              >
                +
              </span>
              )}
              ]
            </div>
          </div>
        </div>
      </div>
      {allSystems?.length > 0 ? (
        allSystems?.map((item) => (
          <div key={item._id}>
            <div
              className="relative mb-1 flex"
            >

              <div className="my-[3px] flex items-center px-4">

                {getSystemIcons(item?.os)}
                <span
                  onClick={() => {
                    selectActiveSystem(item);
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth', // You can use 'auto' for an instant jump
                    });
                  }}
                  className={`text-medium   ${item?.systemName === activeSystem?.systemName ? 'text-green-400 cursor-default' : 'cursor-pointer text-gray-400 hover:text-brand-400'
                  }`}
                  onKeyDown={(e) => useKeyDown(e, 'Enter', [() => {
                    selectActiveSystem(item);
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth', // You can use 'auto' for an instant jump
                    });
                  }])}
                  role="button"
                  tabIndex={0}
                >
                  {item?.systemName}
                </span>
                {item?.systemName === activeSystem?.systemName && isConnected ? (
                  <VscDebugDisconnect
                    className="text-green-400 hover:text-red-400 ml-1 cursor-pointer"
                    onClick={disconnectFromSystem}
                  />
                ) : ''}
              </div>
            </div>

          </div>
        ))
      )
        : (
          <div
            className="relative mb-1 flex hover:cursor-pointer"
          >
            <div
              className="my-[3px] flex cursor-pointer items-center px-8"
              onClick={() => setIsAdding(true)}
              onKeyDown={(e) => useKeyDown(e, 'Enter', [() => setIsAdding(true)])}
              role="button"
              tabIndex={0}
            >
              <p className="text-sm text-gray-400 hover:text-brand-400">
                To begin, connect to a new system
              </p>
            </div>
          </div>

        )}
    </>
  );
};

export default ProjectSection;
