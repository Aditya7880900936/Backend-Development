const express = require("express")

const router = express.Router()


//Routes  

router.get("/",(req,res)=>{    
    return res.json(users);
}) 

// app.get("/users",(req,res)=>{
//     const html = `
//     <ul>
//     ${users.map(user=>`<li>${user.first_name} ${user.last_name}</li>`).join('')}
//     </ul> 
//     `
//     res.send(html);
// })

router.get("/:id",(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id ===  id);
    if(user){
        return res.json(user);                                     
    }
    return res.status(404).json({error:"User not found"});
})

router.post("/",(req,res)=>{
    console.log(req.body);
    return res.json({message:"User created"});
})

router.patch("/:id",(req,res)=>{ 
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id ===  id);
    if(user){
        return res.json(user);                                     
    }
    return res.status(404).json({error:"User not found"});
})              