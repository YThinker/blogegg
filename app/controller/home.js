'use strict';
const Controller = require('egg').Controller;

class HomeController extends Controller {
    async getUserInfo() {
      const { ctx, service } = this;
      const cookie = ctx.cookies;
      console.log(cookie);
      let userInfo = await service.user.getUserInfo();
      ctx.body = {
        success: true,
        userInfo
      }
    };

    async getVerifyCode() {
      const { ctx, service } = this;
      const captcha = await service.user.getVerifyCode();
      console.log(ctx.session['verifyCode1']);
      // ctx.response.type = 'image/svg+xml';
      ctx.body = {
        success: true,
        data: Buffer.from(captcha.data).toString('base64'),
      }
    };
}

module.exports = HomeController;
