import { useSystem } from 'contexts/Systems/SystemContext';
import WebSocketComponent from './socket/WebSocket';

const Terminal = () => {
  const { activeSystem } = useSystem();

  return (
    <div className="w-full h-[60vh] max-h-[60vh] bg-gray-light shadow-lg">
      <div className="p-4 h-full">
        <WebSocketComponent
          activeSystem={activeSystem}
        />
      </div>
    </div>
  );
};

export default Terminal;
