const jwt = require("jsonwebtoken");
const { userSchema } = require("../model/userSchema.js");
const { getCookie } = require('../helpers/cookies.helper.js');
const { getAccessJWT } = require("../helpers/jwt.helper.js");

const auth = async (req, res, next) => {
    try {
        // get jwt token stored in cookies....
        const token = req.cookies.jwtToken; // or getCookie(jwtToken)
        const decoded = await (jwt.verify(token, process.env.JWT_ACCESS_SECRET));
        const decoded_email = decoded.payload;

        if (decoded_email) {
            const userId = await getAccessJWT(token);
            // console.log("userId inside auth: ", userId);

            if (!userId) {
                return res.status(403).json({ message: "Forbidden" });
            }

            req.userId = userId;
            return next();
        }
        
        return res.status(403).json({ message: "Forbidden" });
    } catch (error) {
        res.status(401).send(error);
    }
};

module.exports = auth;