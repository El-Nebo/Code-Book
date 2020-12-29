const router = require('express').Router();
const verify=require('./verifiyToken');
router.get('/articles',verify,(req,res)=>{
    let token = req.user;
    res.render('articles',{token, Current_Nav:'articles'});
});
router.get('/articles/:articleTitle',verify,(req,res)=>{
    let token = req.user;
    res.render('articles',{token, Current_Nav:'articles'});
});
router.get('/createarticle',verify,(req,res)=>{
    let token = req.user;
    res.render('articles',{token, Current_Nav:'articles'});
});
module.exports = router;