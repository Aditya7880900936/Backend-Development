const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = process.env.PORT || 8000;

//Routes  

app.get("/api/users",(req,res)=>{    
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

app.get("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id ===  id);
    if(user){
        return res.json(user);                                     
    }
    return res.status(404).json({error:"User not found"});
})

app.post("/api/users",(req,res)=>{
    console.log(req.body);
    return res.json({message:"User created"});
})

app.patch("/api/users/:id",(req,res)=>{ 
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id ===  id);
    if(user){
        return res.json(user);                                     
    }
    return res.status(404).json({error:"User not found"});
})              

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})

