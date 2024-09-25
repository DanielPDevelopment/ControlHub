import { useState } from 'react';
import GeneralDialogWithAcceptance from 'Systems/components/Dialogs/GeneralDialogWithAcceptance';
import { RiSave2Line } from 'react-icons/ri';
import { GiTargetDummy } from 'react-icons/gi';
import PopMessage from 'Systems/components/Dialogs/PopMessage';
import { useSystem } from 'contexts/Systems/SystemContext';
import PropTypes from 'prop-types';
import useHelpers from 'hooks/useHelpers';

const ListControls = ({ runningProcesses, moduleInfo, getPM2Data }) => {
  const [showPopMessage, setShowPopMessage] = useState(false);
  const clickableStylingSave = `mr-2 text-2xl ${runningProcesses?.length ? 'text-white cursor-pointer hover:text-brand-400' : 'text-gray-700'}`;
  const clickableStylingResurrect = `mr-2 text-2xl ${runningProcesses?.length === 1 ? 'text-white cursor-pointer hover:text-brand-400' : 'text-gray-700'}`;
  const [action, setAction] = useState();

  const [formData, setFormData] = useState({ action, application_id: '' });
  const { PM2ServiceControl } = useSystem();

  const { GetCapital } = useHelpers();

  return (
    <>
      <div className="pt-2 pb-4 flex flex-wrap justify-start w-full">
        <RiSave2Line
          className={`${clickableStylingSave}`}
          onClick={() => {
            setShowPopMessage(true);
            setAction('save');
            setFormData({ ...formData, action: 'save' });
          }}
        />
        <GiTargetDummy
          className={`${clickableStylingResurrect}`}
          onClick={() => {
            setShowPopMessage(true);
            setAction('resurrect');
            setFormData({ ...formData, action: 'resurrect' });
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
                  <p className="text-brand-400 ml-2 text-xl">
                    {' '}
                    {`${GetCapital(action)} Applications` || 'Please Wait'}
                  </p>
                </div>
                <div className="w-full flex ">

                  {/* <p className='text-gray-400'>{moduleInfo.docLink}</p> */}
                </div>
                <div className="w-full flex mt-2 flex-wrap">
                  {/* <p className='text-white mr-2'>Owner: </p> */}
                  <p className="pb-4 text-gray-400 w-full">{`${GetCapital(action)} this current application list?`}</p>

                </div>

                <p className="text-red-400 mb-4" />
              </div>
                          )}
            setShowPopMessage={setShowPopMessage}
            acceptMessage={GetCapital(action) || 'Please Wait'}
            handleAccept={async () => {
              PM2ServiceControl(formData);
              await getPM2Data();
            }}
            cancelMessage="Cancel"
          />
        </PopMessage>
      ) : ''}
    </>
  );
};

ListControls.propTypes = {
  runningProcesses: PropTypes.array,
  moduleInfo: PropTypes.object.isRequired,
  getPM2Data: PropTypes.func.isRequired,
};

ListControls.defaultProps = {
  runningProcesses: [],
};

export default ListControls;
