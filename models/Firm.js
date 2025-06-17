const mongoose = require("mongoose");

const firmSchema = new mongoose.Schema({
    firmName: {
        type: String,
        required: true,
        unique: true
    },
    area: {
        type: String,
        required: true
    },
    category: {
        type: [String],  // Just an array of strings
        enum: ["veg", "non-veg"],
        required: true
    },
    region: {
        type: [String],
        enum: ["south-indian", "north-indian", "chinese", "bakery"],
        required: true
    },
    offer: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        validate: {
            validator: function (v) {
                return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v);
            },
            message: props => `${props.value} is not a valid image URL!`
        }
    },
    vendor: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    }],
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

const Firm = mongoose.model('Firm', firmSchema);

module.exports = Firm;
