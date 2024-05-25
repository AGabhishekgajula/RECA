const mongoose =require("mongoose");


const userSchema=mongoose.Schema({
     username:{
        type:String,
        required:true,
     },
     rollno:{
        type:String,
        required:true,
        unique:true,
     },
     password:{
        type:String,
        minLength:8,
        maxLength:20,
     },

});
const User=mongoose.model("User",userSchema);
module.exports=User;