const express=require('express');
//connect to database
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password: 'password',//change to ur password
  database : 'NyZaKa',
  
});
connection.connect((err)=>{
    if(!err)
        console.log("Connected");
    else
        console.log("connection failed");
});
module.exports=connection;
