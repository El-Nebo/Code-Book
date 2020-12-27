const e = require('express');
const express = require('express');
const fs = require('fs');
const app = express();

const problemset=require('./routes/problemset');
const signup=require('./routes/signup');
const articles=require('./routes/articles');
const contests=require('./routes/contests');
const login=require('./routes/login');
const contact=require('./routes/contact');

//connect to database
// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'password',
//   database : 'users',
//   insecureAuth : true
// });
 


app.set('view engine','ejs');

// listen for request
app.listen(5000,()=>{
    console.log("Server started on port 5000");
});

// set a static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.render('index');
})
app.use(articles);
app.use(contests);
app.use(problemset);
app.use(login);
app.use(signup);
app.use(contact);





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
app.use((req,res)=>{
    res.render("404");
})
