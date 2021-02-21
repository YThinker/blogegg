'use strict';
const BaseController = require('./base');
// 10001未登录 10002权限不足
const validate = require("../validate/index").user;

class UserController extends BaseController {

    /**
     * 获取验证码图片
     * @param verifySymbol 验证码标识 1 登录验证码 2 注册验证码 3 忘记密码
     * @param verifyType 验证码类型 normal 普通字符验证码 mathExpr 算数验证码
     * @param tempAuth 临时用户身份
     */
    async getVerifyCode() {
      const { ctx, service, app } = this;

      let verifySymbol = ctx.query.verifySymbol || 1;
      let verifyType = ctx.query.verifyType || 'normal';
      let tempAuth = ctx.get('TempAuth');
      
      if(!tempAuth){
        this.error('token error');
        return;
      } 

      const captcha = await service.user.setVerifyCode(tempAuth, verifySymbol, verifyType);
      this.success({imgData: captcha});
    };

    /**
     * 登录
     * @param userId 用户名
     * @param password 密码
     * @param verifyCode 验证码
     * @param tempAuth 临时用户身份
     */
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
        const userInfoSecurity = await service.user.getUserInfoSecurity(userId, 'userId');
        this.success({ token, userInfoSecurity });
      }
    };

    /**
     * 校验用户名或昵称是否重复
     * @param type 类型 userId 用户名 nickName 昵称
     * @param content 被校验的内容
     */
    async validateRegisted() {
      const { ctx, service, app } = this;

      let type = ctx.query.type || 'userId';
      let content = ctx.query.content;
      if(content){
        this.error('null field');
      }

      const typeCN = type==='nickName'?'昵称':'用户名'

      let userInfo = await service.user.getUserInfo(content, type);
      console.log(userInfo);
      if(userInfo){
        this.error(`该${typeCN}已被注册`);
        return;
      } else {
        this.success();
      }
    };

    /**
     * 注册
     * @param userId
     * @param nickName
     * @param password
     * @param verifyCode
     * @param question
     * @param answer
     */
    async register() {
      const registerValidate = validate.register;
      const {ctx, service, app} = this;
      ctx.validate(registerValidate);

      let params = ctx.request.body;
      let tempAuth = ctx.get('TempAuth');

      const captchaText = await app.redis.get(`verifyCode2${tempAuth}`);
      if(!captchaText){
        this.error('验证码已过期');
        return;
      }
      if(params.verifyCode.toLowerCase() !== captchaText.toLowerCase()){
        this.error('验证码错误');
        return;
      }

      let getUserInfoByUserId = await service.user.getUserInfo(params.userId, 'userId');
      let getUserInfoByNickName = await service.user.getUserInfo(params.nickName, 'nickName');
      if(getUserInfoByUserId){
        this.error(`该用户名已被注册`);
        return;
      }
      if(getUserInfoByNickName){
        this.error(`该昵称已被注册`);
        return;
      }

      delete params.verifyCode;
      params.role = 'normal';
      const token = await service.user.register(params);
      if(!token){
        this.error('注册失败，未知错误');
        return;
      } else {
        const userInfoSecurity = await service.user.getUserInfoSecurity(params.userId, 'userId');
        this.success({token, userInfoSecurity});
      }
    };

    /**
     * 获取密保问题
     */
    async getSecurityQuestion() {
      const {ctx, service} = this;

      const userId = ctx.query.userId;
      if(!userId){
        this.error('null field');
        return;
      }

      const userInfo = await service.user.getUserInfo(userId);
      if(!userInfo){
        this.error('该用户不存在');
        return;
      }

      const question = userInfo.question;
      return this.success({question});
    };

    /**
     * 忘记密码
     */
    async forgetPwd() {
      const forgetPwdValidate = validate.forgetPwd;
      const {ctx, service, app} = this;
      ctx.validate(forgetPwdValidate);

      let params = ctx.request.body;
      let tempAuth = ctx.get('TempAuth');

      const captchaText = await app.redis.get(`verifyCode3${tempAuth}`);
      if(!captchaText){
        this.error('验证码已过期');
        return;
      }
      if(params.verifyCode.toLowerCase() !== captchaText.toLowerCase()){
        this.error('验证码错误');
        return;
      }

      const userInfo = await service.user.getUserInfo(params.userId);
      if(!userInfo){
        this.error('该用户不存在');
        return;
      }
      if(userInfo.answer.slice(10, userInfo.password.length-10) !== params.answer.slice(10, userInfo.password.length-10)){
        this.error('密保答案错误');
        return;
      }

      const id = userInfo.id;
      const userId = params.userId;
      const password = params.password;
      const updateParams = {id, userId, password};
      const result = await service.user.updateUserInfo(updateParams);
      if(!result){
        this.error('修改密码失败，未知错误');
      } else {
        this.success();
      }
    };

    /**
     * 修改用户信息
     */
    async changeUserInfo() {};
}

module.exports = UserController;
