const {
  CreateBook,
  GetBooks,
  GetBookById,
  UpdateBook,
  DeleteBook,
} = require("../controllers/BookController");

const bookRoutes = [
  {
    method: "POST",
    path: "/api/books",
    handler: CreateBook,
    options: {
      auth: "jwt",
    },
  },
  {
    method: "GET",
    path: "/api/books",
    handler: GetBooks,
    options: {
      auth: "jwt",
    },
  },
  {
    method: "GET",
    path: "/api/books/{id}",
    handler: GetBookById,
    options: {
      auth: "jwt",
    },
  },
  {
    method: "PUT",
    path: "/api/books/{id}",
    handler: UpdateBook,
    options: {
      auth: "jwt",
    },
  },
  {
    method: "DELETE",
    path: "/api/books/{id}",
    handler: DeleteBook,
    options: {
      auth: "jwt",
    },
  },
];

module.exports = bookRoutes;
