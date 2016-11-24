const SECRET = process.env.jwt_secret || '$2a$10$B9vO0yp./wcJO.QKRc4Mse';
const jwt = require('jsonwebtoken');


const signToken = (payload, options = {}) => {
    return jwt.sign(payload, SECRET, options);
};

const verifyToken = (token) => {
    jwt.verify(token, SECRET, function(err, response) {
        return err || response;
    });
};

module.exports = {
    token: {
        sign: signToken,
        verify: verifyToken,
    },
};
