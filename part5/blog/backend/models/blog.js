const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

blogSchema.set('toJSON', {
  transform: (doucment, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  },
});

module.exports = new mongoose.model('Blog', blogSchema);
