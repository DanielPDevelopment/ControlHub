/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unsafe-optional-chaining */
import { useState } from 'react';
import GeneralDialogWithAcceptance from 'Systems/components/Dialogs/GeneralDialogWithAcceptance';
import { MdOutlineNotStarted, MdOutlineStopCircle, MdOutlineRestartAlt } from 'react-icons/md';
import PopMessage from 'Systems/components/Dialogs/PopMessage';
import { useSystem } from 'contexts/Systems/SystemContext';
import PropTypes from 'prop-types';

const AdminControls = ({ runningProcesses, moduleInfo, getPM2Data }) => {
  const [showPopMessage, setShowPopMessage] = useState(false);
  const clickableStyling = `mr-2 text-2xl ${runningProcesses?.length ? 'text-white cursor-pointer hover:text-brand-400' : 'text-gray-700'}`;
  const [action, setAction] = useState();

  const [formData, setFormData] = useState({ action, application_id: '' });
  const { PM2ServiceControl } = useSystem();

  return (
    <>
      <div className="pt-2 pb-4 flex flex-wrap justify-start w-full">
        <MdOutlineNotStarted
          className={`${clickableStyling}`}
          onClick={() => {
            setShowPopMessage(true);
            setAction('start');
            setFormData({ ...formData, action: 'start' });
          }}
        />
        <MdOutlineStopCircle
          className={`${clickableStyling}`}
          onClick={() => {
            setShowPopMessage(true);
            setAction('stop');
            setFormData({ ...formData, action: 'stop' });
          }}
        />
        <MdOutlineRestartAlt
          className={`${clickableStyling}`}
          onClick={() => {
            setShowPopMessage(true);
            setAction('restart');
            setFormData({ ...formData, action: 'restart' });
          }}
        />
      </div>
      {showPopMessage ? (
        <PopMessage setShowPopMessage={setShowPopMessage}>
          <GeneralDialogWithAcceptance
            message={(
              <div className="w-full font-poppins">
                <div className="w-full flex items-center">
                  {moduleInfo.componentInfoIcon}
                  <p className="text-gray-400 uppercase ml-4 text-xl">
                    {' '}
                    {moduleInfo?.name}
                    {' '}
                    -
                  </p>
                  <p className="text-brand-400 ml-4 text-xl">
                    {' '}
                    {`${action?.[0].toUpperCase() + action?.slice(1)} Application` || 'Please Wait'}
                  </p>
                </div>
                <div className="w-full flex ">

                  {/* <p className='text-gray-400'>{moduleInfo.docLink}</p> */}
                </div>
                <div className="w-full flex mt-2 flex-wrap">
                  {/* <p className='text-white mr-2'>Owner: </p> */}
                  <p className="pb-4 text-gray-400 w-full">{`Select which application you want to ${(action?.[0].toUpperCase() + action?.slice(1)) || 'Please Wait'}`}</p>
                  <select
                    className="text-gray-600 bg-gray-0 mb-10 active:border-0"
                    onChange={(e) => setFormData({ ...formData, application_id: e.target.value })}
                  >
                    <option
                      value=""
                      className="text-gray-600"
                    />
                    {runningProcesses.map((process) => (
                      <option
                        key={process.id}
                        value={process.id}
                        className="text-gray-600"
                      >
                        {process.name || process.id}
                      </option>
                    ))}
                  </select>
                </div>

                <p className="text-red-400 mb-4" />
              </div>
                          )}
            setShowPopMessage={setShowPopMessage}
            acceptMessage={(action?.[0].toUpperCase() + action?.slice(1)) || 'Please Wait'}
            handleAccept={async () => {
              if (formData.application_id) {
                PM2ServiceControl(formData);
                await getPM2Data();
              }
            }}
            cancelMessage="Cancel"
          />
        </PopMessage>
      ) : ''}

    </>
  );
};

AdminControls.propTypes = {
  runningProcesses: PropTypes.array,
  moduleInfo: PropTypes.object.isRequired,
  getPM2Data: PropTypes.func.isRequired,
};

AdminControls.defaultProps = {
  runningProcesses: [],
};

export default AdminControls;
