import React from 'react';
import {
  Routes, Route, Navigate, useLocation,
} from 'react-router-dom';
import Navbar from 'components/navbar';
import Sidebar from 'components/sidebar';
import Footer from 'components/footer/Footer';
import routes from 'routes.js';

const Admin = (props) => {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState('Main Dashboard');

  const getActiveRoute = (r) => {
    const activeRoute = 'Main Dashboard';
    for (let i = 0; i < routes.length; i += 1) {
      if (
        window.location.href.indexOf(
          `${r[i].layout}/${r[i].path}`,
        ) !== -1
      ) {
        setCurrentRoute(r[i].name);
      }
    }
    return activeRoute;
  };

  React.useEffect(() => {
    window.addEventListener('resize', () => (window.innerWidth < 1200 ? setOpen(false) : setOpen(true)));
  }, []);
  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveNavbar = (r) => {
    const activeNavbar = false;
    for (let i = 0; i < r.length; i += 1) {
      if (
        window.location.href.indexOf(r[i].layout + r[i].path) !== -1
      ) {
        return r[i].secondary;
      }
    }
    return activeNavbar;
  };

  const getRoutes = (r) => r.map((prop) => {
    if (prop.layout === '/admin') {
      return (
        <Route path={`/${prop.path}`} element={prop.component} key={prop.path} />
      );
    }
    return null;
  });

  document.documentElement.dir = 'ltr';
  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-gray-0 dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]"
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText="Horizon UI Tailwind React"
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(routes)}
                <Route
                  path="/"
                  element={<Navigate to="/admin/default" replace />}
                />
              </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
