/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  config.mysql = {
    // 单数据库信息配置
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'yxk980102',
      database: 'eggblog',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.session = {
    key: "SESSION_ID",
    maxAge: 24*3600*1000,
    httpOnly: true,
    encrypt: true,
    renew: true // 延长会话有效期
  };

  //csrf以及域名白名单配置
  config.security = {
    csrf: {
      enable: false,
      // useSession: true,
    },
    domainWhiteList: ['http://localhost:3000'],
  };
  //cors跨域配置
  config.cors = {
    origin: 'http://localhost:3000',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1611536611915_9754';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};