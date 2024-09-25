import ch2 from 'assets/img/ch2.png';
import serverCluster from 'assets/img/marketing/serverCluster.svg';
import global2green from 'assets/img/marketing/global2green.svg';
import globe from 'assets/img/marketing/globe.svg';
import Footer from 'components/footer/FooterAuthDefault';
import useKeyDown from 'hooks/useKeyDown';
import useLinker from 'hooks/useLinker';

const MarketingHome = () => (
  <div className="min-h-screen max-w-100% flex flex-wrap justify-center">
    <div className="bg-gray-light w-full flex flex-wrap justify-center ">
      {/* main content */}
      <div className="w-[1300px] max-w-[1300px] py-3 px-3">
        <div className="h-90px pt-3 flex flex-wrap justify-between">
          {/* left side */}
          <div className="flex flex-wrap items-center justify-around">
            <div>
              <div className="flex items-end">
                <img
                  src={ch2}
                  alt="Logo"
                  className="md:h-14 h-6"
                  style={{ width: 'auto' }}
                />
                <span className="text-gray-500 md:leading-[60px] leading-[25px]  font-poppins md:text-4xl text-md">
                  ontrol
                  <span className="font-medium text-brand-400">
                    h
                    <span className="" />
                    ub
                  </span>
                </span>
              </div>
            </div>
          </div>
          {/* right side */}
          <div className="flex flex-wrap items-center justify-around">
            <div
              className="md:px-6 px-3 text-gray-500 cursor-pointer hover:text-white transition duration-200 font-poppins md:text-sm text-xs"
              onClick={() => useLinker(`${process.env.REACT_APP_BASENAME}/#/auth/sign-in`)}
              onKeyDown={(e) => useKeyDown(e, 'Enter', [useLinker(`${process.env.REACT_APP_BASENAME}/#/auth/sign-in`)])}
              role="button"
              tabIndex={0}
            >
              Login
            </div>
            <button
              className="md:block hidden linear md:w-[150px] w-[150px] text-sm md:text-base rounded-xl bg-brand-400 py-[12px] text-brand text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 font-poppins"
              onClick={() => useLinker(`${process.env.REACT_APP_BASENAME}/#/auth/sign-up`)}
              type="submit"
            >
              Get Started Free
            </button>
          </div>

        </div>
        <div className=" h-[calc(100vh-80px)] flex flex-wrap items-center   ">
          <div className="flex flex-wrap items-start content-center lg:w-1/2 h-1/2 md:w-full">
            <h1 className="w-full m-0 p-0 md:text-[50px] text-[30px] text-gray-500 font-poppins">
              All of your
              <span className="text-brand-400">systems</span>
              ,
            </h1>
            <div className="w-full m-0 p-0 md:mt-[-20px] mt-[-10px] md:text-[50px] text-[30px] text-green-400 font-poppins">When you need them.</div>
            <div>
              <p className="font-mono text-white md:text-base text-sm">Empowering Seamless Remote Management </p>
              <button
                className="mt-4 linear w-[150px] rounded-xl bg-brand-400 py-[12px] text-brand font-bold text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 font-poppin "
                onClick={() => useLinker(`${process.env.REACT_APP_BASENAME}/#/auth/sign-up`)}
                type="submit"
              >
                Go.
              </button>
            </div>

          </div>
          <div className="flex flex-wrap items-start content-start lg:w-1/2 h-1/2 md:w-full lg:block md:hidden  hidden">
            <img
              src={serverCluster}
              alt="Logo"
              className="h-full"
              style={{ width: 'auto' }}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="bg-gray-0 w-full flex flex-wrap justify-center shadow-xl">
      {/* main content */}
      <div className="w-[1300px] max-w-[1300px] py-3 px-3">
        <div className=" h-[calc(50vh)] flex flex-wrap items-center  justify-start ">
          <div className="flex flex-wrap items-start content-center justify-start lg:w-2/3 h-1/2 md:w-full">
            <p className="text-sm text-brand-400">GUI</p>
            <h1 className="w-full m-0 p-0 md:text-[50px] text-[30px] text-gray-500 font-poppins text-left ">
              <span className="text-green-400" />
              {' '}
              Intuitive Interface 🎨
            </h1>
            <div>
              <p className="mt-2 font-mono text-white text-left md:text-base text-sm">Navigate through your systems with an intuitive graphical user interface. Say goodbye to complex commands and hello to a user-friendly experience.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-gray-light w-full flex flex-wrap justify-center">
      {/* main content */}
      <div className="w-[1400px] max-w-[1400px] py-3 px-3">
        <div className=" h-[calc(50vh)] flex flex-wrap items-center   ">
          <div className="flex flex-wrap items-center content-center justify-center lg:w-1/2 h-1/2 md:w-full lg:flex md:hidden  hidden">
            <img
              src={globe}
              alt="Logo"
              className="h-full"
              style={{ width: 'auto' }}
            />
          </div>
          <div className="flex flex-wrap items-start content-center justify-end lg:w-1/2 h-1/2 md:w-full">
            <p className="text-sm text-brand-400">Connect</p>
            <h1 className="w-full m-0 p-0 text-gray-500 font-poppins text-right md:text-[50px] text-[30px]">
              <span className="text-green-400">⚡ Real-Time</span>
              {' '}
              Connectivity
            </h1>
            <div>
              <p className="mt-2 font-mono text-white text-right md:text-base text-sm">
                Unlock the potential of effortless remote system management with ControlHub.
                Our innovative software bridges the gap between your local environment and diverse
                systems, offering a comprehensive solution for streamlined operations.
              </p>
            </div>
            <button
              className="mt-8 linear w-[150px] rounded-xl bg-brand-400 py-[12px] text-brand font-bold text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 font-poppin "
              onClick={() => useLinker(`${process.env.REACT_APP_BASENAME}/#/auth/sign-up`)}
              type="submit"
            >
              Connect.
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-gray-0 w-full flex flex-wrap justify-center shadow-xl ">
      {/* main content */}
      <div className="w-[1300px] max-w-[1300px] py-3 px-3">
        <div className=" h-[calc(50vh)] flex flex-wrap items-center   ">
          <div className="flex flex-wrap items-start content-center justify-start lg:w-1/2 h-1/2 md:w-full">
            <p className="text-sm text-brand-400">Synchronize</p>
            <h1 className="w-full m-0 p-0 text-gray-500 font-poppins md:text-[50px] text-[30px]">
              <span className="text-green-400">
                Unified
              </span>
              {' '}
              Access 🌐
            </h1>
            <div>
              <p className="mt-2 font-mono text-white text-left md:text-base text-sm">Access all your systems effortlessly from any browser. Eliminate the need for multiple tools and enjoy a centralized hub for remote management.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center content-center justify-center lg:w-1/2 h-1/2 md:w-full lg:flex md:hidden  hidden">
            <img
              src={global2green}
              alt="Logo"
              className="h-full"
              style={{ width: 'auto' }}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="bg-gray-light w-full flex flex-wrap justify-center">
      {/* main content */}
      <div className="w-[1400px] max-w-[1400px] py-3 px-3">
        <div className=" h-[calc(50vh)] flex flex-wrap items-center  justify-center ">
          <div className="flex flex-wrap items-center content-center lg:w-full h-1/2 md:w-full justify-center">
            <h1 className="w-full m-0 p-0 text-gray-500 font-poppins text-center md:text-[50px] text-[30px]">
              Ready to
              <span className="text-brand-400">Start?</span>
            </h1>
            <div className="w-full m-0 p-0 md:mt-[-20px] mt-[-10px] font-poppins text-gray-500 text-center md:text-[50px] text-[30px]">
              Get started
              <span className="font-bold text-green-400">Free</span>
            </div>
            <div className="flex flex-wrap justify-center">
              <p className="font-mono text-white text-center w-full md:text-base text-sm">Say goodbye to the complexities of remote system management </p>
              <button
                className="mt-4 linear w-[150px] rounded-xl bg-brand-400 py-[12px] text-brand font-bold text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 font-poppin "
                onClick={() => useLinker(`${process.env.REACT_APP_BASENAME}/#/auth/sign-up`)}
                type="submit"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-gray-0 w-full flex flex-wrap justify-center shadow-xl items-center content-center pt-8 ">
      <Footer />
    </div>
  </div>
);

export default MarketingHome;
