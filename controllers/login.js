const jwt = require("jsonwebtoken");
const Joi = require("joi");

const SECRET_KEY = "very_secret";

const loginController = {
  method: "POST",
  path: "/login",
  options: {
    handler: (request, h) => {
      const { username, password } = request.payload;

      let role;
      if (username === "admin" && password === "password") {
        role = "admin";
      } else if (username === "staff" && password === "password") {
        role = "staff";
      } else if (username === "student" && password === "password") {
        role = "student";
      } else {
        return h.response("Geçersiz kullanıcı adı veya şifre").code(401);
      }

      const token = jwt.sign({ username, role }, SECRET_KEY, {
        expiresIn: "1h",
      });

      return h.response({ token }).code(200);
    },
    validate: {
      payload: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }),
      failAction: (request, h, error) => {
        return h.response(error.details[0].message).code(400).takeover();
      },
    },
  },
};

module.exports = loginController;
