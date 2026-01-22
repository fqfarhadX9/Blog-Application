const { validateToken } = require("../services/authentication");

function checkAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
            if(!tokenCookieValue) {
                return next();
            }
        try {
            req.user =validateToken(tokenCookieValue);
            req.user = userPayload
        } catch (error) {
            console.log(error);
        }
        return next();
    }
}
module.exports = checkAuthenticationCookie;