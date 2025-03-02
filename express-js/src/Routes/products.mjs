import { Router } from "express";

const productRouter = Router();

productRouter.get("/api/products",(req,res)=>{
    console.log(req.headers.cookies)
    console.log(req.cookies)
    if(req.cookies.Hello && req.cookies.Hello === "World"){
    return  res.send([{
        id:1,
        name:"Laptop",
        price:"50000"
    },
    {
        id:2,
        name:"Mobile",
        price:"10000"
    }
])
    }

    else return res.status(403).send({" msg" :"Sorry Brother You have A wRONG Cookie "})

})

export default productRouter