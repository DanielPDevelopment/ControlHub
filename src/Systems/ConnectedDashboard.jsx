import useConnectedDashboard from 'hooks/useConnectedDashboard';
import PropTypes from 'prop-types';
import TopDashboard from './components/TopDashboard';

const ConnectedDashboard = ({ activeSystem, userState, setUserState }) => {
  const [handleUserState] = useConnectedDashboard({ activeSystem, userState });
  return (
    <div className="
        flex flex-wrap m-auto content-start items-start h-full w-[100%] max-w-[100vw] md:w-[100%] px-1 md:max-w-[100vw] xl:w-[800px] xl:max-w-[100%]  2xl:w-[2200px] 2xl:max-w-[calc(80vw-100px)]  "
    >
      <TopDashboard activeSystem={activeSystem} userState={userState} setUserState={setUserState} />
      {handleUserState()}
    </div>
  );
};

ConnectedDashboard.propTypes = {
  activeSystem: PropTypes.object.isRequired,
  userState: PropTypes.string.isRequired,
  setUserState: PropTypes.func.isRequired,
};

export default ConnectedDashboard;
