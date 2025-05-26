const express = require("express");
const router = express.Router();
const { createGroup } = require("../controllers/groupController");
const { protect } = require("../middleware/authMiddleware");

router.post("/create", protect, createGroup);

module.exports = router;
