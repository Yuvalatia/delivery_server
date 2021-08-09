const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { hash, compare } = require("bcrypt");

const HttpError = require("../utils/HttpError");
const { errorMessages } = require("../utils/constants");

const registerNewUser = async (req, res, next) => {
    let { full_name, email, password, role } = req.body;

    // validation
    // fill

    // looks for user email in db before insert
    let exsitsUser;
    try{
        exsitsUser = await User.findOne({email}).exec();
    }catch(err){
        return next(new HttpError(errorMessages.INTERNAL_SERVER_ERROR, 500));
    }
    // checks if user already exsits
    if(exsitsUser){
        return next(new HttpError(errorMessages.USER_ALREADY_EXSITS_ERROR,404));
    }

    // hashing password
    let hashPassword;
    try {
        hashPassword = await hash(password, 10);
    }catch(err){
        return next(new HttpError(errorMessages.INTERNAL_SERVER_ERROR, 500));
    }
    
    // creatinn user document with mongoose scheme
    let newUser = new User({
        full_name,
        email,
        password: hashPassword,
        role
    });
    
    try{
        await newUser.save();
    }catch(err){
        return next(new HttpError(errorMessages.INTERNAL_SERVER_ERROR, 500));
    }
    res.status(200).json("User created");
}

const loginUser = async (req, res, next) => {
    const {email, password} = req.body;

    // validation
    // fill
    
    // get user
    let user;
    try{
        user = await User.findOne({email}).exec();
    }catch(err){
        return next(new HttpError(errorMessages.INTERNAL_SERVER_ERROR, 500));
    }

    // found no user
    if(!user){
        return next(new HttpError(errorMessages.LOGIN_FAILED_ERROR, 404));
    }

    // password hashing and comparing
    let isPassowrdsEquals;
    try{
        isPassowrdsEquals = await compare(password, user.password);
    }catch(err){
        return next(new HttpError(errorMessages.INTERNAL_SERVER_ERROR, 500));
    }

    if(!isPassowrdsEquals){
        return next(new HttpError(errorMessages.LOGIN_FAILED_ERROR, 404));
    }

    // create jwt for auth user with user id :)
    let token;
    try {
        token = await jwt.sign({id: user._id}, process.env.JWT_SECRET);
    }catch(err){
        return next(new HttpError(errorMessages.INTERNAL_SERVER_ERROR, 500));
    }
    res.json({token});
}

module.exports = {
    registerNewUser,
    loginUser
}
