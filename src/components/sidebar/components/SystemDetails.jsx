import { useSystem } from 'contexts/Systems/SystemContext';
import SystemDetailsExpanded from './SystemDetailsExpanded';

const SystemDetails = () => {
  const { activeSystem } = useSystem();
  return (
    <div className="px-4">
      <div className="flex-wrap flex font-poppins">
        {activeSystem && activeSystem.systemInfo?.[0] ? (
          <div className="mt-8 flex h-fit flex-col pr-2 w-full">
            <p className="text-lg text-left text-white w-full">
              {'' || 'System'}
              {' '}
              Details
            </p>
            <SystemDetailsExpanded systemDetails={activeSystem.systemInfo?.[0]} />
          </div>
        )
          : ('')}
      </div>
    </div>
  );
};

export default SystemDetails;
