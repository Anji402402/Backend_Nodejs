const express = require('express');
const vendorController = require("../controllers/vendorController"); // Fixed typo

const router = express.Router();

router.post('/register', vendorController.vendorRegister);
router.post('/login', vendorController.vendorLogin);

router.get('/all-vendors',vendorController.getAllVendors)
router.get('/single-vendor/:anji', vendorController.getVendorById)

module.exports = router;









// const vendorcontrollere = require("../controllers/vendorController");
// const express = require('express');

// const router = express.Router();
// router.post('/register',vendorcontrollere.vendorRegister)
// router.post('/login', vendorcontrollere.vendorLogin); 


// module.exports = router