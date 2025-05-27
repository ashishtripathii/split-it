const express = require("express");
const router = express.Router();
const { createGroup } = require("../controllers/groupController");
const { joinGroup } = require('../controllers/groupController');
const { protect } = require("../middleware/authMiddleware");

router.post("/create", protect, createGroup);
router.post('/join/:groupId', protect, joinGroup);

module.exports = router;
