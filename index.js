const express = require('express');
var mysql      = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mysqlConnection=require('./routes/server');
const fs = require('fs');
const app = express();

const problemset=require('./routes/problemset');
const signup=require('./routes/signup');
const articles=require('./routes/articles');
const contests=require('./routes/contests');
const login=require('./routes/login');
const contact=require('./routes/contact');
const profile=require("./routes/profile");
const logout= require("./routes/logout");
const verify=require('./routes/verifiyToken');
app.set('view engine','ejs');

app.listen(5000, () => {
  console.log('Server initiated succesfully');
});


// set a static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());

app.get('/',verify,(req,res)=>{
    res.render('index',req.user);
})
app.use(articles);
app.use(contests);
app.use(problemset);
app.use(login);
app.use(signup);
app.use(contact);
app.use(profile);
app.use(logout);




//TO TEST ONLY 
app.get('/teams',(req,res)=>{
    res.render('teams');
});
app.get('/groups',(req,res)=>{
    res.render('groups');
});
app.get('/createteam',(req,res)=>{
    res.render('createteam');
});
app.get('/creategroup',(req,res)=>{
    res.render('creategroup');
});


// if the request reach to this then there are 404
app.use(verify,(req,res)=>{
    res.render("404",req.user);
})
