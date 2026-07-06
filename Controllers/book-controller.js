const {BookModel,UserModel}= require('../Models/indexmodel')
const IssuedBook=require("../DTOS/book-dto")
// const getAllBooks=()=>{}
// const getSingleBookById=()=>{}
// module.exports={
//     getAllBooks,
//     getSingleBookById
// }
 exports.getAllBooks=async(req,res)=>{
    const books = await BookModel.find()
    if(books.length===0){
        return res.status(404).json({
            success:false,
            message:"No Book In The System"
        })
    }
    res.status(200).json({
        success:true,
        data:books
    })
 }

 exports.getSingleBookById=async(req,res)=>{
    const id=req.params.id
    const book=await BookModel.findById(id)
      if(!book){
   return res.status(404).json({
        success:false,
        message:'Book not found'
    })
  }
    res.status(200).json({
        success:true,
        data:book
    })
 }
 exports.getAllIssuedBooks=async(req,res)=>{
   const users= UserModel.find({
    issuedBook:{$exists: true},
   }).populate("issuedBook")
   const issuedBooks=(await users).map((each)=>{
    return new IssuedBook(each);
   });
        if(issuedBooks.length===0){
            return res.status(404).json({
                success:false,
                data:"No Books Issued"
            })
        }
       res.status(200).json({
        success:true,
        data:issuedBooks
       })
    }
exports.addNewBook=async(req,res)=>{
    const data=req.body;
    if(!data || Object.keys(data).length===0){
        return res.status(400).json({
            success:false,
            message:"Please Provide the data to add to new Book"
        })
    }
    await BookModel.create(data)
    const allBooks=await BookModel.find();
    res.status(201).json({
        success:true,
        message:"Book added Successfully",
        data: allBooks
    })
}
 exports.updateBookById=async(req,res)=>{
    const id= req.params.id;
    const data= req.body
    if(!data || Object.keys(data).length===0){
        return res.status(400).json({
            success:false,
            message: "Please provide the data to update"
        })
    }
    const book= await BookModel.findById(id);
    if(!book){
        return res.status(404).json({
            success:false,
            message:"Book Not Found"
        })
    }
    Object.assign(book,data)
        await book.save();
        res.status(200).json({
        success:true,
        message:"Book Updated Successfully",
        data: book
    })
}
 exports.deleteBookById=async(req,res)=>{
    const id= req.params.id
    const book = await BookModel.findById(id);
    if(!book){
        return res.status(404).json({
            success:false,
            message:'Book Not Found'
        })
    }
    await BookModel.findByIdAndDelete(id);
    res.status(200).json({
        success:true,
        message:"Book Deleted Successfully"
    })
 }