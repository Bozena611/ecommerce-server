const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY)
const Cart = require('../models/CartModel');
const jwt = require ('jsonwebtoken');

const payment = async (req, res) => {
  //console.log(sk_test,req.body);
  const { email } = req.body;
  try {
    let { status } = await stripe.charges.create({
      amount: req.body.amount * 100,
      currency: "eur",
      description: "An example charge",
      receipt_email: email,
      source: req.body.token_id
    });
    res.json({ status });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error' })
      .end();
  }
};

module.exports = {
  payment
};
