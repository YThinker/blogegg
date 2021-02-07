'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/getUserInfo', controller.user.getUserInfo);
  router.get('/getVerifyCode', controller.user.getVerifyCode);
};
