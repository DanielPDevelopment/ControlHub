import { useState } from 'react';
import InputField from 'components/fields/InputField';
import LoadingModule from 'components/loadingModule/LoadingModule';
import useKeyDown from 'hooks/useKeyDown';
import useLinker from 'hooks/useLinker';
import { useAuth } from '../../contexts/user/AuthContext';

import ch2 from '../../assets/img/ch2.png';

const currentBaseName = JSON.parse(process.env.REACT_APP_DEVELOPMENT)
  ? process.env.REACT_APP_BASENAME_DEV : process.env.REACT_APP_BASENAME;

const SignIn = () => {
  const { signIn, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    const results = await signIn(formData);
    if (results?.errors?.length) {
      setErrors(() => results.errors[0].msg);
    }
  };

  return (
    <div className="flex flex-wrap content-center items-center h-full ">

      {isLoading ? (
        <LoadingModule message="Signing in..." />
      )
        : (
          ''
        )}

      {/* Sign in section */}
      <div className=" w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
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
            Sign In
          </h4>
        </div>

        <p className="mb-9 ml-14 mt-[-18px] ml-1 text-white text-gray-400 text-sm ">
          Enter your email and password to sign in!
        </p>
        <form onSubmit={handleSignIn}>
          {/* Email */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="email@email.com"
            id="email"
            type="text"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            autocomplete="username"
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
            autocomplete="current-password"
          />
          {/* Checkbox */}
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
              <p className="ml-2 text-sm font-medium text-gray-400 dark:text-white">
                Keep me logged In
              </p>
            </div>
            <a
              className="text-sm font-medium text-brand-400 hover:text-brand-600 dark:text-white"
              href=" "
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="linear w-full rounded-xl bg-brand-400 py-[12px] text-sm text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 "
          >
            Sign In
          </button>
        </form>

        <div className="mt-3">
          <span className=" text-sm font-medium text-gray-400 dark:text-gray-600">
            Not registered yet?
          </span>
          <a
            href={`${currentBaseName}/#/auth/sign-up`}
            className="ml-1 text-sm font-medium text-brand-400 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </a>
        </div>
        <p className="mt-1 text-base text-red-600">
          {errors ? `${errors} ☝` : ''}
        </p>
      </div>
    </div>
  );
};

export default SignIn;
