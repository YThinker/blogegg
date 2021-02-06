'use strict';
const Controller = require('egg').Controller;
// 10001未登录 10002权限不足

class HomeController extends Controller {
    async getUserInfo() {
      const { ctx, service } = this;
      const cookie = ctx.cookies;
      console.log(cookie);
      let userInfo = await service.user.getUserInfo();
      ctx.body = {
        ErrorCode: 0,
        message: 'success',
        data: userInfo,
      }
    };

    async getVerifyCode() {
      const { ctx, service } = this;
      const captcha = await service.user.getVerifyCode();
      console.log(ctx.session['verifyCode1']);
      // ctx.response.type = 'image/svg+xml';
      ctx.body = {
        ErrorCode: 0,
        message: 'success',
        data: {imgData: Buffer.from(captcha.data).toString('base64')},
      }
    };
}

module.exports = HomeController;
