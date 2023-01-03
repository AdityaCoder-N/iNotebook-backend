const mongoose = require('mongoose');
// const mongopass="RGeFpAimr9G2N7y";

const mongoURI = "mongodb+srv://Aditya:RGeFpAimr9G2N7y@cluster0.ax4kei2.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo =()=>{

    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to mongo succesfully");
    })

}
module.exports = connectToMongo;