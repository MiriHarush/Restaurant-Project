const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
    tableNum: {
        type: Number,
        // default: 1
        // required:true,
        // uniqe:true
    },
    chairNum: {
        type: String,
        required: true
    },
    ownerTable:{
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant'
    },

    // currentOrder: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Order'
    // }
})

const Table = mongoose.model("Table", tableSchema)
module.exports.Table = Table;