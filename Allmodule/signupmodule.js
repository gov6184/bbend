let mong=require("mongoose")
let usermodel= mong.model("user",mong.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true}
}))
module.exports={
    usermodel
}