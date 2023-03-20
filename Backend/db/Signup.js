const mongoose= require ('mongoose');

const signupSchema=new mongoose.Schema({
  
    username:String,
    dob:String,
    email:String,
    mobile:String,
    password:String,
    country:String,
    state:String,
    city:String


})
module.exports=mongoose.model('signups',signupSchema);