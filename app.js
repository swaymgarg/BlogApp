const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'hbs');
app.use(session({
  secret: 'your-secret-key',
}));
app.use('/', require('./routes/routes'));
mongoose.connect('mongodb://127.0.0.1:27017/st2').then(()=> {   

app.listen(8666, () => {
  console.log('Server started on port 8666');
});
});
 