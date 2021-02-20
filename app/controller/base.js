'use strict';
const Controller = require('egg').Controller;
// 10001未登录 10002权限不足

class BaseController extends Controller {
    async success(data={}, errorCode=200, message='success') {
      const { ctx } = this;
      ctx.body = {
        ErrorCode: errorCode,
        message: message,
        data: data,
      }
    };
    async error(message="error", errorCode=500) {
      this.ctx.body = {
        ErrorCode: errorCode,
        message: message,
      };
    }

    async checkLogin() {

    };

    async checkAuth() {

    };
}

module.exports = BaseController;