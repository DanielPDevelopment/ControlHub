import Footer from 'components/footer/FooterAuthDefault';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from 'routes.js';
import TerminalBlock from 'Systems/components/TerminalBlock';

const Auth = () => {
  const getRoutes = (r) => r.map((prop) => {
    if (prop.layout === '/auth') {
      return (
        <Route path={`/${prop.path}`} element={prop.component} key={prop.path} />
      );
    }
    return null;
  });
  document.documentElement.dir = 'ltr';
  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-gray-light dark:!bg-gray-light">
        <main className="mx-auto min-h-screen">
          <div className="relative flex">
            <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full h-full">
                <Routes>
                  {getRoutes(routes)}
                  <Route
                    path="/app"
                    element={<Navigate to="/#/auth/sign-in" replace />}
                  />
                </Routes>
                <div className="lg:absolute md:relative right-0 h-full lg:min-h-screen md:min-h-[auto] xs:min-h-[auto] md:block lg:w-[49vw] 2xl:w-[44vw] ">
                  <div className="sm:hidden lg:flex h-full flex flex-wrap items-center lg:min-h-screen md::min-h-[auto] lg:content-center md:content-start xs:content-start">
                    <div className="mt-2 text-white w-full m-w-[50%] lg:w-[550px]">
                      <div className="font-mono text-xs py-1">
                        <h2 className="text-lg font-bold uppercase">Getting Started:</h2>
                        <h3 className="text-base py-2">
                          Using
                          <span className="text-gray-400 font-bold uppercase">Control</span>
                          <span className="uppercase text-brand-400 font-bold uppercase font-medium">Hub</span>
                          {' '}
                          is easy, but there are a few things you need to
                          do on your systems to ensure a smooth experience.
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
                            <span>
                              3. Enjoy!

                            </span>
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
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Auth;
