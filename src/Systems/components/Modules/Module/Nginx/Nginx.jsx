/* eslint-disable no-shadow */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useState, useEffect } from 'react';
import { useSystem } from 'contexts/Systems/SystemContext';
import TerminalBlock from 'Systems/components/TerminalBlock';
import { notify } from 'hooks/InfoAndMeta/useSystems';
import LoadingModule from 'components/loadingModule/LoadingModule';
import { moduleData } from '../../moduleInfo';

const Nginx = () => {
  const { isLoading, NginxGrabData } = useSystem();
  const [data, setData] = useState(null);
  const [updateLoad, setUpdateLoad] = useState(false);
  const [currentDomain, setCurrentDomain] = useState('');

  const moduleInfo = moduleData.filter((item) => item.name.toLowerCase() === 'nginx')[0];
  const nameStyles = [
    {
      key: 'tail -n 1000 /var/log/nginx/access.log',
      title: 'Access Logs',
      subtext: '',
    },
    {
      key: 'service nginx status',
      title: 'Status',
      subtext: '',
    },
    {
      key: 'tail -n 1000 /var/log/nginx/error.log',
      title: 'Error Logs',
      subtext: '',
    },
  ];

  async function getNginxData(isUpdate = false) {
    let results;

    if (isUpdate) {
      setUpdateLoad(true);
      results = await NginxGrabData();
      setUpdateLoad(false);
    } else {
      results = await NginxGrabData();
    }
    setData(() => results);
  }

  useEffect(() => {
    getNginxData();
  }, []);

  useEffect(() => {
    let timeoutId;
    if (!isLoading) {
      timeoutId = setInterval(async () => {
        getNginxData(true);
      }, 15000);
    }
    return () => clearInterval(timeoutId);
  }, [isLoading]);

  return (
    <div className="w-full bg-gray-light shadow-lg py-4 px-4 md:px-10">
      <div className="font-poppins text-gray-400 pb-2">
        <div className="w-full flex items-center">
          {moduleInfo.componentInfoIcon}
          <div className="ml-4 flex items-center">
            <p className="text-gray-400 uppercase text-lg md:text-3xl">
              {moduleInfo?.name}
              {' '}
              -
            </p>
            <a
              className="text-brand-400 hover:text-brand-600 text-xs md:text-sm ml-2"
              href={moduleInfo.docLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Docs
            </a>
          </div>
        </div>
        <div className="font-mono pt-2">[engine x]</div>
      </div>
      <div className="items-center h-full bg-gray-light pb-2 min-h-[60vh] overflow-y-scroll module-content scrollbar-hide">
        {isLoading && !updateLoad ? (
          <LoadingModule message="Getting Nginx information..." img={moduleInfo?.component} key={moduleInfo?.name} />
        ) : (
          <div className="flex flex-wrap w-full">
            {!data?.errors ? (
              data?.map((item) => {
                let activeStatus;
                if (item.name === 'service nginx status') {
                  // eslint-disable-next-line prefer-destructuring
                  activeStatus = item.result.split('Active: ')[1].split('ago\n')[0].split(';')[0];
                }

                const domains = [...new Set([...data?.[1]?.result?.split('\n')?.filter((item) => item)?.map((item) => {
                  const match = item.match(/http:\/\/(.*?).com/);
                  return match ? match[1] : null;
                }).filter((item) => item)
                  .map((item) => {
                    if (item.includes('www.')) {
                      return item.split('www.')[1];
                    }
                    return item;
                  })])].sort();
                return (
                  <div className="w-full font-poppins text-gray-400" key={item?.name}>
                    {item.name.startsWith('service nginx status') ? (
                      <div className={`pb-4 ${activeStatus.toLowerCase().includes('failed') || activeStatus.toLowerCase().includes('inactive') ? 'text-red-400' : 'text-green-400'}`}>
                        {activeStatus[0].toUpperCase() + activeStatus.slice(1)}
                      </div>
                    ) : ('')}

                    {item.name.includes('access.log') ? (
                      <>
                        <div className="text-lg md:text-2xl flex flex-wrap justify-start items-end pt-4 pb-2">
                          Access Logs
                          <div className="flex flex-wrap">
                            <div className="text-xs w-full md:w-auto ml-0 md:ml-6 mb-1">Filter by Domain:</div>
                            <select
                              className="text-gray-600 bg-gray-0 active:border-0 ml-0 md:ml-4 text-xs md:text-sm"
                              value={currentDomain || 'all'}
                              onChange={(e) => {
                                setCurrentDomain(e.target.value);
                              }}
                            >
                              <option
                                value=""
                                className="text-gray-600"
                                label="logs"
                              />
                              {domains?.map((process) => (
                                <option
                                  key={process}
                                  value={process}
                                  className="text-gray-600"
                                >
                                  {process}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <p className="font-mono text-xs">{nameStyles.filter((styles) => item.name.includes(styles.key))?.[0]?.subtext || ''}</p>
                        <TerminalBlock codeLanguage="bash" code={item?.result.split('\n').filter((item) => item && item.includes(currentDomain)).reverse().join('\n')} extra="text-[8px]" />
                      </>
                    ) : ('')}

                    {item.name.includes('error.log') ? (
                      <>
                        <h1 className="text-lg md:text-2xl pt-4">Error Logs</h1>
                        <p className="font-mono text-xs">{nameStyles.filter((styles) => item.name.includes(styles.key))?.[0]?.subtext || ''}</p>
                        <TerminalBlock codeLanguage="bash" code={item?.result.split('\n').reverse().join('\n')} extra="text-[8px]" />
                      </>
                    ) : ('')}
                  </div>
                );
              })
            ) : (
              notify({
                messageType: 'Error',
                messageTypeColor: 'red-400 bold',
                message: '',
                messageColor: 'red-400',
              })
            )}
          </div>
        )}
      </div>
    </div>

  );
};

export default Nginx;
