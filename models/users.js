const mongoose = require('mongoose');

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
            type: String
        },
        role:{
            type: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);    

module.exports = mongoose.model('users', userSchema);