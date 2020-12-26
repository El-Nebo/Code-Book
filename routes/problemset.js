const router = require('express').Router();
router.get('/problemset',(req,res)=>{
    res.render('problemset');
})
router.get('/problemId',(req,res)=>{
    res.render('problem');
})
router.get('/createproblem',(req,res)=>{
    res.render('createproblem');
})
module.exports = router;