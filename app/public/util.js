const crypto = require("crypto");

const algorithm = 'aes-128-cbc'
const key = "AE88mn7qytlJK82g";
const iv = "1432359987651784";

module.exports = {
    encrypt(dataStr) {
        let cipherChunks = '';
        let cipher = crypto.createCipheriv(algorithm, key, iv);
        cipher.setAutoPadding(true);
        cipherChunks = cipher.update(dataStr.toString(), 'utf8', 'base64');
        cipherChunks += cipher.final('base64');
        return cipherChunks;
    }
}