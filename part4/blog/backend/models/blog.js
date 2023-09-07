const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
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
