const mongoose = require('mongoose');

const dSchema = new mongoose.Schema({

    address:{
        type:String,required:true
    },
    twcbal:{
        type:Number,required:true
    },
});

const User = mongoose.model('users',dSchema);

module.exports  = User;