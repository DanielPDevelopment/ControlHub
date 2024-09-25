import React, { useState, useEffect } from 'react';
import InputField from 'components/fields/InputField';
import { connectHelp } from 'hooks/InfoAndMeta/useSystems';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import PropTypes from 'prop-types';

const Connect = ({
  activeSystem,
  connectToSystem,
  disconnectFromSystem,
  setIsconnecting,
  isConnecting,
}) => {
  const initialData = {
    ...activeSystem,
    ass: '',
  };
  const [formData, setFormData] = useState(initialData);
  const [showHelp, setShowHelp] = useState(false);
  const [showIP, setShowIP] = useState(false);

  const [errors, setErrors] = useState('');

  useEffect(() => {
    setFormData({ ...activeSystem, ass: '' });
  }, [activeSystem]);

  const handleConnect = async (e) => {
    e.preventDefault();
    setIsconnecting(() => true);
    const results = await connectToSystem(formData);
    if (results?.errors || results?.errors?.length) {
      setErrors(() => results.errors.msg || results.errors[0].msg);
    }
  };

  return (
    <div className="">
      <div className="w-full">
        {connectHelp(activeSystem.os, showHelp, setShowHelp)}
      </div>
      <div className="w-full flex ">
        <p className="text-white mr-2">System name: </p>
        <p className="text-gray-400">{activeSystem.systemName}</p>
      </div>

      <div className="w-full flex ">
        <p className="text-white mr-2">Operating system: </p>
        <p className="text-gray-400">{activeSystem.os}</p>
      </div>

      <div className="w-full flex ">
        <p className="text-white mr-2">Host name: </p>
        {showIP ? (
          <div className="text-gray-400 flex wrap justify-start items-center">
            {activeSystem.host}
            <IoEyeOffOutline
              className="text-gray-400 align-center items-center margin-auto ml-2 hover:text-brand-600 cursor-pointer"
              onClick={() => setShowIP(() => !showIP)}
            />
          </div>
        ) : (
          <div className="text-gray-400 flex wrap justify-start items-center">
            {activeSystem.host.split('').map(() => '*')}
            <IoEyeOutline
              className="cursor-pointer ml-2 text-gray-400 align-center items-center margin-auto hover:text-brand-600"
              onClick={() => setShowIP(() => !showIP)}
            />
          </div>
        )}
      </div>

      <div className="w-full flex ">
        <p className="text-white mr-2">Port: </p>
        <p className="text-gray-400">{activeSystem.port}</p>
      </div>

      <div className="w-full flex ">
        <p className="text-white mr-2">User: </p>
        <p className="text-gray-400">{activeSystem.username}</p>
      </div>

      <form>
        <InputField
          variant="auth"
          extra="mb-4"
          label=""
          placeholder="[ Password ]"
          id="ass"
          type="password"
          value={formData.ass}
          hasLabel={false}
          autocomplete="off"
          onChange={(e) => setFormData((prev) => ({ ...prev, ass: e.target.value }))}
        />
      </form>

      <div className="flex flex-wrap justify-center md:justify-start">
        <button
          className="mb-4 md:mb-auto linear md:w-[150px] w-full rounded-xl bg-brand-400 py-[12px] text-sm text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 "
          disabled={isConnecting}
          onClick={handleConnect}
          type="submit"
        >
          Connect
        </button>

        <button
          className="md:ml-6 linear md:w-[150px] w-full rounded-xl bg-red-700 py-[12px] text-sm text-white transition duration-200 hover:bg-red-900 active:bg-brand-700"
          onClick={disconnectFromSystem}
          type="button"
        >
          Cancel
        </button>
      </div>
      <p className="mt-2 mb-2 text-base text-red-600">
        {errors ? `${errors} ☝` : ''}
      </p>
    </div>
  );
};

Connect.propTypes = {
  activeSystem: PropTypes.object.isRequired,
  connectToSystem: PropTypes.func.isRequired,
  disconnectFromSystem: PropTypes.func.isRequired,
  setIsconnecting: PropTypes.func.isRequired,
  isConnecting: PropTypes.bool.isRequired,
};

export default Connect;
