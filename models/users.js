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
        role:{
            type: ["user", "admin"],
            default: "user"
        },
        sex:{
            type: String,
        },
        age:{
            type: Number,
        },
        profilePicture:{
            type: String,
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);    

userSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('users', userSchema);