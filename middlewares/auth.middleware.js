const jwt = require("jsonwebtoken");

const User = require("../models/User");
const HttpError = require("../utils/HttpError");
const {errorMessages} = require("../utils/constants");

const tokenValidation = async (req, res, next) => {
    let id;
    try {
        const token = req.headers.authorization.split(" ")[1]; // get token with no bearer
        if(!token){
            throw new Error();
        }
        const decodedTokenData = jwt.verify(token, process.env.JWT_SECRET);
        if(!decodedTokenData.id){
            throw new Error();
        }
        id = decodedTokenData.id;
    }catch(err){
        return next(new HttpError(errorMessages.INTERNAL_USER_ERROR), 404);
    }

    // get user role with id
    let userSelectedData;
    try{
        userSelectedData = await User.findById(id, "role");
        if(!userSelectedData){
            throw new Error();
        }
    }catch(err){
        return next(new HttpError(errorMessages.INTERNAL_SERVER_ERROR), 500);
    }
    req.authData = { id, role: userSelectedData.role };
    next(); // auth success*/
}

module.exports = tokenValidation;