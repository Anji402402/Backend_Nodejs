const Firm = require('../models/Firm');
const Vendor = require('../models/vendor');
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const uploads = multer({ storage: storage });

const addFirm = async (req, res) => { // Fixed parameter order
    try {
        const { firmName, area, category, region, offer} = req.body;
        const image = req.file ? req.file.filename : undefined; // Fixed image access

        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        const firm = new Firm({
            firmName, 
            area, 
            category, 
            region, 
            offer, 
            image,  // Fixed property name (Image -> image)
            vendor: vendor._id
        });

       const savedFirm= await firm.save();

       vendor.firm.push(savedFirm)

       await vendor.save()

        return res.status(200).json({ message: "Firm added successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" }); // Fixed status code
    }
};
const deleteFirmById = async(req,res)=>{
    try {
          const firmId= req.params.firmId;
          const deleteProduct = await Firm.findByIdAndDelete(FirmId)
          if(!deleteProduct){
              return res.status(500).json({error:"No product found"})
          }     
    } catch (error) {
         console.error(error)
         res.status(500).json({error:"Internal server error"});    
    }

};

module.exports = { addFirm: [uploads.single('image'), addFirm],deleteFirmById };