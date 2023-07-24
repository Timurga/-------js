const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    url: String
});

module.exports = postSchema;