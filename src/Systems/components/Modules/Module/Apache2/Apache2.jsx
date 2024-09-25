import React, { useState, useEffect } from 'react';
import { useSystem } from 'contexts/Systems/SystemContext';
import TerminalBlock from 'Systems/components/TerminalBlock';
import LoadingModule from 'components/loadingModule/LoadingModule';
import useKeyDown from 'hooks/useKeyDown';
import { moduleData } from '../../moduleInfo';

const Apache2 = () => {
  const { isLoading, Apache2GrabData } = useSystem();
  const [data, setData] = useState(null);
  const [updateLoad, setUpdateLoad] = useState(false);

  const moduleInfo = moduleData.filter((item) => item.name.toLowerCase() === 'apache2')[0];
  const nameStyles = {
    'apache2 -v': {
      title: 'Version',
      subtext: '',
    },
    'tail -n 100 /var/log/apache2/access.log': {
      title: 'Access Logs',
      subtext: 'Trailing last 100 entries of access logs',
    },
    'service apache2 status': {
      title: 'Status',
      subtext: '',
    },
    'tail -n 100 /var/log/apache2/error.log': {
      title: 'Error Logs',
      subtext: 'Trailing last 100 entries of error logs',
    },
  };

  async function getApache2Data(isUpdate = false) {
    let results;

    if (isUpdate) {
      setUpdateLoad(true);
      results = await Apache2GrabData();
      setUpdateLoad(false);
    } else {
      results = await Apache2GrabData();
    }
    setData(() => results);
  }

  useEffect(() => {
    getApache2Data();
  }, []);

  return (
    <div className="w-full bg-gray-light shadow-lg py-4 px-10">
      <div className="font-poppins text-gray-400 pb-2">
        <div className="w-full flex items-center">
          {moduleInfo?.componentInfoIcon}
          <p className="text-gray-400 uppercase ml-4 text-3xl">
            {' '}
            {moduleInfo?.name}
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
        <div className="font-mono pt-2">
          The Apache HTTP Server is a project of
          <span
            onClick={() => window.open('https://www.apache.org/')}
            className="text-brand-400 cursor-pointer hover:text-brand-600"
            onKeyDown={(e) => useKeyDown(e, 'Enter', [() => window.open('https://www.apache.org/')])}
            role="button"
            tabIndex={0}
          >
            {' '}
            The Apache Software Foundation
          </span>
          .
        </div>
      </div>
      <div className="items-center h-full bg-gray-light pb-2 min-h-[60vh]  overflow-y-scroll  module-content scrollbar-hide ">
        {isLoading && !updateLoad ? (
          <LoadingModule message="Getting Apache2 information..." img={moduleInfo?.component} key={moduleInfo?.name} />
        ) : (
          <div className="flex flex-wrap w-full">
            {!data?.errors ? (
              data?.map((item) => {
                let activeStatus;
                let versionControl;
                if (item.name === 'service apache2 status') {
                  activeStatus = item?.result?.split('Active: ')[1]?.split('ago\n')[0].split(';')[0];
                }
                if (item.name === 'apache2 -v') {
                  versionControl = item?.result?.split('version:')[1];
                }
                return (
                  <div className="w-full font-poppins text-gray-400" key={item?.name}>
                    {item.name === 'apache2 -v'
                      ? (
                        <div className="w-full flex flex-wrap justify-start items-center">
                          <p className="text-xs pr-2 text-green-400">
                            Version:
                            {' '}
                          </p>
                          <p className="text-xs">{versionControl}</p>

                        </div>
                      )
                      : (
                        ''
                      )}
                    {item.name === 'service apache2 status' ? (
                      <div className={`pb-4 ${activeStatus.toLowerCase().includes('failed') || activeStatus.toLowerCase().includes('inactive') ? 'text-red-400' : 'text-green-400'}`}>
                        {activeStatus[0].toUpperCase() + activeStatus.slice(1)}
                      </div>
                    ) : ''}
                    {item.name !== 'apache2 -v' && item.name !== 'service apache2 status' ? (
                      <>
                        <h1 className="text-2xl ">{nameStyles[item.name]?.title}</h1>
                        <p className="font-mono text-xs">{nameStyles[item.name]?.subtext || ''}</p>
                        <TerminalBlock codeLanguage="bash" code={item?.result} extra="text-[8px]" />
                      </>
                    ) : ''}
                  </div>
                );
              })
            ) : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default Apache2;
