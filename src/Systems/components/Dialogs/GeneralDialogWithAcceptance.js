import { connectHelpGeneral } from 'hooks/InfoAndMeta/useSystems';
import PropTypes from 'prop-types';

const GeneralDialogWithAcceptance = ({
  message, setShowPopMessage, handleAccept, acceptMessage, cancelMessage, connectGeneralArgs,
}) => {
  console.log(connectGeneralArgs);
  return (
    <div className="w-[90vw] md:w-[550px] md:px-10 md:py-5 p-4 overflow-hidden m-auto">
      {/* help section */}
      <div className="w-full pb-1">
        {connectGeneralArgs ? (
          connectHelpGeneral(connectGeneralArgs)
        )
          : ('')}
      </div>
      <div className="w-full flex ">
        {message}
      </div>

      <div className="flex flex-wrap justify-center md:justify-start">

        <button
          className={
                        `
                        mb-4 md:mb-auto linear md:w-[150px] w-full rounded-xl bg-brand-400 py-[12px] text-sm text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 bg-brand-400 hover:bg-brand-600 active:bg-brand-700'}
                    `
                    }
          onClick={handleAccept}
          type="button"
        >
          {acceptMessage}
        </button>

        {cancelMessage ? (
          <button
            className="md:ml-6 linear md:w-[150px] w-full rounded-xl bg-red-700 py-[12px] text-sm text-white transition duration-200 hover:bg-red-900 active:bg-brand-700"
            onClick={() => setShowPopMessage(false)}
            type="button"
          >
            {cancelMessage}
          </button>
        ) : ''}
      </div>

    </div>
  );
};

GeneralDialogWithAcceptance.propTypes = {
  message: PropTypes.node.isRequired,
  setShowPopMessage: PropTypes.func.isRequired,
  handleAccept: PropTypes.func.isRequired,
  acceptMessage: PropTypes.string.isRequired,
  cancelMessage: PropTypes.string.isRequired,
  connectGeneralArgs: PropTypes.object.isRequired,
};

export default GeneralDialogWithAcceptance;
