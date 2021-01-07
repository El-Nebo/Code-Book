const router = require('express').Router();
const verify=require('./verifiyToken');
const connection=require('./server');
router.get('/documentations',verify,(req,res)=>{
    let token = req.user;
    let arrDocumentation=[];
    
    let query =`select * from NyZaKa.Documentation;`;
     connection.query(query,  async (error, results, fields)=> {
        if (error) res.send(error);
        //res.render('/Blogs'); 
        
        results.forEach(element => {
            let documentation={
                ID:element.ID,
                DocName:element.DocName,
                Topic:element.Topic,
                Statment:element.Statment,
                Doc_date:element.Doc_date.toLocaleDateString("en-US").split("-")
            }
            arrDocumentation.push(documentation);
        });
       // console.log(arrArticles);
        res.render('documentations',{user:req.user, Current_Nav:'Documentation',documentations:arrDocumentation});
    });
    
});

router.get('/Documentation/:id',verify,(req,res)=>{
    let token = req.user;


    let query=`SELECT * FROM NyZaKa.Documentation WHERE id=${req.params.id}`;
    console.log(req.params.id);
    connection.query(query,  (error, results, fields)=> {
        if (error) throw error;
        //res.render('/Blogs'); 
        if(!results.length)
            res.render('404',{user:req.user, Current_Nav:'__'});
        else{
            let documentation={
                ID:results[0].ID,
                DocName:results[0].DocName,
                Topic:results[0].Topic,
                Statment:results[0].Statment,
                Doc_date:results[0].Doc_date.toLocaleDateString("en-US").split("-")
            }
        
            res.render('Documentation',{user:req.user, Current_Nav:'Documentation',documentation:documentation});
        }
    });



});
router.get('/createdocumentation',verify,(req,res)=>{
    let token = req.user;
    if(!req.user||token.user.Acsess=="student")
        res.status(403).send("access denied");
    res.render('createdocumentation',{user:req.user, Current_Nav:'Documentation'});
});
router.post('/createdocumentation',verify,(req,res)=>{
    let token = req.user;
    if(token.user.Acsess=="student"||!req.user)
        res.status(403).send("access denied");
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();

    let documentation={
        name: req.body.title,
        Topic:req.body.Topic,
        body:req.body.body,
        date:new Date().toISOString().slice(0, 19).replace('T', ' '),
        writer:token.user.Handle
    };
    let query =`insert into NyZaKa.Documentation(DocName,Topic,Statment,Doc_date,Writer) values("${documentation.name}","${documentation.Topic}","${documentation.body}","${documentation.date}","${documentation.writer}");`;
    connection.query(query,  async(error, results, fields)=> {
        if (error) res.send(error);
        //res.render('/Blogs'); 
        res.send("documentation added successfully");
    });
    //res.render('createarticle',{user:req.user, Current_Nav:'articles'});
});
module.exports = router;