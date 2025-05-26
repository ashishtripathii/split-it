const Group = require('../models/Group');
const sendEmail = require('../utils/sendEmail');

const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;
    const adminUser = req.user;

    // Construct members array (first member is admin)
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

    // Send email only to invited members (non-admin)
    const invited = memberDocs.filter((m) => m.status === 'invited');

    await Promise.all(
      invited.map((m) =>
        sendEmail({
          to: m.email,
          subject: `You're invited to join the group "${name}"`,
          text: `Hi ${m.name},\n\nYou've been invited to join the group "${name}". Please sign up or log in to accept the invitation.`,
        })
      )
    );

    res.status(201).json({ message: 'Group created successfully', group });
  } catch (err) {
    console.error('Create Group Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createGroup };