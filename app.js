const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");
const BookRoutes = require("./routes/BookRoutes");
const loginRoute = require("./routes/login");

const SECRET_KEY = "very_secret";

const validate = async (decoded, request, h) => {
  return { isValid: true, credentials: decoded };
};

const init = async () => {
  const server = Hapi.server({
    port: 3001,
    host: "localhost",
  });

  await server.register([require("@hapi/inert"), require("@hapi/vision"), Jwt]);

  server.auth.strategy("jwt", "jwt", {
    keys: SECRET_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: 60 * 60,
    },
    validate,
  });

  server.auth.default("jwt");

  server.route({
    method: "POST",
    path: "/login",
    handler: loginRoute.handler,
    options: loginRoute.options,
  });

  server.route(BookRoutes);

  await server.start();
  console.log(
    `Sunucu http://localhost:${server.info.port} adresinde çalışıyor`
  );
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
