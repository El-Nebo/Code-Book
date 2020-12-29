const router = require('express').Router();
const connection=require('./server');
router.get('/logout',(req,res)=>{
    res.clearCookie("token");
    res.render("index",{Current_Nav:'_'});
});

module.exports = router;