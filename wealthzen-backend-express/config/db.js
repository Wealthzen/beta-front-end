const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(con => console.log(`MongoDB Connected: ${con.connection.host}`))
    .catch(err => console.error(`MongoDB Connection Failed: ${err}`));