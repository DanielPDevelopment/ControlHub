import {
  Menu,
  Item,
  Separator,
} from 'react-contexify';
import React, { useState } from 'react';
import 'react-contexify/dist/ReactContexify.css';
import { useSystem } from 'contexts/Systems/SystemContext';
import PopMessage from 'Systems/components/Dialogs/PopMessage';
import RenameDialog from 'Systems/components/Dialogs/RenameDialog';
import GeneralDialogWithAcceptance from 'Systems/components/Dialogs/GeneralDialogWithAcceptance';
import { energyStrings } from 'Systems/components/Modules/moduleInfo';
import PropTypes from 'prop-types';

const ContextMenu = ({ data }) => {
  const {
    copyContent,
    handleCopyContent,
    handlePasteContent,
    handleInformationFileFolder,
    getFileContents,
    activeSystem,
    activateModule,
    deactivateModule,
  } = useSystem();
  const {
    fileName, currentCopied, location, moduleInfo, removeactiveModule,
  } = data;

  const [showPopMessage, setShowPopMessage] = useState(false);
  const [popMessageState, setPopMessageState] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [informationalData, setInformationalData] = useState(null);

  const sizeOnDisk = informationalData?.data.split('\n')?.[1]?.length ? informationalData?.data?.split('\n')[1][4] : informationalData?.data?.split(' ')[4];
  const owner = informationalData?.data.split('\n')?.[1]?.length ? informationalData?.data?.split('\n')[1][2] : informationalData?.data?.split(' ')[2];

  async function handleInformationGrabber() {
    const results = await handleInformationFileFolder({ fileName, sourceLocation: location });
    console.log(results);
    setInformationalData(() => results);
  }

  // React.useEffect(() => {
  //   console.log(informationalData);
  // }, [informationalData]);

  const readFileHandler = async () => {
    await getFileContents({ fileName, sourceLocation: location });
  };

  const popMessageHandler = () => {
    switch (popMessageState) {
      case 'rename':
        return (
          <div className="px-20 py-5">
            <RenameDialog
              fileName={fileName}
              location={location}
              setShowPopMessage={setShowPopMessage}
              connectGeneralArgs={
                                {
                                  showHelp,
                                  setShowHelp,
                                  codeLanguage: '',
                                  code: '',
                                  orientation: 'bottom',
                                  standardHelpMessage:
                                        (
                                          <div>
                                            Renaming a file or folder to an existing name
                                            may overwrite theexisting content without warning.
                                            Ensure that the new name is unique to
                                            avoid accidental data loss.
                                            <br />
                                            Before executing a rename operation, especially
                                            if it involves critical data, consider backing
                                            up the files or folders to prevent irreversible data
                                            loss.
                                          </div>
                                        ),
                                  CallOut: 'Renaming a file or folder should be done with care.',
                                  iconColor: 'red-700',
                                }
                            }
            />
          </div>
        );
      case 'paste':
        return (
          <GeneralDialogWithAcceptance
            message={(
              <div>
                <p className="text-gray-400">{`Pasting ${fileName} here.`}</p>
                <p className="text-red-400">This is a recursive operation.</p>
                <p className="text-red-400 mb-4">Are you sure you want to do this?</p>
              </div>
                          )}
            setShowPopMessage={setShowPopMessage}
            acceptMessage="Yes, Paste"
            cancelMessage="No, Cancel"
            handleAccept={() => {
              handlePasteContent({ fileName, location });
              setShowPopMessage(false);
            }}
            connectGeneralArgs={
                            {
                              showHelp,
                              setShowHelp,
                              codeLanguage: '',
                              code: '',
                              orientation: 'bottom',
                              standardHelpMessage: 'The execution of a command or process that repeats itself by applying the same operation to subdirectories within a directory. The recursion continues until all subdirectories have been processed.',
                              CallOut: 'What is a recursive operation?',
                              iconColor: 'red-700',
                            }
                        }
          />
        );
      case 'information':
        return (
          <GeneralDialogWithAcceptance
            message={(
              <div className="w-full">
                <div className="w-full flex ">
                  <p className="text-white mr-2">Name: </p>
                  <p className="text-gray-400">{fileName}</p>
                </div>
                <div className="w-full flex ">
                  <p className="text-white mr-2">Size on Disk: </p>
                  <p className="text-gray-400">{sizeOnDisk}</p>
                </div>
                <div className="w-full flex ">
                  <p className="text-white mr-2">Owner: </p>
                  <p className="text-gray-400">{owner}</p>
                </div>
                <div className="w-full flex items-center">
                  <p className="text-white mr-2">Location: </p>
                  <p className="text-gray-400 text-xs items-center content-center margin-auto">{location.session.map((item) => (item !== '/' ? `${item}/` : item)).join('')}</p>
                </div>
                {fileName.includes('.') ? (
                  ''
                ) : (
                  <div className="w-full flex ">
                    <p className="text-white mr-2"># of Children: </p>
                    <p className="text-gray-400">{informationalData?.data.split('\n')?.[1]?.length ? informationalData?.data?.split('\n')[1][1] : informationalData?.data?.split(' ')[1]}</p>
                  </div>
                )}
                <p className="text-red-400 mb-4" />
              </div>
                          )}
            setShowPopMessage={setShowPopMessage}
            acceptMessage="Okay"
            handleAccept={() => {
              setInformationalData(null);
              setShowPopMessage(false);
            }}
            connectGeneralArgs={
                            {
                              showHelp,
                              setShowHelp,
                              codeLanguage: '',
                              code: '',
                              orientation: 'bottom',
                              standardHelpMessage:
                                    (
                                      <div>
                                        <span className="text-green-400">`file filename`</span>
                                        : Display the file type of `filename`.
                                        <br />
                                        <span className="text-green-400">`du -h`</span>
                                        : Display disk usage of files and
                                        directories in human-readable format.
                                        <br />
                                        <span className="text-green-400">`df -h`</span>
                                        : Display disk space usage of the file system.
                                      </div>
                                    ),
                              CallOut: 'File & Folder Information Tips',
                              iconColor: 'brand-400',
                            }
                        }
          />
        );
      case 'moduleInformation':
        return (
          <GeneralDialogWithAcceptance
            message={(
              <div className="w-full font-poppins">
                <div className="w-full flex items-center">
                  {moduleInfo.componentInfoIcon}
                  <p className="text-gray-400 uppercase ml-4 text-xl">
                    {' '}
                    {moduleInfo ? moduleInfo.name : ''}
                    {' '}
                    -
                  </p>
                  <a
                    className="text-brand-400 hover:text-brand-600 ml-2"
                    href={moduleInfo.docLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Docs
                  </a>
                </div>
                <div className="w-full flex " />
                <div className="w-full flex mt-2">
                  <p className="text-gray-400 w-full">{moduleInfo.information}</p>
                </div>
                {
                activeSystem.availableModules.includes(moduleInfo.name.toLowerCase())
                && !activeSystem.modules?.includes(moduleInfo.name.toLowerCase())
                  ? (
                    <>
                      <p className="text-green-400 text-xs">{`${moduleInfo.name} was found on your system.`}</p>
                      <p className="text-green-400 text-xs">{energyStrings[[Math.floor(Math.random() * energyStrings.length)]]}</p>

                    </>
                  )
                  : (
                    ''
                  )
                }

                {
                !activeSystem.availableModules.includes(moduleInfo.name.toLowerCase())
                && !activeSystem.modules?.includes(moduleInfo.name.toLowerCase())
                  ? (
                    <>
                      <p className="text-red-400 text-xs">{`${moduleInfo.name} was not found running on this system.`}</p>
                      <p className="text-red-400 text-xs">Please install on system and then reconnect to activate module.</p>

                    </>
                  )
                  : (
                    ''
                  )
}
                {
                activeSystem.modules?.includes(moduleInfo.name.toLowerCase())
                  ? (
                    <p className="text-green-400 text-xs">{`${moduleInfo.name} has been activated.`}</p>
                  )
                  : (
                    ''
                  )
}

                {
                moduleInfo.status === 'notReady'
                  ? (
                    <p className="text-yellow-400 mb-4">In Development</p>
                  )
                  : (<p className="text-red-400 mb-4" />)
}
              </div>
              )}
            setShowPopMessage={setShowPopMessage}
            acceptMessage="Done"
            handleAccept={() => {
              setShowPopMessage(false);
              removeactiveModule(null);
            }}
          />
        );

      default:
        return '';
    }
  };

  return (
    <div className="">
      {showPopMessage
        ? (
          <>
            <div>
              <div className="fixed inset-0 z-40 backdrop-blur-sm backdrop-opacity-70" />
            </div>
            <PopMessage
              className={`z-900 transition-opacity duration-1000 ease-in-out opacity-${showPopMessage ? '100' : '0'}`}
              setShowPopMessage={setShowPopMessage}
            >
              {popMessageHandler()}

            </PopMessage>

          </>
        )
        : (
          ''
        )}

      <Menu
        id="folderRightClick"
        style={{
          '--contexify-menu-bgColor': 'rgba(40, 40, 40, 0.98)',
          '--contexify-separator-color': '#4c4c4c',
          '--contexify-item-color': '#fff',
          '--contexify-activeItem-color': '#fff',
          '--contexify-activeItem-bgColor': '#5771ff',
          '--contexify-rightSlot-color': '#6f6e77',
          '--contexify-activeRightSlot-color': '#fff',
          '--contexify-arrow-color': '#6f6e77',
          '--contexify-activeArrow-color': '#ffffff',
        }}
        className="font-mono text-sm"
      >
        <Item onClick={() => handleCopyContent({ fileName, currentCopied, location })}>
          Copy
        </Item>
        <Item
          onClick={() => {
            setShowPopMessage(true);
            setPopMessageState(() => 'rename');
          }}
        >
          Rename
        </Item>
        <Separator />
        <Item onClick={() => {
          setShowPopMessage(true);
          handleInformationGrabber();
          setPopMessageState(() => 'information');
        }}
        >
          Information
        </Item>
      </Menu>

      <Menu
        id="fileRightClick"
        style={{
          '--contexify-menu-bgColor': 'rgba(40, 40, 40, 0.98)',
          '--contexify-separator-color': '#4c4c4c',
          '--contexify-item-color': '#fff',
          '--contexify-activeItem-color': '#fff',
          '--contexify-activeItem-bgColor': '#5771ff',
          '--contexify-rightSlot-color': '#6f6e77',
          '--contexify-activeRightSlot-color': '#fff',
          '--contexify-arrow-color': '#6f6e77',
          '--contexify-activeArrow-color': '#ffffff',
        }}
        className="font-mono text-sm"
      >

        <Item onClick={readFileHandler}>
          Read
        </Item>
        <Item onClick={() => handleCopyContent({ fileName, currentCopied, location })}>
          Copy
        </Item>
        <Item onClick={() => {
          setShowPopMessage(true);
          setPopMessageState('rename');
        }}
        >
          Rename
        </Item>
        <Separator />
        <Item onClick={() => {
          setShowPopMessage(true);
          handleInformationGrabber();
          setPopMessageState(() => 'information');
        }}
        >
          Information
        </Item>
      </Menu>

      <Menu
        id="directoryRightClick"
        style={{
          '--contexify-menu-bgColor': 'rgba(40, 40, 40, 0.98)',
          '--contexify-separator-color': '#4c4c4c',
          '--contexify-item-color': '#fff',
          '--contexify-activeItem-color': '#fff',
          '--contexify-activeItem-bgColor': '#5771ff',
          '--contexify-rightSlot-color': '#6f6e77',
          '--contexify-activeRightSlot-color': '#fff',
          '--contexify-arrow-color': '#6f6e77',
          '--contexify-activeArrow-color': '#ffffff',
        }}
        className="font-mono text-sm"
      >
        <Item disabled>
          Copy
        </Item>
        <Item
          disabled={!copyContent || !currentCopied || !fileName}
          onClick={() => {
            setShowPopMessage(true);
            setPopMessageState(() => 'paste');
          }}
        >
          Paste
        </Item>
        <Separator />
      </Menu>

      <Menu
        id="modulesDirectory"
        style={{
          '--contexify-menu-bgColor': 'rgba(40, 40, 40, 0.98)',
          '--contexify-separator-color': '#4c4c4c',
          '--contexify-item-color': '#fff',
          '--contexify-activeItem-color': '#fff',
          '--contexify-activeItem-bgColor': '#5771ff',
          '--contexify-rightSlot-color': '#6f6e77',
          '--contexify-activeRightSlot-color': '#fff',
          '--contexify-arrow-color': '#6f6e77',
          '--contexify-activeArrow-color': '#ffffff',
        }}
        className="font-mono text-sm"
      >
        <Item
          disabled={(!activeSystem?.availableModules?.includes(moduleInfo?.name?.toLowerCase()) || moduleInfo.status === 'notReady') && !activeSystem?.modules?.includes(moduleInfo?.name?.toLowerCase())}
          onClick={() => {
            if (activeSystem?.modules.includes(moduleInfo?.name?.toLowerCase())) {
              deactivateModule({
                moduleName: moduleInfo?.name,
              });
            } else {
              activateModule({
                moduleName: moduleInfo?.name,
              });
            }
          }}
        >
          {activeSystem?.modules?.includes(moduleInfo?.name?.toLowerCase()) ? 'Deactivate' : 'Activate'}
        </Item>
        <Item
          onClick={() => {
            setPopMessageState(() => 'moduleInformation');
            setShowPopMessage(true);
          }}
        >
          Information
        </Item>
      </Menu>

    </div>
  );
};

ContextMenu.propTypes = {
  data: PropTypes.shape({
    fileName: PropTypes.string,
    currentCopied: PropTypes.shape({
      targetLocation: PropTypes.array,
      targetName: PropTypes.string,
    }),
    location: PropTypes.shape({
      command: PropTypes.string,
      currentFolder: PropTypes.string,
      data: PropTypes.string,
      folderName: PropTypes.string,
      name: PropTypes.string,
      result: PropTypes.string,
      session: PropTypes.array,
      showHiddenFiles: PropTypes.bool,
    }),
    moduleInfo: PropTypes.object,
    removeactiveModule: PropTypes.func,
  }).isRequired,
};

export default ContextMenu;
