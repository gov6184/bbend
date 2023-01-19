let mong=require("mongoose")
require("dotenv").config()
mong.set('strictQuery', false);
let connect=mong.connect(process.env.url)
module.exports={
    connect
}