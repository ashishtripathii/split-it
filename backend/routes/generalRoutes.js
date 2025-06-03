const express = require("express");
const router = express.Router();
const { submitQuery } = require("../controllers/generalController");
const { submitFeedback, getAllFeedback } = require("../controllers/generalController");
// POST route to handle contact form submissions
router.post("/contact", submitQuery);
router.post("/submit-feedback", submitFeedback);
router.get("/all-feedback", getAllFeedback);
module.exports = router;
