const Blog = require('../models/Blog'); 
const addBlog = async (req, res) => {
const { title, description, caption, category } = req.body;
try {
const newBlog = new Blog({ title, description, category });
await newBlog.save();
res.redirect(`/?category=${category}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
const getAllBlogs = async (req, res) => {
  const category = req.query.category || 'all';
try {let blogs;
if (category === 'all') {
      // Fetch all blogs
      blogs = await Blog.find();
    } else {
      // Fetch blogs by category
      blogs = await Blog.find({ category });
    }

    res.render('home', {blogs });
  } catch (error) {
    console.error(error);
    res.send(' Error');
  }
};
  
const getAllBlogsadmin = async (req, res) => {
  try {
    let blogsadmin;

    // Fetch all blogs
    blogsadmin = await Blog.find();

    console.log('Blogs for Admin Dashboard:', blogsadmin);

    res.render('adminDashboard', { blogsadmin });
  } catch (error) {
     
    res.send('Error');
  }
};

// Middleware to get blogs by category
const getBlogsByCategory = async (req, res) => {
  const category = req.query.category;
  
  try {
    let blogs;

    if (category === 'all') {
      // Fetch all blogs
      blogs = await Blog.find();
    } else {
      // Fetch blogs by category
      blogs = await Blog.find({ category });
    }

    res.render('home', { blogs });
  } catch (error) {
    console.error(error);
    res.send('Error');
  }
};
const deleteBlog = async (req, res) => {
  const blogId = req.params.blogId;

  try {
     
    const blog = await Blog.findById(blogId);
 await Blog.findByIdAndDelete(blogId);
      res.redirect('admin/dashboard');
     
  } catch (error) {
    console.error(error);
    res.send("Error");
  }
};


module.exports = {
  getAllBlogs,
  getBlogsByCategory,
  addBlog,
  deleteBlog,
  getAllBlogsadmin
   
};