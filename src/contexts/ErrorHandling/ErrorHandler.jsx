import React, { useState, useEffect } from 'react';
import ch2 from 'assets/img/ch2.png';
import { connectHelpGeneral } from 'hooks/InfoAndMeta/useSystems';
import PropTypes from 'prop-types';

const signout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('projects');
  localStorage.removeItem('active');
  localStorage.removeItem('activeTest');
};

export const ErrorFallback = ({ error, showHelp, setShowHelp }) => (

  <div className="bg-gray-0 min-h-screen flex flex-col items-center justify-center md:px-0 px-2">
    <div className="fixed top-0 left-0 p-4 z-50">
      <div className="flex items-end pb-2">
        <img
          src={ch2}
          alt="Logo"
          className="md:h-12 h-6"
          style={{ width: 'auto' }}
        />
        <span className="text-gray-500 md:leading-[50px] leading-[25px] font-poppins md:text-2xl text-base">
          ontrol
          <span className="font-medium text-brand-400">
            h
            <span className="" />
            ub
          </span>
        </span>
      </div>
    </div>
    <div className="bg-gray-light p-6 rounded-lg md:p-10 md:w-2/3 w-full shadow-xl">
      <div className="flex flex-col items-start mb-4">
        <div className="text-brand-400 font-poppins md:text-[50px] text-4xl ">Don't Panic!</div>
        <div className="text-gray-400 font-mono text-xs">Just a tiny little error.</div>
      </div>
      <div className="text-gray-400 font-mono text-sm">
        Something went wrong, but don't worry, we've caught it.
      </div>
      <div className="text-gray-400 font-mono mb-2 text-sm">
        Let's sort this out together.
      </div>
      <div className="flex flex-wrap items-center mb-4 text-gray-400">
        <div className="">Would you like to </div>
        <button
          className="px-2 linear rounded-xl py-2 text-sm text-white transition duration-200 hover:text-brand-400"
          type="submit"
          onClick={() => window.location.reload()}
        >
          Refresh the page
        </button>
        <div className="">or</div>
        <button
          className="px-2 linear rounded-xl py-2 text-sm text-white transition duration-200 hover:text-brand-400"
          type="submit"
          onClick={() => {
            signout();
            window.location.reload();
          }}
        >
          Sign out?
        </button>
      </div>
      <div className="w-full">
        {connectHelpGeneral({
          showHelp,
          setShowHelp,
          codeLanguage: 'bash',
          code: `${error?.error?.stack?.split(':')[0]
            ? `Type: ${
              error?.error?.stack?.split(':')[0]
            }\n`
                        + `Message:${
                          error?.error?.stack?.split(
                            error?.error?.stack?.split(':')[0],
                          )[1]}`
            : error?.message || error?.reason?.stack
          } `,
          extra: 'w-full max-w-[100%] text-white',
          orientation: 'bottom',
          standardHelpMessage: '',
          CallOut: "What's this error?",
          iconColor: 'red-700',
          extraCallOut: '!text-center font-poppins',
        })}
      </div>
    </div>
  </div>

);

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const errorHandler = (e) => {
      setError(e);
      setHasError(true);
    };

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', errorHandler);
    };
  }, []);

  return hasError
    ? <ErrorFallback error={error} showHelp={showHelp} setShowHelp={setShowHelp} /> : children;
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

ErrorFallback.propTypes = {
  error: PropTypes.object.isRequired,
  showHelp: PropTypes.bool.isRequired,
  setShowHelp: PropTypes.func.isRequired,
};

export default ErrorBoundary;
