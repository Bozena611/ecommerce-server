const express = require('express');
const router = express.Router();
const controller = require('../controllers/ProductController');

// add product  /admin/products/add
router.post('/products/add', controller.addProduct);

// remove product  /admin/products/delete
router.delete('/products/delete/:product_id', controller.removeProduct); 

// update product   /admin/products/update
router.post('/products/update/', controller.updateProduct); 

// show all productss
router.get('/products', controller.showAllProducts); 

// show one product by ID
router.get('/products/product_id/:product_id', controller.showProductId); 

module.exports = router;