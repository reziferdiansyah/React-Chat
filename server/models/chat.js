const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    id: Number,
    message: String,
    sender: String,
    created_date: Number,
});

module.exports = mongoose.model('Message', messageSchema)