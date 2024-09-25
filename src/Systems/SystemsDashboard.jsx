import { useState } from 'react';
import { useSystem } from 'contexts/Systems/SystemContext';
import LoadingModule from 'components/loadingModule/LoadingModule';
import Connect from './components/Connect';
import ConnectedDashboard from './ConnectedDashboard';

const SystemsDashboard = () => {
  const {
    activeSystem, connectToSystem, disconnectFromSystem, isConnected, isConnecting,
    setIsconnecting,
  } = useSystem();
  const [userState, setUserState] = useState('directories');

  return (
    <div className={` ${isConnected ? 'w-full h-full min-h-screen' : 'bg-gray-light p-2 md:p-10 rounded-lg md:px-20'}`}>
      {isConnected
        ? (
          <ConnectedDashboard
            disconnectFromSystem={disconnectFromSystem}
            activeSystem={activeSystem}
            userState={userState}
            setUserState={setUserState}
          />
        )
        : (
          <Connect
            activeSystem={activeSystem}
            connectToSystem={connectToSystem}
            disconnectFromSystem={disconnectFromSystem}
            setIsconnecting={setIsconnecting}
            isConnecting={isConnecting}
          />
        )}
      {isConnecting
        ? (
          <LoadingModule message="Connecting..." />
        )
        : (
          ''
        )}
    </div>
  );
};

export default SystemsDashboard;
