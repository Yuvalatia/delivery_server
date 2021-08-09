const jwt = requrie("jsonwebtoken");
const HttpError = require("../utils/HttpError");
const {errorMessages} = require("../utils/constants");

const tokenValidation = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // get token with no bearer
        if(!token){
            throw new Error();
        }
        const decodedTokenData = jwt.verify(token, process.env.JWT_SECRET);
        if(!decodedTokenData.id){
            throw new Error();
        }
        req.authData = { id: decodedTokenData.id };
        next(); // auth success 
    }catch(err){
        return next(new HttpError(errorMessages.INTERNAL_USER_ERROR), 404);
    }
}