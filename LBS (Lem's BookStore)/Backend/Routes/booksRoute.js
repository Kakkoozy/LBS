import express from 'express';
import { Book } from '../models/bookModel.js';


const router = express.Router();


// Making a route for new books
router.post("/", async (request, response) => {
  // Corrected the route path and made the function async
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message:
          "Please send all required fields: Title, author, and publishYear",
      });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook); // Await inside the async function
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({
      message: error.message,
    });
  }
});

//routing to get all books
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({
      message: error.message,
    });
  }
});

// Route to get one book by ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    if (!book) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for updating a book
router.put("/:id", async (request, response) => {
  try {
    const { title, author, publishYear } = request.body;

    if (!title || !author || !publishYear) {
      return response.status(400).send({
        message:
          "Please send all required fields: Title, author, and publishYear",
      });
    }

    const { id } = request.params;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, publishYear },
      { new: true } // This option returns the updated document
    );

    if (!updatedBook) {
      return response.status(404).json({ message: "Error! Book not found!" });
    }

    return response.status(200).json({
      message: "Book updated successfully!",
      book: updatedBook,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for deleting a book

router.delete("/:id", async (request, response) => {
  console.log("SHEEEEET")
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response
        .status(404)
        .json({ message: "Error! Book not found! :) " });
    }
    return response
      .status(200)
      .json({ message: "Wow! You deleted a book! Good riddance >:) " });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


export default router;