const router = require('express').Router();
router.get('/contests',(req,res)=>{
    res.render('contests');
})
router.get('/ContestId',(req,res)=>{
    res.render('contest');
})
module.exports = router;