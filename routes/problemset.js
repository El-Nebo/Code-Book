const router = require('express').Router();
router.get('/problemset',(req,res)=>{
    res.render('problemset');
})
router.get('/problemId',(req,res)=>{
    res.render('problem');
})
module.exports = router;