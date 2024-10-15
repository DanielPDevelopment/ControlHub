/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connectHelpGeneral } from 'hooks/InfoAndMeta/useSystems';
import { useSystem } from 'contexts/Systems/SystemContext';
import InputField from 'components/fields/InputField';

const RenameDialog = ({
  fileName, location, setShowPopMessage, connectGeneralArgs,
}) => {
  const { handleRenameContent } = useSystem();
  const [formData, setFormData] = useState({
    targetName: fileName,
    sourceName: fileName,
    sourceLocation: location,
  });

  const [errors, setErrors] = useState('');

  const handleConnect = async (e) => {
    e.preventDefault();
    const results = await handleRenameContent(formData);
    if (results?.errors || results?.errors?.length) {
      setErrors(() => results.errors.msg || results.errors[0].msg);
      console.log('errors');
    } else {
      setShowPopMessage(false);
    }
  };

  return (
    <div className="max-w-[450px] w-[450px] ">
      {/* help section */}
      <div className="w-full pb-1">
        {connectHelpGeneral(connectGeneralArgs)}
      </div>
      <div className="w-full flex ">
        {/* <p className='text-white mr-2'>System name: </p> */}
        <p className="text-gray-400">
          Renaming "
          {fileName}
          "
        </p>
      </div>

      <InputField
        variant="auth"
        extra=" mb-4 min-w-[400px]"
        height="50px"
        label=""
                // placeholder="[ New Name ]"
        id="targetName"
        type="text"
        value={formData.targetName}
        hasLabel={false}
                // autocomplete="off"
                // hasBorder={false}
        onChange={(e) => setFormData({ ...formData, targetName: e.target.value })}
      />

      <button
        className={
                    `
                    linear w-[110px] rounded-xl ${!formData.targetName ? 'bg-gray-400' : 'bg-brand-400 hover:bg-brand-600 active:bg-brand-700'} py-[10px] text-sm text-white transition duration-200 
                    `
                }
        disabled={!formData.targetName}
        onClick={handleConnect}
        type="button"
      >
        Rename
      </button>

      <button
        className="ml-6 linear w-[110px] rounded-xl bg-red-700 py-[10px] text-sm text-white transition duration-200 hover:bg-red-900 active:bg-brand-700"
        onClick={() => setShowPopMessage(false)}
        type="button"
      >
        Cancel
      </button>

      <p className="mt-2 mb-2 text-base text-red-600">
        {errors ? `${errors} ☝` : ''}
      </p>

    </div>
  );
};

export default RenameDialog;
