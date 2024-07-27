const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = process.env.PORT || 5000
const app=express()
const dotenv = require('dotenv');


dotenv.config();

//routes requirement
const recipeRoutes = require('./routes/recipeRoutes') 
const commentRoutes = require('./routes/commentRoutes') 
const contactusRoutes = require('./routes/contactusRoutes') 
const userRoutes = require('./routes/userRoutes') 

//Json,CORS
app.use(express.json())
app.use(cors())

//establish mongodb connection
mongoose.connect(process.env.MONGO_URI)

//routes
app.use('/api',recipeRoutes)
app.use('/api',commentRoutes)
app.use('/api',contactusRoutes)
app.use('/api',userRoutes)

//run server
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
}) 
