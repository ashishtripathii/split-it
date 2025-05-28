const express = require("express");
const router = express.Router();
const { createGroup, joinGroup, rejectGroup,getUserInvitations,getJoinedGroups ,getGroupDetails} = require("../controllers/groupController");
const { protect } = require("../middleware/authMiddleware");


router.post("/create", protect, createGroup);
router.post("/join/:groupId", protect, joinGroup);
router.delete('/reject/:groupId', protect, rejectGroup);

// In routes/groups.js or similar
router.get("/invitations", protect, getUserInvitations);
router.get("/joined", protect, getJoinedGroups);
router.get("/details/:id", protect, getGroupDetails);
router.get('/join/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const group = await Group.findById(id);
    if (!group) return res.status(404).json({ message: "Group not found" });

    res.status(200).json({ group });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
