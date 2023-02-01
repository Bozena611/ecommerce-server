const Products = require('../models/ProductModel');
const bodyParser = require ('body-parser');

class ProductsController {

// add new product to DB
	async addProduct(req, res){
		let { name, imgURL, description, price, stock, SKU } = req.body; 
		try{
			const newProduct = await Products.create({
				name:name, imgURL:imgURL, description:description, price:price, stock:stock, SKU:SKU,  
			});
			res.send({newProduct});
		}
		catch(err){
			res.send({err});
		}
	};

// remove product from DB
	async removeProduct(req,res) {
		const { product_id } = req.params;
		try{
			const removedP = await Products.findByIdAndDelete({_id:product_id}); 
			res.send (removedP); 
		}
		catch(err){
			res.send({err});
		}
	};

// update product

	async updateProduct(req, res){ 
		//const _id = req.params.id;
		let { _id, newName, newImgURL, newDescription, newPrice, newStock, newSKU } = req.body;
		try{
			const updatedP = await Products.findByIdAndUpdate({_id}, {$set:{ name: newName, imgURL:newImgURL, description:newDescription, price:newPrice, stock:newStock, SKU:newSKU }});
			res.send (updatedP);
		}	
		catch(err){
			res.send({err});
		}
	};

// show all products

	async showAllProducts(req, res){
		try{
			const products = await Products.find({});
			res.send({products});
		}
		catch(err) {
			res.send({err});
		};
	};

// GET one product by id

	async showProductId(req, res) {
		let {product_id} = req.params;
		try{
			const oneProduct = await Products.findOne({_id:product_id});
			res.send(oneProduct);
		}
		catch(err){
			res.send({err});
		}
	}
}

module.exports = new ProductsController();