const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const vendorRoutes = require("./routes/vendorRouts");
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const ProductRoutes = require('./routes/ProductRoutes')
const cors = require('cors')
const path = require('path');


const app = express();

const PORT = process.env.PORT || 5000;

dotEnv.config()

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MDB connected Succefully "))
.catch((error)=>console.log(error))

app.use(bodyParser.json());
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', ProductRoutes);
app.use('/uploads',express.static('uploads'));


app.listen(PORT, () => {
     console.log(`sever started and runing ${PORT}`)
})
app.use('/', (req,res)=>{
     res.send("<h3>welcome to SUBY");

})