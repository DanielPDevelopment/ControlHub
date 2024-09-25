import Apache2 from './Apache2/Apache2';
import Nginx from './Nginx/Nginx';
import PM2 from './PM2/PM2';

const modules = [
  {
    name: 'pm2',
    component: <PM2 />,
  },
  {
    name: 'nginx',
    component: <Nginx />,
  },
  {
    name: 'apache2',
    component: <Apache2 />,
  },
];

export default modules;
