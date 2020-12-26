const e = require('express');
const express = require('express');
const fs = require('fs');
const app = express();


//connect to database
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'users',
  insecureAuth : true
});
 


app.set('view engine','ejs');

// listen for request
app.listen(5000);

// set a static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/articles',(req,res)=>{
    res.render('articles');
})
app.get('/problemset',(req,res)=>{
    res.render('problemset');
})
app.get('/contests',(req,res)=>{
    res.render('contests');
})
app.get('/contact',(req,res)=>{
    res.render('contact');
})
app.get('/login',(req,res)=>{
    res.render('login');
})
app.get('/signup',(req,res)=>{
    res.render('signup');
})
app.post('/signup',(req,res)=>{

    //1- check there are not exist email
    let emailExist =`select * from user where email ="${req.body.email}" or username="${req.body.username}"`;
    connection.query(emailExist,  (error, results, fields)=> {
        if (error) res.send(error);
        //res.render('/Blogs'); 
        if(!results[0])// not exist
        {
            let query=`insert into user values("${req.body.username}","${req.body.email}","${req.body.password}")`;
            connection.query(query,  (error, results, fields)=> {
                if (error) res.send(error);
                //res.render('/Blogs'); 
                res.send("sign up successfully");
            });
        }
        else
            res.send("email exists");

    });    
});

//TO TEST problem.ejs ONLY 
app.get('/problemId',(req,res)=>{
    res.render('problem');
})


// if the request reach to this then there are 404
app.use((req,res)=>{
    res.render("404");
})
