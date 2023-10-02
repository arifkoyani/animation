const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");
const multer = require('multer');
const router = require("express").Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
});
const upload = multer({ storage: storage });

  router.post('/', upload.single('image'), async (req, res) => {
    
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    const { title, price, description, category } = req.body;
    const image = 'uploads/' + req.file.filename;
  
    const product = new Product({
        title,
        price,
        description,
        image,
        category
      });

      await product.save();

    // Respond with a success message or error as needed
    res.status(200).send('Product saved successfully.');
  });

  
router.put("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
       
       const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
        $set: req.body
       },
       {new:true}
       );
    
       res.status(200).json(updatedProduct);
    }catch(err){
      
        res.status(500).json(err);
    }
    
});

//Delete 

router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been delted..")
    }catch(err){
       res.status(500).json(err)  
    }
});

//GET Product

router.get("/:id", async (req, res)=>{
    try{
        const product =  await Product.findById(req.params.id)
         res.status(200).json(product);
    }catch(err){
       res.status(500).json(err)  
    }
});

//GET All 

router.get("/", async (req, res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try{
       let products;

       if(qNew){
        products = await Product.find().sort({createdAt: -1}).limit(1)

       }else if(qCategory){
        products = await Product.find({categories:{
            $in: [qCategory],
        },
    });
       }else{
        products = await Product.find();
       }
        res.status(200).json(products);
    }catch(err){
       res.status(500).json(err)  
    }
});



 module.exports = router;