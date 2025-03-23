const express = require("express")
const { connectToMongoDB } = require("./connect")
const app = express()
const urlRoute = require("./routes/url")

app.use("/url", urlRoute)
const PORT = process.env.PORT || 5000;
connectToMongoDB('mongodb://localhost:27017/URLShortener')
.then(() => {
  console.log("Connected to MongoDB");
})
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});