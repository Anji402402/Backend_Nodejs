const express = require("express");
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require("./routes/vendorRoutes");
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/ProductRoutes');
//const bodyParser =require('body-parser')
const cors = require('cors');
const path = require('path')

const app = express()

const PORT = 5000;
// Load environment variables first
dotEnv.config();
// //Middleware
app.use("*",cors())

mongoose.connect(process.env.MONGO_URI) // Database connection
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((error) => console.log(error))
// Routes
app.use(bodyParser.json());
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes)
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
    console.log(`server started and running at ${PORT}`);
});

app.use('/home', (req, res) => {
    res.send("<h1> Welcome to SUBY");
});









