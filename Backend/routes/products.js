const router = require('express').Router();
let Product = require("../models/Product.js");

http://localhost:5080/products/insert

router.route('/insert').post((req, res) => {
    const productCode = req.body.productCode;
    const productName = req.body.productName;
    const description = req.body.description;
    const cost = Number(req.body.cost);
    const category = req.body.category;    

    const newProduct = new Product({
        productCode,
        productName,
        description,
        cost,
        category
    })

    newProduct.save().then(() => {
        res.json("Product Added");
    }).catch(err => {
        console.log(err);
    })
})

http://localhost:5080/products/

router.route('/').get((req, res) =>{
    Product.find().then((products) => {
        res.json(products);
    }).catch(err => {
        console.log(err);
    })
})

http://localhost:5080/products/update/8jhedvcjhewchvdchj

router.route('/update/:id').put(async(req, res) =>{
    let productId = req.params.id;
    const {productCode, productName, description, cost, category} = req.body;

    const updateProduct = {
        productCode,
        productName,
        description,
        cost,
        category
    }

    const update = await Product.findByIdAndUpdate(productId, updateProduct)
    .then(() => {
        res.status(200).send({status: "Product Updated"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
})

http://localhost:5080/products/delete/655dhchjdcjhdbkcbd

router.route('/delete/:id').delete(async(req, res) =>{
    let productId = req.params.id;

    await Product.findByIdAndDelete(productId)
    .then(() => {
        res.status(200).send({status: "Product Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete product", error: err.message});
    })
})  

http://localhost:5080/655dhchjdcjhdbkcbd

router.route('/:id').get(async (req, res) => {
    let productId = req.params.id;
    
    await Product.findById(productId)
        .then((product) => {
            if (!product) {
                return res.status(404).send({ status: "Product not found" });
            }
            res.status(200).send(product);
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with fetching product", error: err.message });
        });
});

module.exports = router;
