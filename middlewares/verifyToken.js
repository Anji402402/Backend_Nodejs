const Vendor = require('../models/vendor');
const jwt = require('jsonwebtoken');
const dotEnv = require("dotenv");

dotEnv.config();

const secretKey = process.env.whereisYourName; // Fixed incorrect env variable name

const verifyToken = async (req, res, next) => {
    const token = req.headers.token; // Fixed token retrieval

    if (!token) {
        return res.status(401).json({ error: "Token is required" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        const vendor = await Vendor.findById(decoded.vendorId);
        
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }

        req.vendorId = vendor._id;
        next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Invalid token" }); // Fixed status code
    }
};

module.exports = verifyToken; // Fixed incorrect export syntax