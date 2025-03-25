const express = require("express");
const { connectToMongoDB } = require("./connect");
const app = express();
const path = require("path");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/StaticRouter");
const URL = require("./Models/url");
const PORT = process.env.PORT || 5000;

connectToMongoDB("mongodb://localhost:27017/URLShortener").then(() => {
  console.log("Connected to MongoDB");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Add this middleware before defining routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));  

app.get("/test", async (req, res) => {
  const allURLs = await URL.find({});
  return res.render("home", {
    urls: allURLs,
  });
});

app.use("/url", urlRoute);
app.use("/", staticRoute);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  // Find the entry in the database
  const entry = await URL.findOneAndUpdate(
    { shortId: shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true } // Return the updated document
  );

  // If no entry is found, return a 404 response
  if (!entry) {
    return res.status(404).send({ message: "Short URL not found" });
  }

  // Redirect to the original URL
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
