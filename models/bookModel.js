const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title :{
        type: String,
        required: true,// add require to make it mandatory parameter
        unique: true
    },
    author: {
        type : String,
        required: true
    }

});

const BookModel = mongoose.model('Book', bookSchema);
module.exports = BookModel ;