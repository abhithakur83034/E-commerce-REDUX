const mongoose = require('mongoose');
mongoose.connect("mongodb://0.0.0.0:27017/token",{
    useNewUrlParser:true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("connection created with mongodb")
}).catch((error)=>{
    console.log(error)
})