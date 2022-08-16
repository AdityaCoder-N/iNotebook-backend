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

// app.use(function(req,res,next){
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//   next();
// });

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