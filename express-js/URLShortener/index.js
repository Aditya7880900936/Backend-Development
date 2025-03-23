const express = require("express");
const { connectToMongoDB } = require("./connect");
const app = express();
const urlRoute = require("./routes/url");
const URL = require("./Models/url");
const PORT = process.env.PORT || 5001;

connectToMongoDB("mongodb://localhost:27017/URLShortener").then(() => {
  console.log("Connected to MongoDB");
});
// Add this middleware before defining routes
app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId: shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp : Date.now()
        },
      },
    }
  );
  res.redirect(entry.redirectURL)
});

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
