const dotenv = require("dotenv").config();
const express = require ('express');
const app = express();
const port = process.env.port || 4000;
const connectDB = require ('./config/db');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const cors = require('cors');

// =================== initial settings ===================
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Connect to Database
connectDB();


//============== CORS =========
app.use(cors());


// allowing requests from the front-end to our server with api calls
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

	next();
});


// =============== ROUTES ==============================

const adminRoutes = require('./routes/AdminRoute');
const productRoutes = require('./routes/ProductRoute');
const cartRoutes = require('./routes/CartRoute');
const paymentRoute = require('./routes/PaymentRoute');
const emailRoute = require('./routes/EmailRoute');

// =============== USE ROUTES ============================

app.use('/', adminRoutes);
app.use('/', productRoutes);
app.use('/', cartRoutes);
app.use('/', paymentRoute);
app.use('/', emailRoute);


// =============== START SERVER =====================

app.listen (port, ()=>{
	console.log(`server is running on port ${port}`)
});