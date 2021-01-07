const router = require('express').Router();
const verify = require('./verifiyToken');
const connection = require('./server');
router.post('/search', verify, (req, res) => {

    let searchData = req.body.search;
    let arrUsers = [], arrArt = [], arrDoc = [], arrGroups = [], arrproblems = [];
    let findUsers = `SELECT * FROM NyZaKa.Users WHERE handle LIKE "%${searchData}%"`;
    let findarticles = `SELECT * FROM NyZaKa.Articles WHERE ArtName LIKE "%${searchData}%"`;
    let finddocumentation = `SELECT * FROM NyZaKa.Documentation WHERE DocName LIKE "%${searchData}%"`;
    let findgroup = `SELECT * FROM NyZaKa.Groups_ WHERE Name_ LIKE "%${searchData}%"`;
    let findarticlesbywriter = `SELECT * FROM NyZaKa.Articles join nyzaka.users on NyZaKa.users.Handle = NyZaKa.Articles.writer where NyZaKa.Articles.writer LIKE "%${searchData}%"`;
    let finddocumentationbywriter = `SELECT * FROM NyZaKa.Documentation join nyzaka.users on NyZaKa.users.Handle = NyZaKa.Documentation.writer where NyZaKa.Documentation.writer LIKE "%${searchData}%"`;
    let findgroupbywriter = `SELECT * FROM NyZaKa.Groups_ join nyzaka.users on NyZaKa.users.Handle = NyZaKa.Groups_.Owner_ where NyZaKa.Groups_.Owner_ LIKE "%${searchData}%"`;
    let findproblem = `SELECT * FROM NyZaKa.problem WHERE NameProblem LIKE "%${searchData}%"`;
    let findproblembywriter = `SELECT * FROM NyZaKa.problem join nyzaka.users on NyZaKa.users.Handle = NyZaKa.problem.writer where NyZaKa.problem.writer LIKE "%${searchData}%"`;
    


    connection.query(findUsers, (error, results, fields) => {
        if (error) throw error;
        results.forEach(element => {
            let userProfile = {
                Handle: element.Handle,
                Acsess: element.Acsess,
                E_mail: element.E_mail,
                Fname: element.Fname,
                Lname: element.Lname,
                Rate_max: element.Rate_max,
                numberOfFriends: 0
            }
            arrUsers.push(userProfile);

        });

        //  res.render('searchResult', {user: req.user,listUsers:arrUsers,listArt:arrArt,listDoc:arrDoc,listGroups:arrGroups, Current_Nav: 'groups' });
    });



    connection.query(findarticles, (error, results, fields) => {
        if (error) throw error;
        results.forEach(element => {
            let article = {
                ID: element.ID,
                ArtName: element.ArtName,
                Topic: element.Topic,
                Statment: element.Statment,
                Art_date: element.Art_date.toLocaleDateString("en-US").split("-")
            }
            arrArt.push(article);

        });

        // res.render('searchResult', {user: req.user,listUsers:arrUsers,listArt:arrArt,listDoc:arrDoc,listGroups:arrGroups, Current_Nav: 'groups' });
    });

    connection.query(findarticlesbywriter, (error, results, fields) => {
        if (error) throw error;
        results.forEach(element => {
            let article = {
                ID: element.ID,
                ArtName: element.ArtName,
                Topic: element.Topic,
                Statment: element.Statment,
                Art_date: element.Art_date.toLocaleDateString("en-US").split("-")
            }
            arrArt.push(article);

        });

        // res.render('searchResult', {user: req.user,listUsers:arrUsers,listArt:arrArt,listDoc:arrDoc,listGroups:arrGroups, Current_Nav: 'groups' });
    });




    connection.query(finddocumentation, (error, results, fields) => {
        if (error) throw error;
        results.forEach(element => {
            let documentation = {
                ID: element.ID,
                DocName: element.DocName,
                Topic: element.Topic,
                Statment: element.Statment,
                Doc_date: element.Doc_date.toLocaleDateString("en-US").split("-")
            }
            arrDoc.push(documentation);

        });

        // res.render('searchResult', {user: req.user,listUsers:arrUsers,listArt:arrArt,listDoc:arrDoc,listGroups:arrGroups, Current_Nav: 'groups' });
    });

    connection.query(finddocumentationbywriter, (error, results, fields) => {
        if (error) throw error;
        results.forEach(element => {
            let documentation = {
                ID: element.ID,
                DocName: element.DocName,
                Topic: element.Topic,
                Statment: element.Statment,
                Doc_date: element.Doc_date.toLocaleDateString("en-US").split("-")
            }
            arrDoc.push(documentation);

        });

        // res.render('searchResult', {user: req.user,listUsers:arrUsers,listArt:arrArt,listDoc:arrDoc,listGroups:arrGroups, Current_Nav: 'groups' });
    });


    connection.query(findgroupbywriter, (error, results, fields) => {
        if (error) throw error;
        results.forEach(element => {
            let group = {
                Name: element.Name_,
                Owner: element.Owner_,
                Admins: []
            };
            arrGroups.push(group);

        });

        //res.render('searchResult', {user: req.user,listUsers:arrUsers,listArt:arrArt,listDoc:arrDoc,listGroups:arrGroups, Current_Nav: 'groups' });
    });

    connection.query(findgroup, (error, results, fields) => {
        if (error) throw error;
        results.forEach(element => {
            let group = {
                Name: element.Name_,
                Owner: element.Owner_,
                Admins: []
            };
            arrGroups.push(group);

        });

        // res.render('searchResult', {user: req.user,listUsers:arrUsers,listArt:arrArt,listDoc:arrDoc,listGroups:arrGroups, Current_Nav: 'groups' });
    });


    connection.query(findproblem, (error, results, fields) => {
        if (error) throw error;
        results.forEach(element => {
            let Problem = {
                ID: element.Problem_ID,
                Name: element.NameProblem,
                statement: element.statment,
            }
            arrproblems.push(Problem);

        });

        // res.render('searchResult', {user: req.user,listUsers:arrUsers,listArt:arrArt,listDoc:arrDoc,listGroups:arrGroups,listproblems:arrproblems, Current_Nav: 'groups' });
    });


    connection.query(findproblembywriter, (error, results, fields) => {
        if (error) throw error;
        results.forEach((element, index) => {
            let Problem = {
                ID: element.Problem_ID,
                Name: element.NameProblem,
                statement: element.statment,
            }
            arrproblems.push(Problem);
            

        });
        res.render('searchResult', { user: req.user, listUsers: arrUsers, listArt: arrArt, listDoc: arrDoc, listGroups: arrGroups, listproblems: arrproblems, Current_Nav: 'groups' });

    });


});
module.exports = router;