/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { useSystem } from 'contexts/Systems/SystemContext';
import TerminalBlock from 'Systems/components/TerminalBlock';
import { notify } from 'hooks/InfoAndMeta/useSystems';
import LoadingModule from 'components/loadingModule/LoadingModule';
import AdminControls from './AdminControls';
import ListControls from './ListControls';
import { moduleData } from '../../moduleInfo';

const PM2 = () => {
  const { PM2DataGrab, isLoading } = useSystem();
  const [PM2Data, setPM2Data] = useState(null);
  const [runningProcesses, setRunningProcesses] = useState();
  const [updateLoad, setUpdateLoad] = useState(false);
  const [currentAppLog, setCurrentAppLog] = useState('');

  const moduleInfo = moduleData.filter((item) => item.name.toLowerCase() === 'pm2')[0];
  const nameStyles = {
    'pm2 list': {
      title: 'List',
      subtext: 'List the status of all applications managed by PM2',
    },
    'pm2 logs': {
      title: 'Logs',
      subtext: 'Last 15 lines of logs per application',
    },
    awk: {
      title: 'Admin Controls',
      subtext: 'Control your processes',
    },
  };

  const getPM2DataFN = async (isUpdate = false, currentApp = '') => {
    let results;

    if (isUpdate) {
      setUpdateLoad(true);
      results = await PM2DataGrab(currentApp);
      setUpdateLoad(false);
    } else {
      results = await PM2DataGrab(currentApp);
    }
    setPM2Data(() => results);
  };

  useEffect(() => {
    getPM2DataFN(currentAppLog);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      getPM2DataFN(false, currentAppLog);
    }
  }, [currentAppLog]);

  useEffect(() => {
    let timeoutId;
    if (!isLoading) {
      timeoutId = setInterval(async () => {
        getPM2DataFN(true, currentAppLog);
      }, 15000);
    }
    return () => clearInterval(timeoutId);
  }, [isLoading]);

  return (
    <div className="w-full bg-gray-light shadow-lg py-4 px-4 md:px-10">
      <div className="font-poppins text-gray-400 pb-6">
        <div className="w-full flex items-center">
          {moduleInfo.componentInfoIcon}
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
        <div className="font-mono">ADVANCED, PRODUCTION PROCESS MANAGER FOR NODE.JS</div>
      </div>
      <div className="items-center h-full bg-gray-light pb-2 min-h-[60vh]  overflow-y-scroll  module-content scrollbar-hide ">
        {isLoading && !updateLoad ? (
          <LoadingModule message="Getting PM2 information..." img={moduleInfo?.component} key={moduleInfo?.name} />
        ) : (
          <div className="flex flex-wrap w-full">
            {!PM2Data?.errors ? (
              PM2Data?.map((item) => {
                if (item.name === 'pm2 list | awk \'{if (NR>2) {print $2 "&" $4}}\'') {
                  item.name = 'awk';
                  setRunningProcesses(() => item?.result.split('\n').filter((it) => it !== '&' && it).map((i) => ({
                    id: i.split('&')[0],
                    name: i.split('&')?.[1],
                  })));
                }
                return (
                  <div className="w-full font-poppins text-gray-400" key={item?.name}>
                    {item.name.startsWith('pm2 logs') ? (
                      <div className="text-2xl flex flex-wrap justify-start pt-4">
                        Logs
                        <select
                          className="text-gray-600 bg-gray-0 active:border-0 ml-4 text-sm"
                          value={runningProcesses?.filter((i) => i.id === currentAppLog)?.[0]?.id || ''}
                          onChange={(e) => {
                            setCurrentAppLog(e.target.value);
                          }}
                        >
                          <option
                            value=""
                            className="text-gray-600"
                          />
                          {runningProcesses?.map((process) => (
                            <option
                              key={process.id}
                              value={process.id}
                              className="text-gray-600"
                            >
                              {process.name || process.id}
                            </option>
                          ))}
                        </select>
                      </div>
                    )
                      : (<div className="text-2xl flex flex-wrap justify-start">{nameStyles[item.name]?.title}</div>)}
                    <p className="font-mono text-xs">{nameStyles[item.name]?.subtext || ''}</p>
                    {item.name === 'awk'
                      ? (
                        <AdminControls
                          runningProcesses={runningProcesses}
                          moduleInfo={moduleInfo}
                          getPM2Data={getPM2DataFN}
                        />
                      )
                      : (
                        <>
                          {item.name === 'pm2 list' ? (
                            <ListControls
                              runningProcesses={runningProcesses}
                              moduleInfo={moduleInfo}
                              getPM2Data={getPM2DataFN}
                            />
                          ) : ''}
                          <TerminalBlock codeLanguage="bash" code={item?.result} extra="text-[8px]" />
                        </>
                      )}

                  </div>
                );
              })
            ) : notify({
              messageType: 'Error',
              messageTypeColor: 'red-400 bold',
              message: PM2Data?.errors?.[0]?.msg?.level,
              messageColor: 'red-400',
            })}

          </div>
        )}
      </div>
    </div>
  );
};

export default PM2;
