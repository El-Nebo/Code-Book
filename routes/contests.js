const router = require('express').Router();
const verify=require('./verifiyToken');
router.get('/contests',verify,(req,res)=>{
    res.render('contests',req.user);
})
router.get('/ContestId',verify,(req,res)=>{
    res.render('contest',req.user);
})
module.exports = router;