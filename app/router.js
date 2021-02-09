'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/getVerifyCode', controller.user.getVerifyCode);
  router.post('/login', controller.user.login);
  router.post('/signin', controller.user.signin);
  router.post('/forgetPwd', controller.user.forgetPwd);
  router.post('/changeUserInfo', jwt, controller.user.changeUserInfo);
};
