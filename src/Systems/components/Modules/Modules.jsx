import { useState } from 'react';
import ContextMenu from 'helpers/ContextMenu';
import { useSystem } from 'contexts/Systems/SystemContext';
import {
  useContextMenu,
} from 'react-contexify';
import useKeyDown from 'hooks/useKeyDown';
import { moduleData } from './moduleInfo';

export const Modules = () => {
  const [currentModule, setCurrentModule] = useState(null);
  const { activeSystem } = useSystem();
  const { show: showModuleContext } = useContextMenu({
    id: 'modulesDirectory',
  });
  const availableModules = activeSystem?.availableModules;
  const activatedModules = activeSystem?.modules;

  function displayMenu(e) {
    showModuleContext({
      event: e,
      data: {},
    });
  }

  return (
    <div className="w-full bg-gray-light shadow-lg py-4 px-4 md:px-10">
      <ContextMenu data={{
        moduleInfo: currentModule,
        removeactiveModule: setCurrentModule,
      }}
      />
      <div className="font-poppins text-gray-400 pb-6">
        <div className="text-xl md:text-3xl mb-2">Modules</div>
        <div className="font-mono text-xs md:text-sm">
          Tailor each system dashboard to your needs by activating modules
        </div>
      </div>
      <div className="items-center h-[70px] h-full bg-gray-light pb-2 h-[60vh] max-h-[60vh] overflow-scroll  module-content scrollbar-hide ">
        <div className="flex flex-wrap justify-start">
          {moduleData?.sort((a, b) => a.name.localeCompare(b.name))?.map((item) => (
            <div
              key={item.name}
              className={`flex flex-wrap justify-center px-2 py-2 cursor-pointer hover:shadow-lg hover:bg-gray-900 ${activatedModules?.includes(item.name.toLowerCase()) ? 'text-green-400' : ''
              } ${availableModules?.includes(item.name.toLowerCase()) && !activatedModules?.includes(item.name.toLowerCase())
                ? 'text-brand-400'
                : 'text-gray-400'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentModule(() => item);
                displayMenu(e);
              }}
              onContextMenu={(e) => {
                e.stopPropagation();
                if (!currentModule) {
                  setCurrentModule(() => item);
                  displayMenu(e);
                }
              }}
              onKeyDown={(e) => useKeyDown(e, 'Enter', [(ev) => {
                ev.stopPropagation();
                setCurrentModule(() => item);
                displayMenu(ev);
              }])}
              role="button"
              tabIndex={0}
            >
              {item.component}
              <p className="text-center overflow-hidden text-xs md:text-sm font-poppins">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modules;
