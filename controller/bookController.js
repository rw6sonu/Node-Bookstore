const Book = require("../models/book");
const fs = require("fs"); 
const path = require("path");

exports.homePage = async (req, res) => {
    try {
        // console.log("Homepage route hit");

        const books = await Book.find();

        // console.log("Books:", books);

        const totalBooks = books.reduce((sum, book) => {
            return sum + book.quantity;
        }, 0);

        res.render("index", {
            books,
            totalBooks
        });

    } catch (error) {
        console.error("HOME PAGE ERROR:", error);
        res.send(error.message);
    }
};

exports.addBook = (req, res) => {
  res.render("addBook");
};

exports.saveBook = async (req, res) => {
  try {
    const { title, author, category, price, quantity, description } = req.body;

    const newBook = new Book({
      title,
      author,
      category,
      price,
      quantity,
      description,
      image: req.file ? req.file.filename : "",
    });

    await newBook.save();

    res.redirect("/view");
  } catch (error) {
    console.log(error);
    res.send("Error while saving book");
  }
};

exports.viewBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.render("viewBook", { books });
  } catch (error) {
    console.log(error);
    res.send("Error fetching books");
  }
};
exports.editBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    res.render("editBook", { book });
  } catch (error) {
    console.log(error);
    res.send("Error loading edit page");
  }
};
exports.updateBook = async (req, res) => {
  try {
    const { title, author, category, price, quantity, description } = req.body;

    const updatedData = {
      title,
      author,
      category,
      price,
      quantity,
      description,
    };

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    await Book.findByIdAndUpdate(req.params.id, updatedData);

    res.redirect("/view");
  } catch (error) {
    console.log(error);
    res.send("Error updating book");
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.send("Book not found");
    }

    if (book.image) {
      const imagePath = path.join(__dirname, "../uploads", book.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Book.findByIdAndDelete(req.params.id);

    res.redirect("/view");
  } catch (error) {
    console.log(error);
    res.send("Error deleting book");
  }
};
