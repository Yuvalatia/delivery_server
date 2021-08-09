// requires


const getAllProducts = async (req, res, next) => {
    res.json({products: "all"});
}

const createNewProduct = async (req, res, next) => {
    res.json({product: "created"});
}

module.exports = {
    getAllProducts,
    createNewProduct
}
