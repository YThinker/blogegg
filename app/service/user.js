'use strict';
const Service = require('egg').Service;

class UserService extends Service {
    async getUserInfo() {
        const { app } = this;
        const userInfo = await app.mysql.select('user');
        console.log(userInfo);
        return userInfo;
    }
}

module.exports = UserService;