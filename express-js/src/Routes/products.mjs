import { Router } from "express";

const productRouter = Router();

productRouter.get("/api/products",(req,res)=>{
    res.send([{
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
})

export default productRouter