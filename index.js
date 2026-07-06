const express = require('express')
const dotenv= require('dotenv')
 dotenv.config();
const app= express()
const port=5173
//import databse connection file
const DbConnection = require('./databaseConnectionfile')
console.log(process.env.MONGO_URI);
DbConnection();
app.use(express.json())
 const usersRouter=require("./Routes/users");
 const booksRouter=require("./Routes/books");

app.get('/',(req,res)=>{
    res.status(200).send('Welcome to Library Management System')
})
  app.use("/users",usersRouter)
app.use("/books",booksRouter)
//for any url not mentioned
app.use((req,res)=>{
    res.status(404).send('Page Not Found')
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})   