const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const parkingSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            unique: true         
        },
        location:{
            type: String
        },
        numberOfParkingSpacesAvailable:{
            type: Number
        },
        owner:{
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);    

parkingSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('parkings', parkingSchema);