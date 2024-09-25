import { useState } from 'react';
import Modules from 'Systems/components/Modules/Modules';
import Directories from 'Systems/components/Directories';
import Terminal from 'Systems/components/Terminal';
import modules from 'Systems/components/Modules/Module/Index';
import pm2Help from 'Systems/helpText/pm2help';
import PropTypes from 'prop-types';
import { connectHelpGeneral } from './InfoAndMeta/useSystems';

const useConnectedDashboard = ({ activeSystem, userState }) => {
  const tips = [
    '👍  Tip: Terminal sessions start at your current directory',
    '📝  Tip: Directory locations are saved between sessions',
    '⌚  Tip: Create, Rename, Delete are coming soon',
    '⚠️  Warning: All changes effect your remote machine.',
  ];
  const [showHelp, setShowHelp] = useState(false);
  const handleUserState = () => {
    switch (userState) {
      case 'modules':
        return (
          <>
            <Modules />
            <HelpAndTips />
          </>
        );
      case 'directories':
        return (
          <>
            <Directories activeSystem={activeSystem} />
            <div className="flex flex-wrap w-full">
              <HelpAndTips code="" />
            </div>
          </>
        );
      case 'terminal':
        return (
          <>
            <Terminal activeSystem={activeSystem} />
            <div className="flex flex-wrap w-full">
              <p className="flex items-center w-full text-gray-400 text-xs mt-2">
                👍  We recommend using pm2 to handle server processes remotely
              </p>
              <HelpAndTips code={pm2Help} />
            </div>
          </>
        );
      default: {
        const module = modules.filter((item) => item.name.toLowerCase() === userState);
        return (
          <>
            {module && module[0].component ? module[0].component : ''}
            <div className="flex flex-wrap w-full">
              <p className="flex items-center w-full text-gray-400 text-xs mt-2" />
              <HelpAndTips code="" />
            </div>
          </>
        );
      }
    }
  };

  const HelpAndTips = ({ code }) => (
    <div className="flex flex-wrap w-full">
      <p className="flex items-center w-full text-gray-400 text-xs my-1">
        {tips[[Math.floor(Math.random() * tips.length)]]}
      </p>
      {connectHelpGeneral({
        showHelp,
        setShowHelp,
        codeLanguage: 'markdown',
        code,
        CallOut: 'Feature List',
        orientation: 'bottom',
        extra: 'w-full',
        extraCallOut: '!mt-0 pt-0',
      })}
    </div>
  );

  HelpAndTips.propTypes = {
    code: PropTypes.string,
  };

  HelpAndTips.defaultProps = {
    code: '',
  };

  return [handleUserState];
};

export default useConnectedDashboard;
