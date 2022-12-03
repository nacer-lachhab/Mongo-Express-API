const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');//c' est un plugin de validation

const  userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type:String,required:true}
});

userSchema.plugin(uniqueValidator);//assurer la validation: unicité et autres.

module.exports = mongoose.model('User',userSchema);