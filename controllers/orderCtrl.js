const Order = require("../model/orderModel");

const createOrder = async (data) => {
    const result = await Order.create(data);
    return result;
};

const findAllOrder = async (userId) => {
    const result = await Order.find({userId});
    return result;
};

 module.exports={createOrder,findAllOrder}