const Joi = require("@hapi/joi");

let books = [];

const bookSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  author: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
});

exports.CreateBook = async (request, h) => {
  const { error, value } = bookSchema.validate(request.payload);

  if (error) {
    return h.response(error.details[0].message).code(400);
  }

  const book = {
    id: books.length + 1,
    ...value,
  };

  books.push(book);
  return h.response(book).code(201);
};

exports.GetBooks = (request, h) => {
  return h.response(books).code(200);
};

exports.GetBookById = (request, h) => {
  const { id } = request.params;
  const book = books.find((book) => book.id == id);

  if (!book) {
    return h.response("Kitap bulunamadı").code(404);
  }

  return h.response(book).code(200);
};

exports.UpdateBook = async (request, h) => {
  const { error, value } = bookSchema.validate(request.payload);

  if (error) {
    return h.response(error.details[0].message).code(400);
  }

  const { id } = request.params;
  const index = books.findIndex((book) => book.id == id);

  if (index === -1) {
    return h.response("Kitap bulunamadı").code(404);
  }

  books[index] = { id: parseInt(id), ...value };
  return h.response(books[index]).code(200);
};

exports.DeleteBook = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id == id);

  if (index === -1) {
    return h.response("Kitap bulunamadı").code(404);
  }

  books.splice(index, 1);
  return h.response().code(204);
};
