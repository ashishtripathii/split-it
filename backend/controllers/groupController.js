const Group = require('../models/Group');
const sendEmail = require('../utils/sendEmail');

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

module.exports = { createGroup, joinGroup }; // assuming createGroup already defined
