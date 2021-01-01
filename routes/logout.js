const router = require('express').Router();
const connection=require('./server');
router.get('/logout',(req,res)=>{
    res.clearCookie("token");
    res.render("index",{user:req.user, Current_Nav: '__'});
});

module.exports = router;