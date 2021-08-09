// requires


const getAllOrders = async (req, res, next) => {
    res.json({orders: "all if admin otherwise user only"});
}

const createNewOrder = async (req, res, next) => {
    res.json({order: "created"});
}

const changeOrderStatus = async (req, res, next) => {
    console.log(req.params);
    res.json({oder: "change only by admin"});
}

module.exports = {
    getAllOrders,
    createNewOrder,
    changeOrderStatus
}
