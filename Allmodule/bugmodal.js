let mong=require("mongoose")
let bugmodal=mong.model("bug",mong.Schema({
    name:{type:String,required:true},
    type:{type:String,required:true}
}))
module.exports={
    bugmodal
}