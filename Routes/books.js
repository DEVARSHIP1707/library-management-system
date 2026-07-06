const express = require("express");
const books= require("../Data/books.json")
const users= require("../Data/users.json")
const {UserModel,BookModel}=require("../Models/indexmodel");
const { getAllBooks, getSingleBookById, getAllIssuedBooks,addNewBook, updateBookById ,deleteBookById} = require("../Controllers/book-controller");
const router = express.Router();
/*
*Route: /books
Method: GET
Description: Get list of all the books in the system
Access:Public
Parametters:None
*/

// router.get("/", (req, res) => {
//     res.status(200).json({
//         data:books
//     })
// });
router.get("/", getAllBooks);
/*
Route: /books/issued
Method: GET
Description: Get list of issued books
Access:Public
Parameters:None
*/
// router.get('/issued',(req,res)=>{
//     const usersWithIssuedBooks=users.filter((each)=>{
//         if(each.issuedBook){
//             return each;
//         }
//     })
//     const issuedBooks=[]
//     usersWithIssuedBooks.forEach((each)=>{
//         const book = books.find((book)=>book.id===Number(each.issuedBook));
//         book.issuedBy=each.name;
//         book.issuedDate=each.issuedDate;
//         book.returnDate=each.returnDate;
//         issuedBooks.push(book);
//     })
//     if(issuedBooks.length===0){
//         return res.status(404).json({
//             success:false,
//             data:"No Books Issued"
//         })
//     }
//    res.status(200).json({
//     success:true,
//     data:issuedBooks
//    })
// })
router.get('/issued',getAllIssuedBooks)
/*
*Route: /books/:id
Method: GET
Description: Get Book by ID
Access:Public
Parametters:id
*/
// router.get('/:id',(req,res)=>{
//     const id=Number(req.params.id);
//   const book= books.find((each)=>each.id===id)
//   if(!book){
//    return res.status(404).json({
//         success:false,
//         message:'Book not found'
//     })
//   }
//     res.status(200).json({
//         success:true,
//         data:book
//     })
// })
router.get('/:id',(req,res)=>getSingleBookById)
/*
*Route: /books
Method: POST
Description: Add a new book to system
Access:Public
Parameters:none
*/
// router.post('/',(req,res)=>{
//     const {id,name,author,genre,price,publisher}=req.body;
//     if(!id || !name || !author || !genre || !price || !publisher){
//        return res.status(400).json({
//         success:false,
//         message:'All fields are required'
//        })
//     }
//     const book =books.find((each)=>each.id===id)
//     if(book){
//         return res.status(400).json({
//             success:false,
//             message:"Book Already Exist"
//         })
//     }
//     books.push({
//         id,
//         name,
//         author,
//         genre,
//         price,
//         publisher,
//     })
//     res.status(201).json({
//         success:true,
//         message: "Book added successfully"
//     })
// })
router.post('/',addNewBook)

/*
*Route: /books
Method: PUT
Description: Update details of a new book to system by id
Access:Public
Parameters:id
*/
// router.put('/:id',(req,res)=>{
//     const id=Number(req.params.id)
//     const data=req.body
//     const book= books.find((each)=>each.id===id)
//     if(!book){
//    return res.status(404).json({
//         success: false,
//         message:"Book Doesn't Exist"
//     })
//   }
//   const index = books.findIndex(each=>each.id===id);
//   books[index]={
//     ...books[index],
//     ...data
//   };
//   res.status(200).json({
//     success:true,
//     message:"Book updated successfully",
// });
// })
router.put('/:id',updateBookById)
/*
Route: /books/:id
Method: Delete
Description: Delete entry of the book by id
Access:Public
Parameters:id
*/
// router.delete('/:id',(req,res)=>{
//     const id=Number(req.params.id)
//     const book=books.find((each)=>each.id===id)
//     if(!book){
//          return res.status(404).json({
//             success:false,
//             message:"Book Not Found"
//          })
//     }
//     const index=books.findIndex((each)=>each.id===id);
//          books.splice(index,1) // as it is zero indexed 
//          res.status(200).json({
//             success:true,
//             message:"Book Deleted Successfully"
//          })
// })
router.delete('/:id',deleteBookById)

module.exports = router; 