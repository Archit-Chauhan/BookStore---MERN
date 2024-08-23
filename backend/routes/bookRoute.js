const express = require("express");
const router = express.Router();


// import the schema
const Book = require("../models/bookModels");




// route to post a book
router.post('/',async(req,res) =>{
    try{
        const {title,author,publishYear} = req.body;
        // validation
        if(!title||!author||!publishYear){
            return res.status(400).json({
                success:false,
                message:"Send all required fields"
            })
        }

        const newBook = await Book.create({
            title,author,publishYear
        })

        return res.status(201).json({
            success:true,
            message:"Book Stored in db",
            data:newBook
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Book not Posted"
        })
    }
})

// route a fetch all books in db
router.get('/',async(req,res)=>{
    try{
        const allBooks = await Book.find({});
        return res.status(200).json({
            count:allBooks.length,
            success:true,
            message:"All Books fetched",
            data:allBooks
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error in fetching the books"
        })
    }
})


// route for getting a single book from db by id
router.get('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        // console.log(id);
        const book = await Book.findById(id);
        return res.status(200).json({
            success:true,
            message:"Book fetched",
            data:book
        })
    }catch(error){
        const id = req.params.id;
        console.log(error);
        res.status(500).json({
            success:false,
            message:`Error in fetching the book with id ${id}`
        })
    }
})

// route for updating the book
router.put('/:id',async(req,res) =>{
    try{
        const {title,author,publishYear} = req.body;
        // validation
        if(!title||!author||!publishYear){
            return res.status(400).json({
                success:false,
                message:"Send all required fields"
            })
        }
        const id = req.params.id;
        const updatedBook = await Book.findByIdAndUpdate(id,req.body);
        if(!updatedBook){
            return res.status(404).json({
                success:false,
                message:"Book not found"
            })
        }
        else{
            return res.status(200).json({
                success:true,
                message:"Book updated successfully"
            })
        }
    }catch(error){
        const id = req.params.id;
        console.log(error);
        res.status(500).json({
            success:false,
            message:`Error in updating the book with id ${id}`
        })
    }
})

// Route for deleting the book
router.delete('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        // console.log(id);
        const book = await Book.findByIdAndDelete(id);
        if(!book){
            return res.status(404).json({
                success:false,
                message:"Book not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Book Deleted",
            data:book
        })
    }catch(error){
        const id = req.params.id;
        console.log(error);
        res.status(500).json({
            success:false,
            message:`Error in fetching the book with id ${id}`
        })
    }
})

module.exports = router;