
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
 
function checkIsLoggedIN(req,res,next){
  if(req.session.isLoggedIn)
  {
      next();
  }
  else{
      res.redirect("/login");

  }
}
const dummyUser = {
  username: 'Semi',
  password: 'semi'
};
router.get('/', blogController.getAllBlogs);

router.get('/about', (req, res) => {
  res.render('about');
});
 router.get('/admin/addBlog', checkIsLoggedIN, (req, res) => {
  res.render('addBlog');
});
router.get('/blogsByCategory', blogController.getBlogsByCategory);
router.get('/login', (req, res) => {
  res.render('login');
});
 router.post('/login', async (req, res,next) => {
  const { username, password } = req.body;

  if (username == dummyUser.username && password ===dummyUser.password) {
    req.session.isLoggedIn=true;
       
        res.redirect("/admin/dashboard");
          }   else {

          res.send("User not found");
      }
  }  
);
router.post('/addBlog', blogController.addBlog);
router.get('/admin/dashboard', checkIsLoggedIN, blogController.getAllBlogsadmin, (req, res) => {
  res.render('adminDashboard', { blogsadmin: req.blogsadmin });
});
router.post('/deleteBlog/:blogId', blogController.deleteBlog);
router.get('/deleteBlog/admin/dashboard', blogController.getAllBlogsadmin, (req, res) => {
  res.render('adminDashboard', { blogsadmin: req.blogsadmin });})

 

module.exports = router;
