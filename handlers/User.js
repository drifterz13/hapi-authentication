const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Boom = require("boom");

module.exports = {
  signup: async (req, h) => {
    try {
      const { username, password } = req.payload;
      const user = await db.User.findOne({ username });
      if (user) {
        return Boom.badRequest("This username is already taken.");
      }
      const hashPassword = await bcrypt.hash(password, 8);

      const newUser = await db.User.create({
        username,
        password: hashPassword
      });
      const token = jwt.sign(
        {
          _id: newUser._id
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h"
        }
      );
      const response = h.response({ token });
      return response;
    } catch (err) {
      return Boom.badImplementation("Some thing went wrong!");
    }
  },

  signin: async (req, h) => {
    try {
      const { username, password } = req.payload;
      const user = await db.User.findOne({ username });
      if (!user) {
        return Boom.unauthorized("Invalid username!");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return Boom.unauthorized("Invalid password!");
      }
      const token = jwt.sign(
        {
          _id: user._id
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h"
        }
      );
      return h.response({ token });
    } catch (err) {
      return Boom.badImplementation("Something went wrong!");
    }
  }
};
