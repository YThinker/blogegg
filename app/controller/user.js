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
      const { ctx, service, app } = this;

      let verifySymbol = ctx.query.verifySymbol || 1;
      let tempAuth = ctx.get('TempAuth');
      
      if(!tempAuth){
        this.success(null, 500, 'token error');
        return;
      } 

      const captcha = await service.user.setVerifyCode(tempAuth, verifySymbol);
      let verifyCap = await app.redis.get(`verifyCode${verifySymbol}${tempAuth}`);
      // console.log(`verifyCode${verifySymbol}${tempAuth}:`, verifyCap);
      this.success({imgData: Buffer.from(captcha.data).toString('base64')});
    };

    async login() {
      const { ctx, service } = this;
    };
}

module.exports = UserController;
