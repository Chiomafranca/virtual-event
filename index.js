const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authRoute = require("./routes/auth")
const eventRoute = require('./routes/event')

dotenv.config()
const app = express()
app.use(express.json())

app.use('/auth', authRoute)
app.use('/event', eventRoute)

mongoose.connect("mongodb://localhost:27017/virtual")
   .then(() =>{console.log('DB Connected successfully')})
   .catch((error) =>console.log(error))

app.get('/', (req, res) =>{
    res.send('Hello api')
})

const port = process.env.port || 2000
app.listen(port, console.log(`Running sucessfully on port ${port}`))
