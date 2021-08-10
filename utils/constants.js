
module.exports = {
    MONGO_CONNECTION_URL: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.qodoc.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`,
    errorMessages: {
        INTERNAL_SERVER_ERROR: "Internal error has made, please try again later.",
        INTERNAL_USER_ERROR: "Error made.", 
        USER_ALREADY_EXSITS_ERROR: "user already exsits.",
        LOGIN_FAILED_ERROR: "Email or password are wrong, please try again.",
        FOBIDDEN_ACCESS_ERROR: "Access denied."
    },
    userRoles: {
        USER: 0,
        ADMIN: 1
    }
}