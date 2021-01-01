const router = require('express').Router();
const verify=require('./verifiyToken');
router.get('/contests',verify,(req,res)=>{
    let token = req.user;
    res.render('contests',{user:req.user,Current_Nav:'contests'});
})
router.get('/ContestId',verify,(req,res)=>{
    let token = req.user;
    res.render('contest',{user:req.user,Current_Nav:'contests'});
})
module.exports = router;