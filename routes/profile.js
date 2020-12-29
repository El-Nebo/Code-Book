const router = require('express').Router();
const verify=require('./verifiyToken');
router.get('/profile',verify,(req,res)=>{
    console.log(req.user);
    if(!req.user)
        res.send("access dened please login");
    res.render('profile',{token, Current_Nav: '__'});
})
module.exports = router;