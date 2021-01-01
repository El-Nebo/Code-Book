const router = require('express').Router();
const verify=require('./verifiyToken');
router.get('/problemset',verify,(req,res)=>{
    let token = req.user;
    res.render('problemset',{user:req.user, Current_Nav:'problemset'});
})
router.get('/problemId',verify,(req,res)=>{
    let token = req.user;
    res.render('problem',{user:req.user, Current_Nav:'problemset'});
})
router.get('/createproblem',verify,(req,res)=>{
    let token = req.user;
    res.render('createproblem',{user:req.user, Current_Nav:'problemset'});
})
module.exports = router;