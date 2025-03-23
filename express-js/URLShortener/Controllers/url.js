const nanoid  = require("short-id")
const URL = require("../Models/url")
async function handleGenerateNewShortURL(req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({message : "URL is required"})
    const shortID = nanoid(8);
    await URL.create({
        shortId : shortID,
        redirectURL : body.url,
        visitHistory : []
    })
    return res.json({
        id : shortID,
        url : body.url
    })

}

module.exports = {
    handleGenerateNewShortURL
}