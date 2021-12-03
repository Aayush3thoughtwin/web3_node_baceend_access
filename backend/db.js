const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dSchema',{useNewUrlParser: true},(err)=>
{
    if(!err){console.log('Mongodb conected bhiya')}
    else{
        console.log('Error'+err);
    }
});

const User = require('./sceama.js');

async function users(){
    const user = await User.find()
    console.log(user);
}
users()