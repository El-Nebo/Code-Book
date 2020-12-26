const router = require('express').Router();
router.get('/contact',(req,res)=>{
    res.render('contact');
})

module.exports = router;