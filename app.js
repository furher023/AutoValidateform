const express = require('express');
var mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port =3100;

var indexRoute = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: true }));
var urlEncoder = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/',indexRoute);

var db = require('./db');
db.connect((err)=>{
  if(err)
    throw err;
  else
  console.log("Database connected");
})


app.listen(port, (err) => {
 if (err)
  throw err;
 console.log("Connected to port");
});


