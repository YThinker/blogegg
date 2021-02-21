'use strict';
const Service = require('egg').Service;

const encrypt = require('../public/util.js').encrypt;
const SvgCaptcha = require('svg-captcha');

class UserService extends Service {

    async getUserInfo(content, type='userId') {
        const { app } = this;
        let option = {};
        option[type] = content;
        const userInfo = await app.mysql.get('user', option);
        return userInfo;
    };

    async getUserInfoSecurity(content, type='userId') {
        const { app } = this;
        let option = {};
        option[type] = content;
        const {id, password, question, answer, ...userInfo} = await app.mysql.get('user', option);
        return userInfo;
    };

    async updateUserInfo(row) {
        const {app} = this;
        const result = await app.mysql.update('user', row);
        return result.affectedRows === 1;
    };

    // 1 登录验证码 2 注册验证码 3 忘记密码
    async setVerifyCode(tempAuth, symbolCode=1, verifyType='normal') {
        const { app, ctx } = this;

        let captcha;
        const captchaconf = {
            size: 4, // 验证码长度
            width:100,
            height:40,
            fontSize: 40,
            ignoreChars: 'oO01lIijJ', // 验证码字符中排除
            noise: 4, // 干扰线条的数量
            color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
            background: '#dbd0b1', // 验证码图片背景颜色
            mathMin: 20, // the minimum value the math expression can be
            mathMax: 90, // the maximum value the math expression can be
            mathOperator: '+-' // The operator to use, +, - or +- (for random + or -)
        }
        switch(verifyType){
            case 'normal':
                captcha = SvgCaptcha.create(captchaconf);
                await app.redis.set(`verifyCode${symbolCode}${tempAuth}`, captcha.text.toLowerCase(), 'EX', 300);
                break;
            case 'mathExpr':
                captcha = SvgCaptcha.createMathExpr(captchaconf)
                await app.redis.set(`verifyCode${symbolCode}${tempAuth}`, captcha.text.toLowerCase(), 'EX', 300);
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

    async register(params) {
        const { app, ctx, service } = this;
        const result = await app.mysql.insert('user', params);
        if(!result.affectedRows){
            return false;
        }
        return await app.jwt.sign({ userId: params.userId }, app.config.jwt.secret);
    };

}

module.exports = UserService;