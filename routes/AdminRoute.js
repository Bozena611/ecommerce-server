const express = require('express');
const router = express.Router();
const controller = require('../controllers/AdminController');

// register admin
router.post('/admin/register', controller.registerAdmin); 

// login admin send token to verify new admin
router.post('/admin/login', controller.loginAdmin); 

// verify token
router.post('/admin/verify_token', controller.verify_token); 


module.exports = router;