// Admin Imports
import MainDashboard from 'views/admin/default';

// Auth Imports
import SignIn from 'views/auth/SignIn';
import SignUp from 'views/auth/SignUp';
// Icon Imports
import {
  MdHome,
  MdLock,
} from 'react-icons/md';
import MarketingHome from 'views/MarketingHome';

const routes = [
  {
    name: 'Home',
    layout: '/',
    path: 'sign-up',
    icon: <MdLock className="h-6 w-6" />,
    component: <MarketingHome />,
  },
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: 'default',
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: 'sign-in',
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: 'Sign Up',
    layout: '/auth',
    path: 'sign-up',
    icon: <MdLock className="h-6 w-6" />,
    component: <SignUp />,
  },
];
export default routes;
