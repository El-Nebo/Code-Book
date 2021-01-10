const router = require('express').Router();
const verify = require('./verifiyToken');
const connection = require('./server');

router.post('/problems/:id', verify, (req, res) => {
    if(!req.user)
        res.status(403).send("Access Denied");
    else{
        let submissionstatus = "Rejected";
        let outputquery = `select output from nyzaka.problem where problem_ID = ${req.params.id};`;
        connection.query(outputquery, (error, problemoutput) => {
            if (error) res.send(error);

            if (req.body.output == problemoutput[0].output)
                submissionstatus = "Accepted";
            let submissionquery = `insert into nyzaka.submissions(problem_id,user_,time_ , output, submission_status) values 
                (${req.params.id},'${req.user.user.Handle}',now(),'${req.body.output}','${submissionstatus}');`;
            connection.query(submissionquery, (error2, results) =>{
                if(error2)  res.send(error2);
                res.send(submissionstatus);
            });
        });
    }
});

router.get('/problems/:id/submissions' , verify, (req,res) =>{
    let query = `select nyzaka.submissions.*, nyzaka.problem.NameProblem from nyzaka.submissions join nyzaka.problem on  nyzaka.submissions.Problem_ID = nyzaka.problem.Problem_ID 
    where nyzaka.submissions.problem_ID = ${req.params.id}  order by Time_ desc ;`;
    connection.query(query, (error, results) => {
        if(error)   res.send(error)
        let submissions = [];
        for(let i = 0 ; i < results.length ; i++)
        {
            let submission = {
                ID: results[i].ID,
                Problem_ID: results[i].Problem_ID,
                Problem_Name: results[i].NameProblem,
                User: results[i].User_,
                Day: results[i].Time_.toISOString().split('T')[0],
                Time: results[i].Time_.toTimeString().split(' ')[0],
                output: results[i].Output,
                status: results[i].Submission_Status
            };
            submissions.push(submission);
        }
        res.render('problemsubmissions', { user: req.user, Current_Nav: 'problemset', submissions });
    })
});

module.exports = router;