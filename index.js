let exp=require("express")
let {connect}=require("./config/db")
let {broute}=require("./Allroute/bugroute")
let {loginsignuproute}=require("./Allroute/loginandsignuproute")
let cors=require("cors")
require("dotenv").config()
let port = process.env.PORT || 3000
let app=exp()
app.use(exp.json())
app.use(cors())
app.use(loginsignuproute)
app.use(broute)
app.get("/",(req,res)=>{
    res.send("hii")

})
app.listen(port,async()=>{
    try {
        await connect
        console.log("connected to server")
    } catch (error) {
        console.log("connection unsuccessfull")
    }
    console.log("connected")
})
