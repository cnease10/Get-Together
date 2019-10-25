const mongoose = require('mongoose');

const listScema = new mongoose.Schema({
    title: String,
    items: [],
    dueDate: Date
});

const List = mongoose.model('List', listSchema);

module.exports = List;
