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
        parkingName:{
            type: String
        },
        status:{
            type: String
        },
        date:{
            type: String
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