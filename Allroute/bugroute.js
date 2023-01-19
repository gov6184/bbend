let exp =require("express")
let broute=exp.Router()
let {bugmodal} =require("../Allmodule/bugmodal")
let validator=(req,res,next)=>{
    if(req.headers.authorization){
        let val=req.headers.authorization.split(" ")[1]
        console.log(val)
        jwt.verify(val,process.env.secretkey,(err,val)=>{
            if(err)res.status(300).send("try again")
            req.email=val["email"]
           
            next()
        })
    }else{
        res.send("someting went wrong")
    }

}
broute.post("/bugs/post",async(req,res)=>{
    let {name,type}=req.body
    let newbug=new bugmodal(req.body)
    await newbug.save()
    res.send("successfull")

})
broute.get("/bugs",async(req,res)=>{
    let val=await bugmodal.find({})
    res.send(val)
})
module.exports={
    broute
}