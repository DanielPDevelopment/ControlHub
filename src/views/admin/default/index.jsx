/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import AddProject from 'Systems/components/forms/AddProject';
import { useSystem } from 'contexts/Systems/SystemContext';
import useFetchUser from 'hooks/useFetchUser';
import SystemsDashboard from 'Systems/SystemsDashboard';
import TerminalBlock from 'Systems/components/TerminalBlock';

const Dashboard = () => {
  const {
    getAllSystems, userSystems, isAdding, setIsAdding, activeSystem,
  } = useSystem();
  const [allSystems, setAllSystems] = useState(userSystems || []);
  const [isLoading, setIsLoading] = useState(true);
  useFetchUser();

  useEffect(() => {
    getAllSystems();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setAllSystems(() => userSystems);
  }, [userSystems]);

  return (
    <div className="items-start min-h-screen w-full flex justify-center">
      {!isLoading && !activeSystem && (
        isAdding === false
          ? (
            <>
              {allSystems && allSystems.length < 1
                ? (
                  <div className="flex flex-wrap items-center justify-center min-h-screen content-center">
                    <div className="mt-2 text-white w-full lg:w-[50%] max-w-full">

                      <div className="font-mono text-xs py-1">
                        <h2 className="text-lg font-bold uppercase">Getting Started:</h2>
                        <h3 className="text-base py-2">
                          Using
                          <span className="text-gray-400 font-bold uppercase">Control</span>
                          <span className="uppercase text-brand-400 font-bold uppercase font-medium">Hub</span>
                          {' '}
                          is easy, but there are a few things you need
                          to do on your systems to ensure a smooth experience.
                        </h3>
                        <hr className="py-1 text-gray-400/80" />
                        <h4 className="font-bold uppercase pb-1">Ubuntu Systems:</h4>
                        <ol className="text-gray-400">
                          <li>
                            <span>
                              1. Make sure you have
                              <span>SSH installed on your system</span>
                              <TerminalBlock
                                codeLanguage="bash"
                                extra="md:w-[100%] w-[90vw]"
                                code={`
# Install OpenSSH
sudo apt-get update
sudo apt-get install openssh-client openssh-server

# Check if SSH is installed
ssh -V
                        `}
                              />
                            </span>
                          </li>

                          <li>
                            <span>
                              2. Ensure your system is reachable.
                              <span>Check firewall settings.</span>
                            </span>
                          </li>

                          <li>
                            <span>3. Enjoy!</span>
                          </li>
                        </ol>

                        <h4 className="font-bold uppercase pt-2 pb-1">iOS Systems:</h4>
                        <ol className="text-gray-400">
                          <li>
                            <span>Future Feature.</span>
                          </li>
                        </ol>

                        <h4 className="font-bold uppercase pt-2 pb-1">Windows Systems:</h4>
                        <ol className="text-gray-400">
                          <li>
                            <span>Future Feature.</span>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center justify-center min-h-screen content-center">
                    <div className="mt-2 text-white w-full lg:w-[50%] max-w-full">

                      <div className="font-mono text-xs py-1">
                        <h2 className="text-lg font-bold uppercase">Getting Started:</h2>
                        <h3 className="text-base py-2">
                          Using
                          <span className="text-gray-400 font-bold uppercase">Control</span>
                          <span className="uppercase text-brand-400 font-bold uppercase font-medium">Hub</span>
                          {' '}
                          is easy, but there are a few things you need
                          to do on your systems to ensure a smooth experience.
                        </h3>
                        <hr className="py-1 text-gray-400/80" />
                        <h4 className="font-bold uppercase pb-1">Ubuntu Systems:</h4>
                        <ol className="text-gray-400">
                          <li>
                            <span>
                              1. Make sure you have
                              <span>SSH installed on your system</span>
                              <TerminalBlock
                                codeLanguage="bash"
                                extra="md:w-[100%] w-[90vw]"
                                code={`
# Install OpenSSH
sudo apt-get update
sudo apt-get install openssh-client openssh-server

# Check if SSH is installed
ssh -V
                        `}
                              />
                            </span>
                          </li>

                          <li>
                            <span>
                              2. Ensure your system is reachable.
                              <span>Check firewall settings.</span>
                            </span>
                          </li>

                          <li>
                            <span>3. Enjoy!</span>
                          </li>
                        </ol>

                        <h4 className="font-bold uppercase pt-2 pb-1">iOS Systems:</h4>
                        <ol className="text-gray-400">
                          <li>
                            <span>Future Feature.</span>
                          </li>
                        </ol>

                        <h4 className="font-bold uppercase pt-2 pb-1">Windows Systems:</h4>
                        <ol className="text-gray-400">
                          <li>
                            <span>Future Feature.</span>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>

                )}
            </>
          )
          : (
            <div className="flex justify-center items-center min-h-screen w-full">
              <AddProject
                setAddProject={setIsAdding}
              />
            </div>
          )

      )}

      {!isLoading && activeSystem && (
        <div className="flex flex-wrap items-center min-h-screen">

          <SystemsDashboard />
        </div>
      )}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2" />
    </div>
  );
};

export default Dashboard;
