const router = require('express').Router();
router.get('/articles',(req,res)=>{
    res.render('articles');
})
router.get('/ArticleId',(req,res)=>{
    res.render('article');
})
module.exports = router;