let {usermodel}=require("../Allmodule/signupmodule")
let exp=require("express")
let jwt=require("jsonwebtoken")
let bcrypt=require("bcrypt")
let loginsignuproute=exp.Router()
require("dotenv").config()

loginsignuproute.post("/signup",async(req,res)=>{
    let {email,password}=req.body

    let val=await usermodel.findOne({email})
    if(val){
        res.sendStatus(409).send("user already present try different email")


    }else{
        bcrypt.hash(password,5,async(err,result)=>{
            if(err)res.send("server error please try again after some time")
            let newuser=new usermodel({
                email,
                password:result
            })
            await newuser.save()
            res.send("signup successfull")

        })
        
    }
})
loginsignuproute.post("/login",async(req,res)=>{
    let {email,password}=req.body;
    let userdetails=await usermodel.findOne({email})
    if(userdetails){
        bcrypt.compare(password,userdetails["password"],async(err,ans)=>{
            console.log(ans,err)
            if(!ans)res.sendStatus(400).send("crediential were wrong please try again")
            if(ans){
                jwt.sign({email},process.env.secretkey,(err,data)=>{
                    if(err)res.send(err)
                    res.send({token:data})
                })

            }
        })

    }else{
        res.sendStatus(400).send("please signup")
    }
})
module.exports={
    loginsignuproute
}