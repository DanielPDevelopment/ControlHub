/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import InputField from 'components/fields/InputField';
import TextField from 'components/fields/TextField';
import { useSystem } from 'contexts/Systems/SystemContext';
import { connectHelp } from 'hooks/InfoAndMeta/useSystems';
import PropTypes from 'prop-types';

const os = [
  'Ubuntu 20+',
  'Windows',
  'iOS',
];

const initialData = {
  systemName: '',
  os: os[0],
  host: '',
  port: '',
  username: '',
  ass: '',
  description: '',
};

const AddProject = ({ setAddProject }) => {
  const [formData, setFormData] = useState(() => initialData);
  const { addSystem, isLoading } = useSystem();
  const [showHelp, setShowHelp] = useState(false);

  const [errors, setErrors] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const results = await addSystem(formData);

    if (results?.errors || results?.errors?.length) {
      setErrors(() => results.errors.msg || results.errors[0].msg);
    } else {
      setAddProject(false);
    }
  };

  return (
    <div className="bg-gray-light md:w-full p-4 lg:p-10 rounded-lg xl:px-20 shadow-xl">
      <form onSubmit={handleSubmit}>
        <div className="w-full">
          {connectHelp(formData.os, showHelp, setShowHelp)}
        </div>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-10">
          <div className="w-full">
            {/* System Name */}
            <InputField
              variant="auth"
              extra="mb-3 lg:min-w-[400px]"
              label="System Name*"
              placeholder="[ System Name ]"
              id="systemName"
              type="text"
              value={formData.systemName}
              onChange={(e) => {
                setFormData({ ...formData, systemName: e.target.value });
              }}
            />

            <label htmlFor="os" className="text-sm text-gray-400 dark:text-white">
              Operating System
              <p className="text-xs text-yellow-400">*Currently only Ubuntu 20+ is supported</p>
            </label>

            <select
              id="os"
              name="os"
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-gray-light p-3 text-sm outline-none text-gray-400 mb-3"
              value={formData.os}
              onChange={(e) => setFormData({ ...formData, os: e.target.value })}
              color="black"
            >

              {os.map((option) => {
                if (option !== 'Ubuntu 20+') {
                  return (
                    <option
                      key={option}
                    // forces each value to be ubuntu 20+ as the other os' are not supported.
                      value={os[0]}
                      className="text-red-400 py-2"
                    >
                      {option}
                    </option>
                  );
                }
                return (
                  <option
                    key={option}
                    value={option}
                    className="text-gray-600 py-2"
                  >
                    {option}
                  </option>
                );
              })}
            </select>

            <InputField
              variant="auth"
              extra="mb-3"
              height="100px"
              label="Host"
              placeholder="[ Host name ]"
              id="host"
              type="text"
              value={formData.host}
              onChange={(e) => setFormData({ ...formData, host: e.target.value })}
            />

            <InputField
              variant="auth"
              extra="mb-3"
              height="100px"
              label="Port"
              placeholder="[ Port number ]"
              id="port"
              type="Number"
              value={formData.port}
              onChange={(e) => setFormData({ ...formData, port: e.target.value })}
            />

          </div>

          <div className="w-full lg:max-w-[420px]">

            <InputField
              variant="auth"
              extra=" mb-3"
              height="100px"
              label="Username"
              placeholder="[ Username ]"
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />

            <InputField
              variant="auth"
              extra=" mb-3"
              height="100px"
              label="Password"
              placeholder="[ Password ]"
              id="ass"
              type="password"
              value={formData.ass}
              onChange={(e) => setFormData({ ...formData, ass: e.target.value })}
            />

            <TextField
              variant="auth"
              extra="mb-3"
              height="100px"
              label="description"
              placeholder="[ Description ]"
              id="description"
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

          </div>

        </div>

        <div className="flex flex-wrap justify-center md:justify-start">
          <button
            className="mb-4 md:mb-auto linear md:w-[150px] w-full rounded-xl bg-brand-400 py-[12px] text-sm text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 "
            disabled={isLoading}
            type="button"
          >
            Add System
          </button>

          <button
            className="md:ml-6 linear md:w-[150px] w-full rounded-xl bg-red-700 py-[12px] text-sm text-white transition duration-200 hover:bg-red-900 active:bg-brand-700"
            onClick={() => setAddProject(false)}
            type="button"
          >
            Cancel
          </button>
        </div>

        <p className="mt-2 mb-2 text-base text-red-600">
          {errors ? `${errors} ☝` : ''}
        </p>

      </form>
    </div>

  );
};

AddProject.propTypes = {
  setAddProject: PropTypes.func.isRequired,
};

export default AddProject;
