const connectToMongo = require('./db');


const express = require('express');
var cors = require('cors')
require("dotenv").config();


connectToMongo();

const app = express()
const port = process.env.PORT || 3001;

app.use(cors({
  origin:"*",
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}));

//available routes

app.use('/api/auth',require('./routes/auth')); // for login signup authentication
app.use('/api/notes',require('./routes/notes')); // notes of user

if(process.env.NODE_ENV == "production"){
  app.use(express.static("client/build"));
}

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})