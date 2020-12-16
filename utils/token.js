const jwt = require('jsonwebtoken');
const secret = 'auto-publish';

function getToken(payload = {}) {
    return jwt.sign(payload, secret, {expiresIn: '2h'})
}

function verifyToken(){

}

module.exports = {
    getToken
};
