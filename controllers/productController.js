const Product = require('../models/Product');
const multer = require('multer');
const Firm = require('../models/Firm');
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const uploads = multer({ storage: storage });
const addProduct = async(req,res)=>{
     try {
              const {productName,price,category,bestseller,description} =req.body;
              const image = req.file ? req.file.filename : undefined;

              const firmId = req.params.firmId
              const firm = await Firm.findById(firmId)
              if(!firm){
               return res.status(404).json({error:"No firm found"})
              }
              const product =new Product({
               productName,
               price,
               category,
               bestseller,
               description, 
               image, 
               firm:firm._id
              });
              const savedProduct = await product.save();
              firm.products.push(savedProduct)
              await firm.save()
              res.status(201).json({ message: "Product added successfully" });

     } catch (error) {
          console.error(error)
          res.status(500).json({error:"Internal server error"});
          
     }
}
     const getProductByFirm = async(req,res)=>{
          try {
               const firmId = req.params.firmId
              const firm = await Firm.findById(firmId)
              if(!firm){
               return res.status(404).json({error:"No firm found"})
              }
              const restaurtantName = firm.firmName
              const product = await Product.find({firm:firmId})

              res.status(200).json({ restaurtantName,product});    
          } catch (error) {
               console.error(error)
               res.status(500).json({error:"Internal server error"});    
          }
     }
 const deleteProductById = async(req,res)=>{
     try {
           const productId= req.params.productId;
           const deleteProduct = await Product.findByIdAndDelete(productId)
           if(!deleteProduct){
               return res.status(500).json({error:"No product found"})
           }     
     } catch (error) {
          console.error(error)
          res.status(500).json({error:"Internal server error"});    
     }

 };

module.exports= {addProduct: [uploads.single('image'), addProduct], getProductByFirm, deleteProductById};