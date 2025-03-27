const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firm: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Firm'
    }]
}, { timestamps: true }); // Added timestamps for createdAt & updatedAt

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;










// const mongoose = require("mongoose");

// const vendorSchema = mongoose.Schema({
//      username:{
//           type:String,
//           required:true
//      },
//      email:{
//           type:String,
//           required:true,
//           unique: true
//      },
//      password:{
//           type:String,
//           required:true
//      },
//      firm:[
//           {
//                type:mongoose.Schema.Types.ObjectId,
//                ref:'Firm'
//           }
//      ]     
// });

// const Vendor = mongoose.model("Vendor", vendorSchema);

// module.exports = Vendor;