const jwt = require('jsonwebtoken');
const { userSchema } = require("../model/userSchema");
const { storeUserAccessJWT } = require("../model/userModel.js");

const createAccessJWT = async (email, _id) => {
    try {
        const accessJWT = jwt.sign({ payload: email },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: '1h' }
      );
      // console.log("Id inside createAccess: ", _id, "AccessJWT: ", accessJWT);
        await storeUserAccessJWT(_id, accessJWT);
        return Promise.resolve(accessJWT);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getAccessJWT = async (key) => {
  try {
      const user = await userSchema.findOne({ 'accessJWT.token': key });
      const userId = user?._id || null;
      console.log("inside getAccess JWt: ",userId);
    return Promise.resolve(user?._id || null);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = {
    createAccessJWT,
    getAccessJWT,
}