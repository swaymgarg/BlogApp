const mongoose = require('mongoose');
const {Schema}=mongoose;
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  user:{
    type:Schema.Types.ObjectId,
    ref:"User"
}
});

const Blog = mongoose.model('Blog', blogSchema);
 

module.exports = Blog;
