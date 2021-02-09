'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },

  cors: {
    enable: true,
    package: 'egg-cors',
  },

  redis: {
    enable: true,
    package: 'egg-redis',
  },

  jwt: {
    enable: true,
    package: 'egg-jwt',
  },

  validate: {
    enable: true,
    package: 'egg-validate',
  }
};

