const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Image = new Schema({
    image_name: {
        type: String
    },
    image_created: {
        type: String
    }
});

module.exports = mongoose.model('image', Image);