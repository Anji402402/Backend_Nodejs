const vendorControler = require('../controllers/vendorController');
const express = require('express')
const router = express.Router()

router.post('/register',vendorControler.vendorRegister)
router.post('/login', vendorControler.vendorLogin)

router.get('/all-vendors', vendorControler.getAllVendors)
router.get('/single-vendor/:apple',vendorControler.getVendorById)


module.exports = router;













