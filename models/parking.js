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
        },
        priceList:[{
            duration: {
                type: String,
                enum: ['1 hora', '6 horas', '12 horas', '1 dia']
            },
            price:{
                type: Number,
                min: 0
            }
        }]
    },
    {
        timestamps: true,
        versionKey: false
    }
);    

parkingSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('parkings', parkingSchema);