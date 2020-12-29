const router = require('express').Router();
const connection=require('./server');
const bcrypt=require('bcryptjs');
router.get('/signup',(req,res)=>{
    res.render('signup',{Current_Nav:'__'});
})
router.post('/signup',async(req,res)=>{

    //1- check there are not exist email
    let user={"username":req.body.username,
              "email":req.body.email,
              };
              //console.log(req.body.inlineRadioOptions);
    let emailExist =`select * from users.Users where E_mail ="${req.body.email}" or Handle="${req.body.username}"`;
    connection.query(emailExist,  async(error, results, fields)=> {
        if (error) res.send(error);
        //res.render('/Blogs'); 
        if(!results[0])// not exist
        {
            //TO DO
            // need validations here

            //hash password
            const salt=await bcrypt.genSalt(10);
            const hashedpassword=await bcrypt.hash(req.body.password,salt);
            let query=`insert into users.Users values("${req.body.username}","${req.body.inlineRadioOptions}","${req.body.email}","${hashedpassword}","${req.body.fname}","${req.body.lname}",0,0);`;
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