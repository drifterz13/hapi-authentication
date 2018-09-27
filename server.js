require("dotenv").config();
const Hapi = require("hapi");
const userRoutes = require("./routes/User");
const validate = require("./utils/validate");

const init = async () => {
  const server = Hapi.Server({ port: 8000, host: "localhost" });

  await server.register(require("hapi-auth-jwt2"));

  server.auth.strategy("jwt", "jwt", {
    key: process.env.JWT_SECRET,
    validate,
    verifyOptions: { algorithms: ["HS256"] }
  });

  server.auth.default("jwt");

  server.route(userRoutes);

  await server.start();
  return server;
};

init()
  .then(server => console.log(`☘ server is running on PORT ${server.info.uri}`))
  .catch(err => {
    throw err;
  });
