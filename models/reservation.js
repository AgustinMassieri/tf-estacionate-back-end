const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const reservationSchema = new mongoose.Schema(
    {
        parkingId:{
            type: String
        },
        parkingName:{
            type: String
        },
        userId:{
            type: String
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

reservationSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('reservations', reservationSchema);