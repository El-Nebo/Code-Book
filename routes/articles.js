const router = require('express').Router();
const verify=require('./verifiyToken');
router.get('/articles',verify,(req,res)=>{
    res.render('articles',req.user);
})
router.get('/articles/:articleTitle',verify,(req,res)=>{
    res.render('article',req.user);
})
router.get('/createarticle',verify,(req,res)=>{
    res.render("createarticle.ejs",req.user);
})
module.exports = router;