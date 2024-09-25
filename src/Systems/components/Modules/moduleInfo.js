import {
  SiPm2, SiNginx, SiApache, SiPostgresql, SiMariadbfoundation, SiSqlite, SiMongodb, SiRedis,
} from 'react-icons/si';

import { GrMysql } from 'react-icons/gr';

const styling = 'w-full text-[30px]';
const infoStyling = ' text-[30px] h-10 w-[auto]';
const notReady = 'text-gray-700';

export const moduleData = [
  {
    name: 'Redis',
    component: <SiRedis className={`${styling} ${notReady}`} />,
    componentInfoIcon: <SiRedis className={infoStyling} />,
    information: `
        Redis is an open-source in-memory storage, used as a distributed, in-memory key–value database, cache and message broker, with optional durability.
        `,
    docLink: 'https://redis.io/docs/',
    status: 'notReady',
  },
  {
    name: 'MongoDB',
    component: <SiMongodb className={`${styling} ${notReady}`} />,
    componentInfoIcon: <SiMongodb className={infoStyling} />,
    information: `
        MongoDB is a source-available, cross-platform, document-oriented database program. Classified as a NoSQL database product, MongoDB utilizes JSON-like documents with optional schemas. MongoDB is developed by MongoDB Inc. and current versions are licensed under the Server Side Public License.
        `,
    docLink: 'https://www.mongodb.com/docs/',
    status: 'notReady',
  },
  {
    name: 'SQLite',
    component: <SiSqlite className={`${styling} ${notReady}`} />,
    componentInfoIcon: <SiSqlite className={infoStyling} />,
    information: `
        SQLite is a database engine written in the C programming language. It is not a standalone app; rather, it is a library that software developers embed in their apps. As such, it belongs to the family of embedded databases.
        `,
    docLink: 'https://www.sqlite.org/docs.html',
    status: 'notReady',
  },
  {
    name: 'MariaDB',
    component: <SiMariadbfoundation className={`${styling} ${notReady}`} />,
    componentInfoIcon: <SiMariadbfoundation className={infoStyling} />,
    information: `
        MariaDB is a community-developed, commercially supported fork of the MySQL relational database management system, intended to remain free and open-source software under the GNU General Public License.
        `,
    docLink: 'https://mariadb.org/documentation/',
    status: 'notReady',
  },
  {
    name: 'PM2',
    component: <SiPm2 className={styling} />,
    componentInfoIcon: <SiPm2 className={infoStyling} />,
    information: 'PM2 is a daemon process manager that will help you manage and keep your application online. Getting started with PM2 is straightforward, it is offered as a simple and intuitive CLI, installable via NPM.',
    docLink: 'https://pm2.keymetrics.io/docs/usage/quick-start/',
    status: 'good',
  },
  {
    name: 'Nginx',
    component: <SiNginx className={styling} />,
    componentInfoIcon: <SiNginx className={infoStyling} />,
    information: 'Nginx is a web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache. The software was created by Russian developer Igor Sysoev and publicly released in 2004. Nginx is free and open-source software, released under the terms of the 2-clause BSD license.',
    docLink: 'https://nginx.org/en/',
    status: 'good',
  },
  {
    name: 'Apache2',
    component: <SiApache className={styling} />,
    componentInfoIcon: <SiApache className={infoStyling} />,
    information: 'The Apache HTTP Server is a free and open-source cross-platform web server software, released under the terms of Apache License 2.0. It is developed and maintained by a community of developers under the auspices of the Apache Software Foundation.',
    docLink: 'https://httpd.apache.org/',
    status: 'good',
  },
  {
    name: 'MySQL',
    component: <GrMysql className={`${styling} ${notReady}`} />,
    componentInfoIcon: <GrMysql className={infoStyling} />,
    information: 'MySQL is an open-source relational database management system. Its name is a combination of "My", the name of co-founder Michael Widenius\'s daughter My, and "SQL", the acronym for Structured Query Language.',
    docLink: 'https://dev.mysql.com/doc/',
    status: 'notReady',
  },
  {
    name: 'PostgreSQL',
    component: <SiPostgresql className={`${styling} ${notReady}`} />,
    componentInfoIcon: <SiPostgresql className={infoStyling} />,
    information: 'PostgreSQL, also known as Postgres, is a free and open-source relational database management system emphasizing extensibility and SQL compliance.',
    docLink: 'https://www.postgresql.org/docs/',
    status: 'notReady',
  },
];

export const energyStrings = [
  'Ignite the Module for maximum efficiency!',
  'Power up the Module and optimize!',
  'Energize the Module for seamless operations!',
  'Trigger the Module to boost productivity!',
  'Initiate Module activation for smooth workflow!',
  'Activate the Module and enhance performance!',
  'Turn on the Module to streamline processes!',
  'Engage the Module for peak efficiency!',
  'Kickstart the Module to turbocharge tasks!',
  'Activate the Module and elevate results!',
  'Fire up the Module for unstoppable progress!',
  'Activate the powerhouse Module for flawless execution!',
  'Fuel the Module for a surge in effectiveness!',
  'Launch the Module into action for top-tier results!',
  'Rev up the Module to conquer challenges!',
  'Enable the Module and supercharge your tasks!',
  'Ignition on the Module for peak performance!',
  'Activate the Turbo Module for unparalleled efficiency!',
  'Initiate the Module to conquer the mission!',
  'Elevate your game with the activated Module!',
  'Power on the Module to dominate the workflow!',
  'Activate the Module for a precision boost!',
  'Unleash the power of the Module for success!',
  'Kick into high gear with the activated Module!',
  'Switch on the Module for a productivity surge!',
  'Energize your process with the active Module!',
  'Deploy the Module for a seamless operation!',
  'Ignite success by activating the Module!',
  'Maximize efficiency with the powered-up Module!',
  'Take command with the activated Module!',
];
