const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const reservationSchema = new mongoose.Schema(
    {
        parkingId:{
            type: String
        },
        userId:{
            type: String
        },
        startDate:{
            type: Date
        },
        endDate:{
            type: Date
        },
        price:{
            type: Number
        }    
    },
    {
        timestamps: true,
        versionKey: false
    }
);

reservationSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('reservations', reservationSchema);