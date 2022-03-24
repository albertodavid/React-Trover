const { default: mongoose } = require("mongoose");

const BookSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
    },
    bookname: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: false,
    },
    note:{
        type:Number,
        required: true,
    },
    id:{
        type:String,
        required: true,
    }
});

const BookModel = mongoose.model("books", BookSchema);
module.exports = BookModel;