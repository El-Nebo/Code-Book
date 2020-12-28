const router = require('express').Router();
router.get('/articles',(req,res)=>{
    res.render('articles');
})
router.get('/articles/:articleTitle',(req,res)=>{
    res.render('article');
})
router.get('/createarticle',(req,res)=>{
    res.render("createarticle.ejs");
})
module.exports = router;