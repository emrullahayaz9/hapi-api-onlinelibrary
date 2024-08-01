const Hapi = require("@hapi/hapi");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const SECRET_KEY = "very_secret";

const roles = {
  ADMIN: "admin",
  STAFF: "staff",
  STUDENT: "student",
};

const loginHandler = async (request, h) => {
  console.log(request);
  const { username, password } = request.payload;

  let role;
  if (username === "admin" && password === "password") {
    role = roles.ADMIN;
  } else if (username === "staff" && password === "password") {
    role = roles.STAFF;
  } else if (username === "student" && password === "password") {
    role = roles.STUDENT;
  } else {
    return h.response("Geçersiz kullanıcı adı veya şifre").code(401);
  }

  const token = jwt.sign({ username, role }, SECRET_KEY, {
    expiresIn: "1h",
  });

  return h.response({ token }).code(200);
};

const loginRoute = {
  method: "POST",
  path: "/login",
  handler: loginHandler,
  options: {
    validate: {
      payload: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }),
      failAction: (request, h, error) => {
        console.log("burada");
        return h.response(error.details[0].message).code(400).takeover();
      },
    },
  },
};

module.exports = loginRoute;
