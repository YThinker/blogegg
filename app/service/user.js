'use strict';
const Service = require('egg').Service;

const SvgCaptcha = require('svg-captcha');

class UserService extends Service {

    async getUserInfo() {
        const { app } = this;
        const userInfo = await app.mysql.select('user');
        return userInfo;
    };

    // 1 登录验证码 2 注册验证码 3...
    async getVerifyCode(verifyType='normal', symbolCode=1) {
        const { app, ctx } = this;

        let captcha;
        const captchaconf = {
            size: 4, // 验证码长度
            width:100,
            height:40,
            fontSize: 40,
            ignoreChars: 'oO01lIijJ', // 验证码字符中排除 0o1i
            noise: 4, // 干扰线条的数量
            color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
            background: '#dbd0b1' // 验证码图片背景颜色
        }
        switch(verifyType){
            case 'normal':
                captcha = SvgCaptcha.create(captchaconf);
                ctx.session[`verifyCode${symbolCode}`] = captcha.text;
                break;
            case 'mathExpr':
                captcha = SvgCaptcha.createMathExpr(captchaconf)
                ctx.session[`mathVerifyCode${symbolCode}`] = captcha.text;
                break;
        }
        return captcha;
    };

}

module.exports = UserService;