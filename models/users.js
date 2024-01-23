const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,            
        },
        lastName:{
            type: String
        },
        email:{
            type: String,
            unique: true
        },
        password:{
            type: String,
            select: false
        },
        role: {
            type: String,
            enum: ["user", "admin"]
        },
        sex:{
            type: String,
        },
        phone:{
            type: String,
        },
        profilePicture:{
            type: String,
        },
        secretToken:{
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);    

userSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('users', userSchema);