'use strict';
const Service = require('egg').Service;

const encrypt = require('../public/util.js').encrypt;
const SvgCaptcha = require('svg-captcha');

class UserService extends Service {

    async getUserInfo(userId) {
        const { app } = this;
        const userInfo = await app.mysql.get('user', { userId: userId });
        return userInfo;
    };

    // 1 登录验证码 2 注册验证码 3...
    async setVerifyCode(tempAuth, symbolCode=1, verifyType='normal') {
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
                await app.redis.set(`verifyCode${symbolCode}${tempAuth}`, captcha.text.toLowerCase(), 'EX', 300);
                break;
            case 'mathExpr':
                captcha = SvgCaptcha.createMathExpr(captchaconf)
                await app.redis.set(`mathVerifyCode${symbolCode}${tempAuth}`, captcha.text.toLowerCase(), 'EX', 300);
                break;
        }
        return encrypt(Buffer.from(captcha.data).toString('base64'));
    };

    async login(userId, password) {
        const { app, ctx, service } = this;
        const userInfo = await service.user.getUserInfo(userId);
        console.log(userInfo);
        if(userInfo && userInfo.password.slice(10, userInfo.password.length-10) !== password){
            return false;
        }
        return await app.jwt.sign({ userId: userInfo.userId }, app.config.jwt.secret);
    };

}

module.exports = UserService;