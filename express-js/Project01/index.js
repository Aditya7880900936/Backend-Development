const express = require("express");
const app = express();
const userRouter = require("./routes/users");
const { logReqRes } = require("./middlewares/index");
const { connectMongoDB } = require("./connection")

const PORT = process.env.PORT || 8001;

connectMongoDB("mongodb://localhost:27017/express01")
app.use("/users", userRouter)


app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})

