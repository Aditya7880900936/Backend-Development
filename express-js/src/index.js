import express from 'express';

const app = express();

const PORT = process.env.PORT || 4000;

app.get('/',(req,res)=>{
   return res.send("Hello World from Home Page");
})

app.get('/about',(req,res)=>{
    return res.send("Hello from About Us Page");
 })

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
}) 