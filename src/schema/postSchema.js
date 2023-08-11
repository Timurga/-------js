const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    url: String
});

module.exports = PostSchema;