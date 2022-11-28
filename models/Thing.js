const mongoose = require('mongoose');//model mongoose; permetant l'interaction avec mongoDB

const ThingSchema = mongoose.Schema({
    title: {type:String,required:true} ,
    description: {type:String,required:true} ,
    imageUrl: {type:String,required:true} ,
    price: {type:Number,required:true},
    userId:  {type:String,required:true}
});

module.exports= mongoose.model('Thing',ThingSchema);