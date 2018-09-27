const db = require("../models");

module.exports = async (decoded, req) => {
  const user = await db.User.findById(decoded._id);
  return { isValid: !!user };
};
