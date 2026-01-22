const jwt = require("jsonwebtoken");
const secret = "$farsab143";

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role,
        profileImageUrl: user.profileImageUrl,
    }
    const token = jwt.sign(payload, secret);
    return token;
}
function validateToken(token) {
    const payload = jwt.verify(token, secret);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken
}