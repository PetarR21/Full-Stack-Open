const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set('toJSON', {
  transform: (doucment, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  },
});

module.exports = new mongoose.model('Blog', blogSchema);
