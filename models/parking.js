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
        price:{
            type: String
        },
        rating:{
            type: [Number]
        },
        leaveKeys: {
            type: Boolean,
            default: false
          },
          open24Hours: {
            type: Boolean,
            default: false
          },
          openingTime: {
            type: String,
            required: function() { return !this.open24Hours; }
          },
          closingTime: {
            type: String,
            required: function() { return !this.open24Hours; }
          }
    },
    {
        timestamps: true,
        versionKey: false
    }
);    

parkingSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('parkings', parkingSchema);