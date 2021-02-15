'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/getVerifyCode', controller.user.getVerifyCode);
  router.post('/login', controller.user.login);
  router.get('/validateRegisted', controller.user.validateRegisted);
  router.post('/register', controller.user.register);
  router.post('/forgetPwd', controller.user.forgetPwd);
  router.post('/changeUserInfo', jwt, controller.user.changeUserInfo);
};
