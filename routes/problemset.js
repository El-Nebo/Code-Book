const router = require('express').Router();
const connection = require('./server');
const verify=require('./verifiyToken');
router.get('/problemset',verify,(req,res)=>{
    let token = req.user;
    let Problemset = [];

    let query =  `select * from NyZaKa.Problem`;
    connection.query(query, async(error,results,fields) => {


        if (error) res.send(error);

        results.forEach(element => {
            let Problem = {
                ID : element.Problem_ID,
                Name : element.NameProblem,
                statement: element.statment,
            }
            Problemset.push(Problem);
        });
        // console.log(arrArticles);
        res.render('problemset', { user: req.user, Current_Nav: 'problemset', Problemset });


    });
});

router.get('/problems/:id',verify,(req,res)=>{
    let token = req.user;

    let query = `SELECT * FROM NyZaKa.Problem WHERE problem_id=${req.params.id}`;
    connection.query(query, (error, results, fields) => {
        if (error) throw error;
        
        
        let Problem = {
            ID: results[0].Problem_ID,
            Name: results[0].NameProblem,
            Topic: results[0].Topic,
            Writer: results[0].Writer,
            Input: results[0].input,
            statement: results[0].statment,
            Input_Format: results[0].Input_Format,
            Output_Format: results[0].Output_Format,
            Sample_Input: results[0].Sample_Input,
            Sample_Output: results[0].Sample_Output,
            Score: results[0].Score,
            Difficulty: results[0].Difficulty
        };
        res.render('problem', { user: req.user, Current_Nav: 'problemset', Problem });
    });




});

router.get('/createproblem',verify,(req,res)=>{
    let token = req.user;
    if (!req.user||token.user.Acsess == "student")
        res.status(403).send("access denied");
    res.render('createproblem',{user:req.user, Current_Nav:'problemset'});
});

router.post('/createproblem' , verify, (req,res) => {
    let token = req.user;
    if (token.user.Acsess == "student" || !req.user)
        res.status(403).send("access denied");

    let Problem = {
        Name: req.body.title,
        statement: req.body.body,
        InputFormat: req.body.problemInputFormat,
        OutputFormat: req.body.problemOutputFormat,
        Input: req.body.problemInput,
        Output: req.body.problemOutput,
        Topic: req.body.Topic,
        Writer: token.user.Handle,
        Score: req.body.Score,
        Difficulty: req.body.Difficulty,
        Sample_Input: req.body.SampleInput,
        Sample_Output: req.body.SampleOutput
    };

    let query = `INSERT INTO NyZaKa.Problem
    (Topic, NameProblem, writer, input, output, statment, Input_Format, Output_Format, score, difficulty,Sample_Input,Sample_Output)
    values('${Problem.Topic}','${Problem.Name}','${Problem.Writer}','${Problem.Input}','${Problem.Output}','${Problem.statement}','${Problem.InputFormat}','${Problem.OutputFormat}','${Problem.Score}','${Problem.Difficulty}','${Problem.Sample_Input}','${Problem.Sample_Output}');`;
    connection.query(query, async (error, results, fields) => {
        if (error) res.send(error);
        //res.render('/Blogs'); 
        res.send("Problem added successfully");
    });

});




module.exports = router;