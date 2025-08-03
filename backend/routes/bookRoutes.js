import express from "express";
const router = express.Router();
import { Book } from "../bookmodel.js";
router.post("/", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: "Please provide all the required fields: title, author, publishYear"
      });
    }

    const newBook = new Book({ title, author, publishYear });
    const savedBook = await newBook.save();

    return res.status(201).send(savedBook);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
});

router.get('/', async(req,res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count : books.length,
      data : books
    })
    
  }
  catch (error) {
    console.log(error.message);
    return res.status(500).send({message: error.message});
  }
})
// get one book by id
router.get('/:id', async(req,res) => {
  try {
    const {id} = req.params;
    const books = await Book.findById(id);
    return res.status(200).json(books);
    
  }
  catch (error) {
    console.log(error.message);
    return res.status(500).send({message: error.message});
  }
})
//update book
router.put('/:id', async(req,res) => {

  try {
    if(!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "please provide all the required fields: title,author,publishYear"
      });
    }
    const {id} = req.params;
    const books =  await Book.findByIdAndUpdate(id,req.body);
    if(!books) {
      return res.status(404).send({message: "book not found"});
    }
    return res.status(200).send({message: "book update successfully"});
  }
  catch(error) {
    console.log(error.message);
    return res.status(500).send({message: error.message});
  }

  
})
// delete book 
router.delete('/:id',async(req,res) => {
  try {
    const {id} = req.params;
    const books = await Book.findByIdAndDelete(id);
    if(!books) {
      return res.status(404).send({message:"book not found"});
    }
    return res.status(200).send({message:"book deleted succesfully"});
  }
  catch(error) {
    console.log(error.message);
    return res.status(500).send({message: error.message});
  }
});
export default router;