const Group = require('../models/Group');
const sendEmail = require('../utils/sendEmail');

// Create group and send invitations
const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;
    const adminUser = req.user;

    const memberDocs = members.map((m) => ({
      name: m.name,
      email: m.email,
      isAdmin: m.email === adminUser.email,
      status: m.email === adminUser.email ? 'joined' : 'invited',
    }));

    const group = new Group({
      name,
      admin: adminUser._id,
      members: memberDocs,
    });

    await group.save();

    const invited = memberDocs.filter((m) => m.status === 'invited');

    await Promise.all(
      invited.map((m) =>
        sendEmail({
          to: m.email,
          subject: `You're invited to join the group "${name}"`,
          html: `
            <p>Hi ${m.name},</p>
            <p>You've been invited to join the group <strong>"${name}"</strong>.</p>
            <p>Please sign up or log in to accept the invitation.</p>
            <a href="http://localhost:5173/group/join/${group._id}" style="display:inline-block;margin-top:10px;padding:10px 15px;background:#4f46e5;color:white;text-decoration:none;border-radius:5px;">
              Accept Invitation
            </a>
            <p>If the button doesn't work, copy and paste this URL into your browser:</p>
            <p>http://localhost:5173/group/join/${group._id}</p>
          `,
        })
      )
    );

    res.status(201).json({ message: 'Group created and invitations sent', group });
  } catch (err) {
    console.error('Create Group Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Join group
const joinGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    const userEmail = req.user.email;
    const member = group.members.find(m => m.email === userEmail);
    if (!member) return res.status(403).json({ message: 'You are not invited to this group' });

    if (member.status === 'joined') {
      return res.status(400).json({ message: 'Already joined' });
    }

    member.status = 'joined';
    await group.save();

    res.json({ message: 'You have joined the group successfully', group });
  } catch (err) {
    console.error('Join Group Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Reject group invitation
const rejectGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    const userEmail = req.user.email;
    const memberIndex = group.members.findIndex(m => m.email === userEmail);

    if (memberIndex === -1) {
      return res.status(403).json({ message: 'You are not invited to this group' });
    }

    const member = group.members[memberIndex];

    if (member.status === 'joined') {
      return res.status(400).json({ message: 'You have already joined the group' });
    }

    // Remove the invitation
    group.members.splice(memberIndex, 1);
    await group.save();

    res.json({ message: 'You have rejected the group invitation' });
  } catch (err) {
    console.error('Reject Group Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
const getUserInvitations = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const groups = await Group.find({ "members.email": userEmail });
    const invitations = groups
      .map(group => {
        const member = group.members.find(m => m.email === userEmail);
        if (member && member.status === 'invited') {
          return {
            _id: group._id,
            name: group.name,
            inviterName: group.createdBy, // yahan agar createdBy me naam nahi hai toh populate karo
            status: member.status,
          };
        }
        return null;
      })
      .filter(Boolean);

    res.json({ invitations }); // <-- yeh zaroori hai
  } catch (err) {
    console.error("Error fetching invitations:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// const getJoinedGroups = async (req, res) => {
//   try {
//     const userEmail = req.user.email;

//     const groups = await Group.find({
//       members: {
//         $elemMatch: { email: userEmail, status: 'joined' }
//       }
//     });

//     res.status(200).json({ groups });
//   } catch (error) {
//     console.error("Error fetching joined groups:", error);
//     res.status(500).json({ message: "Server error fetching joined groups" });
//   }
// };

const getGroupDetails= async (req, res) => {
  try {
    const groupId = req.params.groupId;

    const group = await Group.findById(groupId).populate({
      path: 'members.user',
      select: 'fullName email',  // select only these fields from user
    });

    if (!group) return res.status(404).json({ message: 'Group not found' });

    // Map members to include user details + status + isAdmin
    const members = group.members.map((member) => ({
      _id: member.user._id,
      fullName: member.user.fullName,
      email: member.user.email,
      status: member.status,
      isAdmin: member.isAdmin,
    }));

    res.json({
      group: {
        _id: group._id,
        name: group.name,
        description: group.description || '',
        members,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


const getJoinedGroups=async (req, res) => {
  try {
    const userId = req.user._id; // assuming you get userId from auth middleware

    // Find groups where user is a member with status "joined"
    const groups = await Group.find({
      'members.user': userId,
      'members.status': 'joined',
    }).select('_id name'); // you can select what fields you want here

    res.json({ groups });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createGroup, joinGroup, rejectGroup,getUserInvitations , getJoinedGroups, getGroupDetails };
