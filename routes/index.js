var express = require('express');
var router = express.Router();
var db = require('../db');
var path = require('path');
var multer = require('multer');
// Set The Storage Engine
const storage = multer.diskStorage({
 destination: './public/Img_uploads/',
 filename: function (req, file, cb) {
  cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
 }
});
// initializing upload variable
var upload = multer({
 storage: storage
});
/* Get form */
router.get('/', (req, res, next) => {
 console.log("Index page");
 res.render('index', { title: 'Express' });
});

/* POST form data */
router.post('/submitData', upload.single('fileInput'), (req, res, next) => {
 console.log(req.file);
//filtering  image file( although this can be done by implementing call back in upload variable, and that method is much more effecient, but I am too tired so going to sleep)
 var reg = '/jpeg|jpg|gif|png/';
 if (reg.match(path.extname(req.file.originalname).toLowerCase())){
 var post = {
  id: 'NULL',
  Name: '' + req.body.name + '',
  username: '' + req.body.user + '',
  email: '' + req.body.email + '',
  passwordHash: '' + req.body.password + '',
  imagePath: './public/Img_uploads/' + req.file.fieldname + '-' + Date.now() + path.extname(req.file.originalname) + '',
  aboutMe: '' + req.body.aboutMe + ''
 };
 //Sql query starts
 var que = "INSERT INTO user SET ? ";
 db.query(que, post, (err, result) => {
  if (err)
   throw err;
  else
   console.log(result);
 });
 //Sql query ends
 res.send("Data submitted");
}
else{
   res.send("Error:Enter only Image")
}
})

/*Validating user name */
router.post('/validate', (req, res, next) => {
 console.log(req.body.userName);
 //Query Starts
 var que = "SELECT username FROM user WHERE username = '" + req.body.userName + "'";
 db.query(que, (err, user, result) => {
  if (err)
   throw err;
  else {
   if (user.length > 0) {
    console.log(false);
    res.send(false);
   }
   else {
    console.log(true);
    res.send(true);
   }
  }
 });
 //Query Ends

});


module.exports = router;