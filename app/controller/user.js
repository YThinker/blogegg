'use strict';
const BaseController = require('./base');
// 10001未登录 10002权限不足

class UserController extends BaseController {
    async getUserInfo() {
      const { ctx, service } = this;
      const cookie = ctx.cookies;
      console.log(cookie);
      let userInfo = await service.user.getUserInfo();
      this.success(userInfo);
    };

    async getVerifyCode() {
      const { ctx, service } = this;
      console.log(ctx.query.verifySymbol);
      let verifySymbol = ctx.query.verifySymbol || 1;
      const captcha = await service.user.getVerifyCode(verifySymbol);
      console.log(`verifyCode${verifySymbol}:`,ctx.session[`verifyCode${verifySymbol}`]);
      this.success({imgData: Buffer.from(captcha.data).toString('base64')});
    };

    async login() {
      const { ctx, service } = this;
      // 调用 rotateCsrfSecret 刷新用户的 CSRF token
      ctx.rotateCsrfSecret();
    };
}

module.exports = UserController;
