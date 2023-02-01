const Cart = require('../models/CartModel');
const bodyParser = require ('body-parser');
const jwt = require ('jsonwebtoken');


class CartController {
	async addProductToCart(req, res){
		const { user_id, quantity, product_id } = req.body;
				try {
   				const productExists = await Cart.findOne(
					{ user:user_id,
      			"products.product": product_id});
   			if (productExists) {
   			await Cart.findOneAndUpdate(
	        { user: user_id, "products.product": product_id },
	        { $inc: { "products.$.quantity": quantity } }
      	);
      	res.send({Cart});
	   		} else {
				const newProduct = { quantity: quantity, product: product_id };
	      await Cart.findOneAndUpdate(
	        { user: user_id },
	        { $addToSet: { products: newProduct } }
	      );
	      res.send({newProduct});
			}	
		} catch(err){
			res.send({err});
		}
	};


// GET showCartItems by userid

	async showCartItems(req, res) {
		let {user_id} = req.params;
		try {
			const cartItems = await Cart.findOne({user:user_id}).populate({
				path: "products.product",
				model: "products"
			});
			res.send(cartItems);
		}
		catch(err){
			res.send({err});
		}
	}

// remove product from Cart
// router.delete('/cart/remove')

	async removeProductFromCart(req,res) {
		let { user_id, product_id } = req.body;
		try {
			const cart = await Cart.findOneAndUpdate(
      { user: user_id },
      { $pull: { products: { product: product_id } } },
      { new: true }
    ).populate({
      path: "products.product",
      model: "products"
    });
    res.status(200).json(cart.products); 
		}
		catch(err){
			res.send({err});
		}
	};

	
// CLEAR CART

	async clearCart(req,res) {
		let {user_id} = req.body; 
		try{
			const cart = await Cart.findOneAndUpdate(
      { user:user_id },
      { $set: { products: [] }}
      )
   // res.status(200).json(cart.products); returns the list of products
   		res.status(200).send('Cart empty')
  	} catch (error) {
    	console.error(error);
    res.status(403).send("Please login again");
  	}
	}
}

module.exports = new CartController();