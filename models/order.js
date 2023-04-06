const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
    },
    amount:{
        type:Number
    },
    orderedProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
}, { timestamps: true });


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;