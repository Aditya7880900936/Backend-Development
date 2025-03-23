const express = require("express")
const { handleGenerateNewShortURL , handleGetAnaytics } = require("../Controllers/url")
const router  = express.Router();


router.post('/', handleGenerateNewShortURL);
router.get('/analytics/:shortId', handleGetAnaytics);

module.exports = router;
