import { useState } from 'react';
import InputField from 'components/fields/InputField';
import useKeyDown from 'hooks/useKeyDown';
import useLinker from 'hooks/useLinker';
import { useAuth } from '../../contexts/user/AuthContext';

import ch2 from '../../assets/img/ch2.png';

const currentBaseName = JSON.parse(process.env.REACT_APP_DEVELOPMENT)
  ? process.env.REACT_APP_BASENAME_DEV : process.env.REACT_APP_BASENAME;

const SignUp = () => {
  const { signUp, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    password2: '',
  });
  const [errors, setErrors] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    const results = await signUp(formData);
    if (results.errors.length) {
      setErrors(() => results.errors[0].msg);
    }
  };

  return (
    <div className="flex flex-wrap content-center items-center sm:h-screen lg:h-full ">
      {/* Sign in section */}
      <div className="mt-[5vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[520px]">
        <div
          className="flex items-end cursor-pointer"
          onClick={() => useLinker(currentBaseName || '/')}
          onKeyDown={(e) => useKeyDown(e, 'Enter', [useLinker(currentBaseName || '/')])}
          role="button"
          tabIndex={0}
        >
          <img
            src={ch2}
            alt="Logo"
            className="h-14"
            style={{ width: 'auto' }}
          />
          <span className="text-gray-500 leading-[60px] font-poppins text-4xl">
            ontrol
            <span className="font-medium text-brand-400">
              h
              <span className="" />
              ub
            </span>
          </span>
          <h4 className="ml-2 leading-[50px] mt-2 text-xl font-bold font-mono uppercase text-bold text-gray-400">
            Register
          </h4>
        </div>

        <p className="mb-9 ml-14 mt-[-18px] ml-1 text-white text-gray-400 text-sm ">
          Create your free account to get started!
        </p>

        <form onSubmit={handleSignUp}>

          {/* Email */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="addy@email.com"
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            autocomplete="username"
          />

          {/* Name */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="First Name*"
            placeholder="First Name"
            id="firstname"
            type="text"
            value={formData.firstname}
            onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
          />

          <InputField
            variant="auth"
            extra="mb-3"
            label="Last Name*"
            placeholder="Last Name"
            id="lastname"
            type="text"
            value={formData.lastname}
            onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
          />

          {/* Password */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Password*"
            placeholder="Min. 8 characters"
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            autocomplete="new-password"
          />

          <InputField
            variant="auth"
            extra="mb-3"
            label="Repeat Password*"
            placeholder="Min. 8 characters"
            id="password2"
            type="password"
            value={formData.password2}
            onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
            autocomplete="new-password"
          />
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
              <p className="ml-2 text-sm font-medium text-gray-400 dark:text-white">
                I agree to the terms of service.
              </p>
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="linear mt-2 w-full rounded-xl bg-brand-400 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Register
          </button>
        </form>
        <div className="mt-4">
          <span className=" text-sm font-medium text-gray-400 dark:text-gray-400">
            Already have an account?
          </span>
          <a
            href={`${currentBaseName}/#/auth/sign-in`}
            className="ml-1 text-sm font-medium text-brand-400 hover:text-brand-600 dark:text-white"
          >
            Sign In
          </a>
        </div>
        <p className="mt-1 text-base text-red-600">
          {errors ? `${errors} ☝` : ''}
        </p>
      </div>
    </div>
  );
};

export default SignUp;
