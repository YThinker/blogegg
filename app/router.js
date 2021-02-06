'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/getUserInfo', controller.home.getUserInfo);
  router.get('/getVerifyCode', controller.home.getVerifyCode);
};
