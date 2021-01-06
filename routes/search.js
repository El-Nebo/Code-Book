const router = require('express').Router();
const verify=require('./verifiyToken');
const connection=require('./server');
router.post('/search',verify,(req,res)=>{
    
    let searchData=req.body.search;
    let arrUsers=[],arrArt=[],arrDoc=[],arrGroups=[];
    let findUsers=`SELECT * FROM NyZaKa.Users WHERE handle LIKE "%${searchData}%"`;
    connection.query(findUsers,  (error, results, fields)=> {
        if (error) throw error;
        results.forEach(element => {
            let userProfile={
                Handle:element.Handle,
                Acsess:element.Acsess,
                E_mail:element.E_mail,
                Fname:element.Fname,
                Lname:element.Lname,
                Rate_max:element.Rate_max,
                numberOfFriends:0
            }
            arrUsers.push(userProfile);

        });
        
        res.render('searchResult', {user: req.user,listUsers:arrUsers,listArt:arrArt,listDoc:arrDoc,listGroups:arrGroups, Current_Nav: 'groups' });
    });
});
module.exports = router;