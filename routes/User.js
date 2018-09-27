const userHandlers = require("../handlers/User");

module.exports = [
  {
    path: "/restrict",
    method: "GET",
    config: { auth: "jwt" },
    handler(req, h) {
      const response = h.response({ message: "You used a token." });
      return response;
    }
  },
  {
    path: "/api/user",
    method: "POST",
    config: { auth: false },
    handler: userHandlers.signup
  },
  {
    path: "/api/auth/login",
    method: "POST",
    config: { auth: false },
    handler: userHandlers.signin
  }
];
