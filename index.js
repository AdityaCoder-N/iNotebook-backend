const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')
require("dotenv").config();


connectToMongo();

const app = express()
const port = process.env.PORT || 3001;
const newport ="https://fast-atoll-05903.herokuapp.com/"+port;
app.use(cors())
app.use(express.json())
//available routes

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

if(process.env.NODE_ENV == "production"){
  app.use(express.static("client/build"));
}

app.listen(newport, () => {
  console.log(`iNotebook backend listening on port ${newport}`)
})