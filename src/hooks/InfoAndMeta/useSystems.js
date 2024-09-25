import { DiUbuntu, DiWindows, DiApple } from 'react-icons/di';
import { VscWorkspaceUnknown, VscFilePdf } from 'react-icons/vsc';

import { GoFileDirectory } from 'react-icons/go';
import { IoLogoJavascript, IoDocumentTextOutline } from 'react-icons/io5';
import { AiOutlineFileMarkdown, AiFillFileUnknown } from 'react-icons/ai';

import { FaFile } from 'react-icons/fa';

import { PiFileHtmlFill } from 'react-icons/pi';
import { MdOutlineBatchPrediction } from 'react-icons/md';
import { GrDocumentZip } from 'react-icons/gr';
import { BsFiletypeJson, BsFillQuestionDiamondFill } from 'react-icons/bs';
import { SiTypescript } from 'react-icons/si';
import toast from 'react-hot-toast';
import ch2 from 'assets/img/ch2.png';

import TerminalBlock from 'Systems/components/TerminalBlock';
import useKeyDown from 'hooks/useKeyDown';

export const clickableStyling = 'text-white mr-2 text-2xl cursor-pointer hover:text-brand-400';

export const notify = ({
  messageType, messageTypeColor, message, messageColor,
}) => toast.custom((t) => (
  <div
    className={`${t.visible ? 'animate-enter' : 'animate-leave'
    } max-w-md w-full bg-gray-light shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-brand-400 ring-opacity-5 border-1 border-brand-400 border border-transparent border-brand-400/80 `}
  >
    <div className="flex-1 w-0 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          <img
            className="h-10 w-[auto]"
            src={ch2}
            alt=""
          />
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm font-medium ${messageTypeColor ? `text-${messageTypeColor}` : 'text-gray-400'} font-mono`}>
            {messageType}
          </p>
          <p className={`mt-1 text-sm ${messageColor ? `text-${messageColor}` : 'text-gray-400'} font-poppins`}>
            {message}
          </p>
        </div>
      </div>
    </div>
    <div className="flex border-l border-gray-light">
      <button
        onClick={() => toast.dismiss(t.id)}
        className="w-full border border-transparent border-brand-400/80 rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-400 hover:text-brand-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-poppins"
        type="button"
      >
        Close
      </button>
    </div>
  </div>
));

export function getFileExtensionIcons(fileName) {
  const styling = 'w-full text-gray-400 text-[30px]';

  switch (true) {
    case fileName.endsWith('.json'):
      return <BsFiletypeJson className={styling} />;
    case fileName.endsWith('.js'):
      return <IoLogoJavascript className={styling} />;
    case fileName.endsWith('.md'):
      return <AiOutlineFileMarkdown className={styling} />;
    case fileName.endsWith('.jsx'):
      return <IoLogoJavascript className={styling} />;
    case fileName.endsWith('.exe'):
      return <FaFile className={styling} />;
    case fileName.endsWith('.pdf'):
      return <VscFilePdf className={styling} />;
    case fileName.endsWith('.txt'):
      return <IoDocumentTextOutline className={styling} />;
    case fileName.endsWith('.html') || fileName.endsWith('.com'):
      return <PiFileHtmlFill className={styling} />;
    case fileName.endsWith('.bat'):
      return <MdOutlineBatchPrediction className={styling} />;
    case fileName.endsWith('.zip'):
      return <GrDocumentZip className={styling} />;
    case fileName.endsWith('.ts'):
      return <SiTypescript className={styling} />;

    case !fileName.includes('.'):
      return <GoFileDirectory className={styling} />;
    default:
      return <AiFillFileUnknown className={styling} />;
  }
}

export function getSystemIcons(systemOs) {
  const styling = 'text-white mr-1';
  switch (systemOs) {
    case 'Ubuntu 20+':
      return <DiUbuntu className={styling} />;
    case 'iOS':
      return <DiApple className={styling} />;
    case 'Windows':
      return <DiWindows className={styling} />;
    default:
      return <VscWorkspaceUnknown className={styling} />;
  }
}

export function connectHelp(os, showHelp, setShowHelp) {
  switch (os) {
    case 'Ubuntu 20+':
      return (
        <div>
          {showHelp ? (
            <TerminalBlock
              codeLanguage="shell"
              code={
                                'sudo apt update\nsudo apt install openssh-server'
                            }
            />
          ) : ''}
          <div
            className="flex items-center w-full text-gray-400 text-xs mb-4 cursor-pointer hover:text-brand-400"
            onClick={() => setShowHelp((prev) => !prev)}
            onKeyDown={(e) => useKeyDown(e, 'Enter', [setShowHelp((prev) => !prev)])}
            role="button"
            tabIndex={0}
          >
            <BsFillQuestionDiamondFill className="mr-2" />
            Remember to ensure that you have ssh available on your Ubuntu Machine
          </div>
        </div>
      );
    case 'Windows':
      return (
        <div>
          {showHelp ? (
            <>
              <div className="text-gray-400 text-xs font-mono">
                <div className="font-bold font-poppins">Enable OpenSSH Server:</div>
                <div>
                  • Go to Apps -
                  {'>'}
                  {' '}
                  Optional Features.
                </div>
                <div>
                  • Scroll down, find OpenSSH Server and
                  OpenSSH Client and click Install.
                </div>
                <div className="font-bold font-poppins mt-2">Start the OpenSSH Server:</div>
                <div>
                  • Open the Services application (you can press Win + R
                  , type services.msc, and press Enter).
                </div>
                <div>• Locate OpenSSH SSH Server in the list.</div>
                <div>
                  • Right-click on it, select Start,
                  and set the Startup type to Automatic
                  if you want it to start automatically with Windows.
                </div>
              </div>
              <TerminalBlock
                codeLanguage="batch"
                code={
                                    '// check status of openssh\nsc query sshd'
                                }
              />
              <div className="text-gray-400 text-xs font-bold font-poppins mt-2">Find your username:</div>
              <TerminalBlock
                codeLanguage="batch"
                code="whoami"
              />

            </>
          ) : ''}
          <div
            className="flex items-center w-full text-gray-400 text-xs mb-4 cursor-pointer hover:text-brand-400"
            onClick={() => setShowHelp((prev) => !prev)}
            onKeyDown={(e) => useKeyDown(e, 'Enter', [setShowHelp((prev) => !prev)])}
            role="button"
            tabIndex={0}
          >
            <BsFillQuestionDiamondFill className="mr-2" />
            Remember to ensure that you have ssh available on your Windows Machine
          </div>
        </div>
      );
    default:
      return (
        <div>
          <div
            className="flex items-center w-full text-gray-400 text-xs mb-4"
          >
            <BsFillQuestionDiamondFill className="mr-2" />
            Remember to ensure that you have ssh available on your Machine
          </div>
        </div>
      );
  }
}

export function connectHelpGeneral({
  showHelp,
  setShowHelp,
  codeLanguage,
  code,
  CallOut,
  orientation = 'top',
  extra,
  extraCallOut,
  iconColor,
  standardHelpMessage = '',
}) {
  const orientationSanitized = orientation.toLowerCase();
  return (
    <div className={`${extra}`}>
      {showHelp && code && !standardHelpMessage && orientationSanitized === 'top' ? (
        <TerminalBlock
          codeLanguage={codeLanguage}
          code={code}
        />
      ) : ''}
      {showHelp && !code && standardHelpMessage && orientationSanitized === 'top' ? (
        <div className="font-mono text-xs">{standardHelpMessage}</div>
      ) : ''}
      <div
        className={`flex items-center w-full text-gray-400 text-xs 
                ${orientationSanitized === 'top' ? 'mb-2' : ''} 
                ${code || standardHelpMessage ? 'cursor-pointer hover:text-brand-400' : ''} 
                ${extraCallOut || ''} 
                ${iconColor ? `!text-${iconColor}` : ''}`}
        onClick={code || standardHelpMessage ? () => setShowHelp((prev) => !prev) : null}
        onKeyDown={(e) => useKeyDown(e, 'Enter', [code || standardHelpMessage ? () => setShowHelp((prev) => !prev) : null])}
        role="button"
        tabIndex={0}
      >
        <BsFillQuestionDiamondFill className={`mr-2 ${iconColor ? `text-${iconColor}` : ''}`} />
        {CallOut}
      </div>
      {showHelp && code && !standardHelpMessage && orientationSanitized === 'bottom' ? (
        <TerminalBlock
          codeLanguage={codeLanguage}
          code={code}
        />
      ) : ''}
      {showHelp && !code && standardHelpMessage && orientationSanitized === 'bottom' ? (
        <div className="font-mono text-xs py-1">{standardHelpMessage}</div>
      ) : ''}
    </div>
  );
}
