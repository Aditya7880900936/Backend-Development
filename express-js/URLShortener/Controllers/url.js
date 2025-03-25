const shortid = require("short-id");
const URL = require("../Models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ message: "URL is required" });
  const shortID = shortid.generate(); // Use shortid to generate a unique ID
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.render('home',{
    id: shortID,
  })
  // return res.json({
  //   id: shortID,
  //   url: body.url,
  // });
}

async function handleGetAnaytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
    handleGetAnaytics,
};
