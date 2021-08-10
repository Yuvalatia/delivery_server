const Product = require("../models/Product");

const HttpError = require("../utils/HttpError");
const { errorMessages, userRoles } = require("../utils/constants");

const getAllProducts = async (req, res, next) => {
    let productList;
    try {
        const productDocuments = await Product.find();
        // parsing document to js object
        productList = productDocuments.map(prodDocument => {
            let prodAsObj = prodDocument.toObject({getters: true, versionKey: false});
            delete prodAsObj._id;
            return prodAsObj;
        })
    }catch(err){
        return next(new HttpError(errorMessages.INTERNAL_SERVER_ERROR, 500));
    }
    res.json(productList);
}

const createNewProduct = async (req, res, next) => {
    // Admin role required
    if(req.authData.role !== userRoles.ADMIN){
        return next(new HttpError(errorMessages.FOBIDDEN_ACCESS_ERROR, 403));
    }
    let { name, price } = req.body;

    // validation
    // fill

    let newProduct = new Product({name, price});
    try{
        await newProduct.save();
    }catch(err){
        return next(new HttpError(errorMessages.INTERNAL_SERVER_ERROR, 500));
    }
    res.json("Product created");
}

module.exports = {
    getAllProducts,
    createNewProduct
}
