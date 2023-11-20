const { userSchema } = require("../model/userSchema");

const storeUserAccessJWT = (_id, token) => {
    return new Promise((resolve, reject) => {
        try {
            userSchema.findOneAndUpdate({ _id },
                { $set: { "accessJWT.token": token, "accessJWT.addedAt": Date.now() } },
                { new: true }
            )
                .then(data => resolve(data))
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        }
        catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

module.exports = {
    storeUserAccessJWT,
};


// const { userSchema } = require("../model/userSchema");
// const {ObjectId } = require('mongodb');

// const getUserByEmail = (userEmail) => {
//     return new Promise((resolve, reject) => {
//     if (!userEmail) return reject(new Error("Email is required"));
//     userSchema.findOne({ userEmail })
//           .exec()
//           .then((data) => {
//             resolve(data);
//           })
//           .catch((error) => {
//             reject(error);
//           });
//     });
// };

// const storeUserAccessJWT = (_id, token) => {
//     return new Promise((resolve, reject) => {
//         try {
//             // console.log("Id inside storeUserAccess: ", _id);
//             userSchema.findByIdAndUpdate(_id,
//                 {
//                     $set: { "accessJWT.token": token, "accessJWT.addedAt": Date.now() }
//                 },
//                 {
//                     new: true
//                 }
//             )
//                 .then((data) => {
//                 resolve(data);
//             })
//                 .catch((error) => {
//                 console.log(error);
//                 reject(error);
//             });
//         }
//         catch (error) {
//             console.log(error);
//             reject(error);
//         }
//     });
// };

// const  getUserById = (_id) => {
//     return new Promise((resolve, reject) => {
//     if (!_id) return reject(new Error("Email is required"));
//     userSchema.findOne({_id })
//           .exec()
//           .then((data) => {
//             resolve(data);
//           })
//           .catch((error) => {
//             reject(error);
//           });
//     });
// };

// module.exports = {
//     getUserByEmail,
//     getUserById,
//     storeUserAccessJWT,
// }