const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema(
   {
      userId: String,
      address: {
         first_name: { type: String, required: true },
         last_name: { type: String, required: true },
         address_1: { type: String, required: true },
         state: { type: String, required: true },
         postcode: { type: String, required: true },
         country: { type: String, required: true },
         email: { type: String, required: true },
         phone: { type: String, required: true },
      },
      orderList: [],
      total:{
         type
      }
   },
   { timestamps: true, versionKey: false }
);

const Order = new mongoose.model("Orders", orderSchema);

module.exports = Order;
