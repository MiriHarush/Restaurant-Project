
const { decodeToken } = require("../utils/jwt");

exports.auth = (role) => {
    return async function (req, res, next) {
        let token = req.headers["authorization"];
        if (!token) return res.sendStatus(401);
        token = token.split(" ")[1];
        try {
            const payload = decodeToken(token);
            console.log(payload);

            res.locals.user_id = payload.id;
            next();
        } catch (error) {
            next(error);
        }
    }
};


exports.authCurrentSpace = async (req, res, next) => {
    
}