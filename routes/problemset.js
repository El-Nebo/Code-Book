const router = require('express').Router();
const verify=require('./verifiyToken');
router.get('/problemset',verify,(req,res)=>{
    let token = req.user;
    res.render('problemset',{token, Current_Nav:'problemset'});
})
router.get('/problemId',verify,(req,res)=>{
    let token = req.user;
    res.render('problem',{token, Current_Nav:'problemset'});
})
router.get('/createproblem',verify,(req,res)=>{
    let token = req.user;
    res.render('createproblem',{token, Current_Nav:'problemset'});
})
module.exports = router;