const express=require('express');
//connect to database
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'gaser011100',
  database : 'users',
  
});
connection.connect((err)=>{
    if(!err)
        console.log("Connected");
    else
        console.log("connection failed");
});
module.exports=connection;
/*
create database users;
create table users.Users (
Handle      varchar(100)   NOT NULL ,
Acsess      varchar(100)   NOT NULL ,
E_mail      varchar(100)   NOT NULL ,
Password_   varchar(80)   NOT NULL ,
Fname       varchar(80)   NOT NULL ,
Lname       varchar(80)   NOT NULL ,
Rate_max    int           NOT NULL ,
Rate_cur    int           NOT NULL ,
PRIMARY KEY  (Handle)       );
*/