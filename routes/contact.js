const router = require('express').Router();
const verify=require('./verifiyToken');
router.get('/contact',verify,(req,res)=>{
    res.render('contact',req.user);
})

module.exports = router;