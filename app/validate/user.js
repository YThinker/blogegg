module.exports = {
    login: {
        userId: { type: 'string', required: true, allowEmpty: false, },
        password: { type: 'string', required: true, allowEmpty: false, },
        verifyCode: { type: 'string', required: true, allowEmpty: false, },
    },
};