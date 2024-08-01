const roles = {
  ADMIN: "admin",
  STAFF: "staff",
  STUDENT: "student",
};

const authorize = (allowedRoles) => {
  return {
    method: (request, h) => {
      const user = request.auth.credentials;

      if (!user || !allowedRoles.includes(user.role)) {
        return h.response("Erişim yetkisi yok").code(403).takeover();
      }

      return h.continue;
    },
  };
};

module.exports = { authorize, roles };
