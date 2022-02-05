const mongoose = require('mongoose');

const uri = "mongodb+srv://karanpatel2329:K1%40patel2020@flutterapp.yts8p.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose.connect(uri,{
    useNewUrlParser:true,
})


module.exports = mongoose;