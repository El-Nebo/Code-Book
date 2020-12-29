const router = require('express').Router();
const verify=require('./verifiyToken');
router.get('/contact',verify,(req,res)=>{
    let token = req.user;
    res.render('contact',{token, Current_Nav:'contact'});
})

module.exports = router;