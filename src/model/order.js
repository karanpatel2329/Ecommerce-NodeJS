const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema({
  totalAmount:{
    type:String,
    require:true
  },
  orderNo:{
    type:String,
    require:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);