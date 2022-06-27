const express = require('express');
const app = express();
const dotenv = require('dotenv');
var cors = require('cors')


// Middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// Configuration
dotenv.config();
require('./config/db');


// Constants
const PORT = process.env.PORT || 5555;


// Routes
app.use('/api/questions', require('./routes/question'));


// Server
app.listen(PORT, () => console.log(`${process.env.NODE_ENV} Server running @${PORT}`));