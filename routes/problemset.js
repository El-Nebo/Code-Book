const router = require('express').Router();
const verify=require('./verifiyToken');
router.get('/problemset',verify,(req,res)=>{
    res.render('problemset',req.user);
})
router.get('/problemId',verify,(req,res)=>{
    res.render('problem',req.user);
})
router.get('/createproblem',verify,(req,res)=>{
    res.render('createproblem',req.user);
})
module.exports = router;