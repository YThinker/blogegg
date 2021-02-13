'use strict';
const BaseController = require('./base');
// 10001未登录 10002权限不足
const validate = require("../validate/index").user;

class UserController extends BaseController {
    async getUserInfo() {
      const { ctx, service } = this;
      let userInfo = await service.user.getUserInfo();
      this.success(userInfo);
    };

    async getVerifyCode() {
      const { ctx, service, app } = this;

      let verifySymbol = ctx.query.verifySymbol || 1;
      let tempAuth = ctx.get('TempAuth');
      
      if(!tempAuth){
        this.error('token error');
        return;
      } 

      const captcha = await service.user.setVerifyCode(tempAuth, verifySymbol);
      let verifyCap = await app.redis.get(`verifyCode${verifySymbol}${tempAuth}`);
      // console.log(`verifyCode${verifySymbol}${tempAuth}:`, verifyCap);
      this.success({imgData: captcha});
    };

    // 加盐算法，存入数据库时头尾各增加10位随机字符串，前端传输时也加盐加密头尾增加10位
    // 比对时去除头尾字符串
    async login() {
      const loginValidate = validate.login;
      const { ctx, service, app } = this;
      ctx.validate(loginValidate);

      let { userId, password, verifyCode } = ctx.request.body;
      let tempAuth = ctx.get('TempAuth');

      const captchaText = await app.redis.get(`verifyCode1${tempAuth}`);
      if(!captchaText){
        this.error('验证码已过期');
        return;
      }
      if(verifyCode.toLowerCase() !== captchaText.toLowerCase()){
        this.error('验证码错误');
        return;
      }

      let pwd = password.slice(10, password.length-10);
      console.log(pwd);
      const token = await service.user.login(userId, pwd);
      if(!token){
        this.error('用户名或密码错误');
        return;
      } else {
        this.success({ token: token });
      }
    };

    async signin() {};

    async forgetPwd() {};

    async changeUserInfo() {};
}

module.exports = UserController;
