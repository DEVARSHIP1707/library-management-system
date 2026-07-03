const express = require('express')
const app= express()
const port=5173
app.use(express.json())
app.get('/',(req,res)=>{
    res.status(200).send('Welcome to Library Management System')
})
//For any url not mentioned above 
app.use((req,res)=>{
    res.status(404).send('Page Not Fount')
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})   