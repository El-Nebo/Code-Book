const router = require('express').Router();
router.get('/signup',(req,res)=>{
    res.render('signup');
})
router.post('/signup',(req,res)=>{

    //1- check there are not exist email
    let emailExist =`select * from user where email ="${req.body.email}" or username="${req.body.username}"`;
    connection.query(emailExist,  (error, results, fields)=> {
        if (error) res.send(error);
        //res.render('/Blogs'); 
        if(!results[0])// not exist
        {
            let query=`insert into user values("${req.body.username}","${req.body.email}","${req.body.password}")`;
            connection.query(query,  (error, results, fields)=> {
                if (error) res.send(error);
                //res.render('/Blogs'); 
                res.send("sign up successfully");
            });
        }
        else
            res.send("email exists");

    });    
});
module.exports = router;