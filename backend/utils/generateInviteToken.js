const crypto = require('crypto');

module.exports = function generateInviteToken() {
  return crypto.randomBytes(20).toString('hex'); // 40 chars hex token
};
