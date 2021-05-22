const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/PIA", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(db => console.log("conectado"))
.catch(err => console.log(err))
