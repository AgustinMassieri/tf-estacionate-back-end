const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const paymentSchema = new mongoose.Schema(
    {
        reservationId:{
            type: String
        },
        status:{
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending'
        },
        url:{
            type: String,
            default: ''
        }, 
    },
    {
        timestamps: true,
        versionKey: false
    }
);

paymentSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('payment', paymentSchema);