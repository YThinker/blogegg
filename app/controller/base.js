'use strict';
const Controller = require('egg').Controller;
// 10001未登录 10002权限不足

class BaseController extends Controller {
    async success(data, errorCode=200, message='success') {
      const { ctx } = this;
      ctx.body = {
        ErrorCode: errorCode,
        message: message,
        data: data,
      }
    };

    async checkLogin() {

    };

    async checkAuth() {

    };
}

module.exports = BaseController;