'use strict';
const Controller = require('egg').Controller;
// 10001未登录 10002权限不足

class BaseController extends Controller {
    async success(data) {
      const { ctx } = this;
      ctx.body = {
        ErrorCode: 0,
        message: 'success',
        data: data,
      }
    };

    async error(errorCode=500, message="error", data={}) {
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