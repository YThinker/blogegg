/* eslint valid-jsdoc: "off" */
'use strict';

module.exports = appInfo => {

  const config = exports = {};
  //mysql配置
  config.mysql = {
    // 单数据库信息配置
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'yxk980102',
      database: 'eggblog',
    },
  };
  //redis配置
  config.redis = {
    client: {
      host: 'localhost',
      port: '6379',
      password: '',
      db: 0,
    },
  };
  //jwt配置
  config.jwt = {
    secret: "CdU8N97xIo"
  };
  //csrf以及域名白名单配置
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['http://localhost:3000'],
  };
  //cors跨域配置
  config.cors = {
    origin: 'http://localhost:3000',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1611536611915_9754';

  // add your middleware config here
  config.middleware = ['errorHandler'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};