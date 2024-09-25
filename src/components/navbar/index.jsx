import React, { useEffect, useState } from 'react';
import Dropdown from 'components/dropdown';
import { FiAlignJustify } from 'react-icons/fi';
import bracket from 'assets/img/bracket.png';
import bracket2 from 'assets/img/bracket2.png';
import blink from 'assets/img/bracket3.png';
import PropTypes from 'prop-types';

import { useSystem } from 'contexts/Systems/SystemContext';
import useKeyDown from 'hooks/useKeyDown';
import { useAuth } from '../../contexts/user/AuthContext';

const Navbar = (props) => {
  const { onOpenSidenav } = props;
  const { user, signOut } = useAuth();
  const { myState } = useSystem();
  const [avatarState, setAvatarState] = useState();
  const rando = [bracket2, blink];

  useEffect(() => {
    setAvatarState(rando[[Math.floor(Math.random() * rando.length)]]);
  }, [myState]);

  return (
    <nav className="sticky top-4 z-40 ">

      <div className="fixed right-0 mt-[3px] flex h-[61px]  flex-grow items-center justify-around gap-2 rounded-full bg-gray-0 px-2 py-2 shadow-xl  dark:!bg-navy-800 dark:shadow-none  md:flex-grow-0 md:gap-1  xl:gap-2">
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
          onKeyDown={(e) => useKeyDown(e, 'Enter', [onOpenSidenav])}
          role="button"
          tabIndex={0}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>

        <Dropdown
          button={(
            <img
              className="h-10 w-auto rounded-full cursor-pointer xl:mr-4 md:mr-0"
              src={myState === 'blink' ? avatarState : bracket}
              alt="Your face"
            />
          )}
          children={(
            <div className="flex w-56 flex-col justify-start rounded-[20px] bg-gray-light bg-cover bg-no-repeat shadow-xl dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-white dark:text-white">
                    👋 Hey,
                    {' '}
                    {user?.firstname}
                  </p>
                  {' '}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 dark:bg-white/20 " />

              <div className="flex flex-col p-4">
                <a
                  href=" "
                  className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                  onClick={() => signOut()}
                >
                  Log Out
                </a>
              </div>
            </div>
          )}
          classNames="py-2 top-8 -left-[180px] w-max cursor-pointer"
        />
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  onOpenSidenav: PropTypes.func.isRequired,
};

export default Navbar;
