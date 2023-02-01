const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({

	email: {type: String, required: true, unique: true, lowercase: true},
	password: {type: String, required: true}

});

module.exports = mongoose.model('admins', AdminSchema);