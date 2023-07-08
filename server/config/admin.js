const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        default:"admin@gmail.com"
    },
    password:{
        type:String,
        default:"admin123"
    }
});

module.exports = mongoose.model('admin',adminSchema)