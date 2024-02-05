const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    tableNum: {
        type: mongoose.Types.ObjectId,
        ref: 'Table'
    },
    timeOrder: {
        type: String,
        required: true,
    },
    dateOrder: {
        type: Date,
        required: true
    },
    // numberPeople:{
    //     type:Number,
    //     required:true
    // },
    nameUser: {
        type: String,
        required: true
    },
    phoneUser: {
        type: String,
        required: true,
    }
    // emailUser: {
    //     type: String,
    //     required: true,
    // }
})

const Order = mongoose.model("Order", orderSchema)
module.exports.Order = Order;