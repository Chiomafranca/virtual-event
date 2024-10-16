const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const Routeauth = require('./routes/authRoute')
const eventRoutes = require('./routes/eventRouter');
const { sendEmail} = require('./utils/emailService')


dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/auth', Routeauth); 
app.use('/api/event', eventRoutes);
app.use('/api/email', () => {
   sendEmail
})

mongoose.connect("mongodb://localhost:27017/virtual-event")
   .then(() =>{console.log('DB Connected successfully')})
   .catch((error) =>console.log(error))
   
const port = process.env.PORT || 2000
app.listen(port, console.log(`Running sucessfully on port ${port}`))

