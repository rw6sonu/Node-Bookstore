const express = require("express");
const router = express.Router();

const upload = require("../uploads/upload");

const {
    homePage,
    addBook,
    saveBook,
    viewBooks,
    editBook,
    updateBook,
    deleteBook
} = require("../controller/bookController");

router.get("/",homePage);

router.get("/add", addBook);
router.post("/add", upload.single("image"), saveBook);

router.get("/view", viewBooks);

router.get("/edit/:id", editBook);
router.post("/update/:id", upload.single("image"), updateBook);

router.get("/delete/:id", deleteBook);

module.exports = router;