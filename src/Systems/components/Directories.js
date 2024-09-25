// TODO
// REFACTOR - Pull logic out of this file

import React, { useState } from 'react';
import { useSystem } from 'contexts/Systems/SystemContext';
import { IoReturnDownBackSharp } from 'react-icons/io5';
import { SiHomeassistant } from 'react-icons/si';
import { TbMoodEmpty } from 'react-icons/tb';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import ContextMenu from 'helpers/ContextMenu';
import {
  useContextMenu,
} from 'react-contexify';
import useKeyDown from 'hooks/useKeyDown';
import { getFileExtensionIcons } from '../../hooks/InfoAndMeta/useSystems';
import TerminalBlock from './TerminalBlock';

const Directories = () => {
  const {
    directoryState,
    directoryTraverse,
    copyContent,
    openFileContents,
    setOpenFileContents,
  } = useSystem();
  const directories = directoryState?.data?.split('\n').filter((item) => item);
  const [showHiddenFiles, setShowHiddenFiles] = useState(false);
  let currentFolder = directoryState?.currentFolder || '';
  currentFolder = currentFolder.includes('"') ? currentFolder.replaceAll('"', '') : currentFolder;

  const [contextMenuData, setContextMenuData] = useState();

  const { show: showFile } = useContextMenu({
    id: 'fileRightClick',
  });

  const { show: showFolder } = useContextMenu({
    id: 'folderRightClick',
  });

  const { show: showDirectory } = useContextMenu({
    id: 'directoryRightClick',
  });

  function displayMenuForFile(e, fileName) {
    setContextMenuData(fileName);
    showFile({
      event: e,
      data: {
        currentSelected: fileName,
        currentCopied: copyContent,
      },
    });
  }

  function displayMenuForFolder(e, fileName) {
    setContextMenuData(fileName);
    showFolder({
      event: e,
      data: {
        currentSelected: fileName,
        currentCopied: copyContent,
      },
    });
  }

  function displayMenuForDirectory(e, fileName) {
    showDirectory({
      event: e,
      data: {
        currentSelected: fileName,
        currentCopied: copyContent,
      },
    });
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {openFileContents ? (
        <div className="w-full bg-gray-light shadow-lg">
          <div className="flex wrap justify-between items-center h-[70px] px-10">
            <div className="flex flex-wrap">
              <div className="text-white text-2xl mr-4">
                {openFileContents && openFileContents.sourceName ? `${currentFolder && currentFolder === 'homesysgopoopski' ? 'Root' : currentFolder} - ${openFileContents.sourceName}` : ''}
              </div>
            </div>
            <div className="flex flex-wrap items-center content-center ">
              <IoReturnDownBackSharp
                className="text-white text-2xl cursor-pointer hover:text-brand-400"
                onClick={() => setOpenFileContents(null)}
              />
            </div>

          </div>
          <TerminalBlock
            codeLanguage="javascript"
            code={openFileContents?.data}
          />
        </div>
      )
        : (
          <div
            className="w-full bg-gray-light shadow-lg"
            onContextMenu={(e) => {
              e.stopPropagation();
              displayMenuForDirectory(e);
            }}
          >

            <ContextMenu data={{
              fileName: contextMenuData,
              location: directoryState,
              currentCopied: copyContent,
            }}
            />

            <div className="flex wrap justify-between items-center h-[70px] px-10">
              <div className="flex flex-wrap">
                <SiHomeassistant
                  className="text-white text-2xl cursor-pointer hover:text-brand-400 mr-4"
                  onClick={() => directoryTraverse('homesysgopoopski')}
                />
                <div className="text-white text-2xl mr-4">
                  {currentFolder && currentFolder === 'homesysgopoopski' ? 'Root' : currentFolder}
                </div>
              </div>
              <div className="flex flex-wrap items-center content-center ">
                {showHiddenFiles ? (
                  <BsEye
                    className="mr-10 text-white text-lg cursor-pointer hover:text-brand-200"
                    onClick={() => {
                      directoryTraverse('homesysgopoopskinull', !showHiddenFiles);
                      setShowHiddenFiles((prev) => !prev);
                    }}
                  />
                ) : (
                  <BsEyeSlash
                    className="mr-10 text-white text-lg cursor-pointer hover:text-brand-200"
                    onClick={() => {
                      directoryTraverse('homesysgopoopskinull', !showHiddenFiles);
                      setShowHiddenFiles((prev) => !prev);
                    }}
                  />
                )}
                <IoReturnDownBackSharp
                  className="text-white text-2xl cursor-pointer hover:text-brand-400"
                  onClick={() => directoryTraverse('..', showHiddenFiles)}
                />
              </div>

            </div>
            <div className="h-full bg-gray-light px-4 pb-2 h-[60vh] max-h-[60vh] overflow-scroll  module-content scrollbar-hide ">
              <div className="pb-6 max-h-full w-full overflow-scroll module-content scrollbar-hide grid grid-cols-4 gap-2 md:gap-0 md:grid-cols-8">
                {directories?.filter((item) => item !== '.' && item !== '..').map((directory) => (
                  <div
                    className="flex flex-wrap justify-center hover:bg-gray-light p-2 py-4
                        cursor-pointer hover:shadow-lg hover:bg-gray-900"
                    onClick={!directory.includes('.') ? (() => directoryTraverse(directory, showHiddenFiles)) : ((e) => displayMenuForFile(e, directory))}
                    onContextMenu={directory.includes('.') ? ((e) => { e.stopPropagation(); displayMenuForFile(e, directory); }) : ((e) => { e.stopPropagation(); displayMenuForFolder(e, directory); })}
                    key={directory}
                    onKeyDown={(e) => useKeyDown(e, 'Enter', [!directory.includes('.') ? (() => directoryTraverse(directory, showHiddenFiles)) : ((ev) => displayMenuForFile(ev, directory))])}
                    role="button"
                    tabIndex={0}
                  >
                    {getFileExtensionIcons(directory)}
                    <p className="text-center text-gray-400 overflow-hidden text-sm">
                      {' '}
                      {directory}
                    </p>
                  </div>
                ))}
              </div>
              {directories?.length === 0 ? (
                <div className="flex flex-wrap items-center justify-center w-full">
                  <TbMoodEmpty className="text-gray-400 text-[40px] text-green-400 mr-2" />
                  <p className="text-gray-400 text-xl mr-4"> No files here.</p>
                </div>
              ) : ''}
            </div>
          </div>
        )}
    </>
  );
};

export default Directories;
