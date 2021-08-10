const mongoose = require("mongoose");
const Order = require("../models/Order");
const Order_Products = require("../models/Order_Products");

const HttpError = require("../utils/HttpError");
const { errorMessages, userRoles } = require("../utils/constants");


const getAllOrders = async (req, res, next) => {
    // param for filtering need to fill
    let filterObject = {};

    // set filter user id if its a regular user
    if(req.authData.role === userRoles.USER){
        filterObject.user_id = req.authData.id;
    }

    let orderList;
    try {
        const orderDocuments = await Order.find(filterObject);
        // parsing document to js object
        orderList = orderDocuments.map(orderDocument => {
            let prodAsObj = orderDocument.toObject({getters: true, versionKey: false});
            delete prodAsObj._id;
            return prodAsObj;
        })
    }catch(err){
        return next(new HttpError(errorMessages.INTERNAL_SERVER_ERROR, 500));
    }
    res.json(orderList);
}

const createNewOrder = async (req, res, next) => {
    const { products } = req.body;

    // validation - array of products ids
    //fill
    
    const newOrder = new Order({user_id: req.authData.id});

    // create order with session
    let createdOrder;
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        createdOrder =  await newOrder.save({session});
        const order_products = products.map(product => { return {product_id: product, order_id: createdOrder._id.toString()}});
        await Order_Products.insertMany(order_products, {session});
        session.commitTransaction();
    }catch(err){
        return next(new HttpError(errorMessages.INTERNAL_SERVER_ERROR, 500));
    }
    res.json({createdOrderId: createdOrder._id.toString()});
}

const changeOrderStatus = async (req, res, next) => {
    // Admin role required
    if(req.authData.role !== userRoles.ADMIN){
        return next(new HttpError(errorMessages.FOBIDDEN_ACCESS_ERROR, 403));
    }
    // get order id from path params
    const { orderId } = req.params;
    // get updated status from body params
    const { status } = req.body;
    
    // validation
    // fill
    try{
        await Order.findOneAndUpdate({_id: orderId}, {status}, {new: true});
    }catch(err){
        return next(new HttpError(errorMessages.INTERNAL_SERVER_ERROR, 500));
    }
    res.json(true);
}

module.exports = {
    getAllOrders,
    createNewOrder,
    changeOrderStatus
}
