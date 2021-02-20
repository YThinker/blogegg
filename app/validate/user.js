module.exports = {
    login: {
        userId: { type: 'string', required: true, allowEmpty: false, },
        password: { type: 'string', required: true, allowEmpty: false, },
        verifyCode: { type: 'string', required: true, allowEmpty: false, },
    },
    register: {
        userId: { type: 'string', required: true, allowEmpty: false, },
        nickName: { type: 'string', required: true, allowEmpty: false, },
        password: { type: 'string', required: true, allowEmpty: false, },
        verifyCode: { type: 'string', required: true, allowEmpty: false, },
        question: { type: 'string', required: true, allowEmpty: false, },
        answer: { type: 'string', required: true, allowEmpty: false, },
    },
    forgetPwd: {
        userId: { type: 'string', required: true, allowEmpty: false, },
        password: { type: 'string', required: true, allowEmpty: false, },
        verifyCode: { type: 'string', required: true, allowEmpty: false, },
        answer: { type: 'string', required: true, allowEmpty: false, },
    },
};