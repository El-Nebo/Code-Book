const router = require('express').Router();
const verify = require('./verifiyToken');
const connection = require('./server');
router.get('/profile', verify, (req, res) => {
    //console.log(req.user);
    if (!req.user)
        res.redirect('/login');
    let ProfileOwner = req.user.user.Handle;
    let profile;
    let ProfileQuery;
    if (req.user.user.Acsess == "developer") {
        ProfileQuery = `SELECT 
                            (
                                SELECT COUNT(*)
                                FROM Nyzaka.friends
                                WHERE Follower = '${ProfileOwner}'
                            ) AS NumFriends,
                            (
                                SELECT COUNT(*)
                                FROM Nyzaka.Articles
                                WHERE Writer = '${ProfileOwner}'
                            ) AS NumArticles,
                            (
                                SELECT COUNT(*)
                                FROM Nyzaka.Documentation
                                WHERE Writer = '${ProfileOwner}'
                            ) AS NumDocumentations,
                            (
                                SELECT COUNT(Distinct Problem_ID)
                                FROM Nyzaka.Submissions
                                WHERE User_ = '${ProfileOwner}' AND Submission_Status = 'Accepted'
                            ) AS NumSolvedProblem,
                            (
                                SELECT COUNT(*)
                                FROM Nyzaka.Problem
                                WHERE Writer = '${ProfileOwner}'
                            ) AS NumMadeProblem,
                            (
                                SELECT SUM(Score)
                                FROM
                                (
                                    SELECT distinct prob.Problem_ID, prob.score
                                    FROM Nyzaka.Submissions AS sub , NyZaka.Problem AS prob
                                    WHERE sub.User_ = '${ProfileOwner}' AND sub.Submission_Status = 'Accepted' AND sub.Problem_ID = prob.Problem_ID
                                ) AS ProblemsSolved
                                
                            ) AS Rating;`;
    } else if (req.user.user.Acsess == "student") {
        ProfileQuery = `SELECT 
                            (
                                SELECT COUNT(*)
                                FROM Nyzaka.friends
                                WHERE Follower = '${ProfileOwner}'
                            ) AS NumFriends,
                            (
                                SELECT COUNT(Distinct Problem_ID)
                                FROM Nyzaka.Submissions
                                WHERE User_ = '${ProfileOwner}' AND Submission_Status = 'Accepted'
                            ) AS NumSolvedProblem,
                            (
                                SELECT SUM(Score)
                                FROM
                                (
                                    SELECT distinct prob.Problem_ID, prob.score
                                    FROM Nyzaka.Submissions AS sub , NyZaka.Problem AS prob
                                    WHERE sub.User_ = '${ProfileOwner}' AND sub.Submission_Status = 'Accepted' AND sub.Problem_ID = prob.Problem_ID
                                ) AS ProblemsSolved
                                
                            ) AS Rating;`;
    }
    connection.query(ProfileQuery, (error, results, fields) => {
        if (error) throw error;

        if (req.user.user.Acsess == "developer") {
            Profile = {
                NumArticles: results[0].NumArticles,
                NumFriends: results[0].NumFriends,
                NumDocumentations: results[0].NumDocumentations,
                NumSolvedProblem: results[0].NumSolvedProblem,
                NumMadeProblem: results[0].NumMadeProblem,
                Rating: results[0].Rating
            };
        } else if (req.user.user.Acsess == "student") {
            Profile = {
                NumFriends: results[0].NumFriends,
                NumSolvedProblem: results[0].NumSolvedProblem,
                Rating: results[0].Rating
            }
        }
        res.render('profile', { user: req.user, Profile, Current_Nav: '__' });
    });

})
router.get('/profile/myfriends', verify, (req, res) => {
    //console.log(req.user);
    if (!req.user)
        res.send("access dened please login");
    req.user.Current_Nav = '__';
    let queryCountFriends = `SELECT Followee FROM NyZaKa.friends WHERE Follower="${req.user.user.Handle}"`;
    connection.query(queryCountFriends, (error, results, fields) => {
        if (error) throw error;

        let arrFriend = [];
        results.forEach(element => {
            arrFriend.push(element.Followee);
        });
        //console.log(arrFriend);
        res.render('myfriends', { user: req.user, listFriends: arrFriend, Current_Nav: '__' });

    });


})
router.get('/profile/:handle', verify, (req, res) => {
    //console.log(req.user);
    let handle = req.params.handle;
    if (req.user && handle == req.user.user.Handle)
        res.redirect('/profile');

    let query = `SELECT * FROM NyZaKa.Users WHERE handle="${handle}"`;
    connection.query(query, (error, results, fields) => {
        if (error) throw error;
        //res.render('/Blogs'); 
        if (!results.length)
            res.render('404', { user: req.user, Current_Nav: '__' });
        else {
            let userProfile = {
                Handle: results[0].Handle,
                Acsess: results[0].Acsess,
                E_mail: results[0].E_mail,
                Fname: results[0].Fname,
                Lname: results[0].Lname,
                Rate_max: results[0].Rate_max,
                IsFriend: false,
                numberOfFriends: 0
            }
            if (req.user) {
                let queryCheckFriend = `SELECT * FROM NyZaKa.friends WHERE Follower="${req.user.user.Handle}" and Followee="${handle}"`;
                connection.query(queryCheckFriend, (error, results, fields) => {
                    if (error) throw error;
                    //res.render('/Blogs'); 
                    if (results.length)
                        userProfile.IsFriend = true;
                    let queryCountFriends = `SELECT COUNT(*) AS namesCount FROM NyZaKa.friends WHERE Follower="${handle}"`;
                    connection.query(queryCountFriends, (error, results, fields) => {
                        if (error) throw error;
                        userProfile.numberOfFriends = results[0].namesCount;
                        res.render('user', { user: req.user, Current_Nav: '__', currUser: userProfile });
                    });

                });
            }
            else {
                let queryCountFriends = `SELECT COUNT(*) AS namesCount FROM NyZaKa.friends WHERE Follower="${handle}"`;
                connection.query(queryCountFriends, (error, results, fields) => {
                    if (error) throw error;
                    userProfile.numberOfFriends = results[0].namesCount;
                    res.render('user', { user: req.user, Current_Nav: '__', currUser: userProfile });
                });

            }

        }
    });
    // res.render('user',{user:req.user, Current_Nav: '__'});
})
router.post('/profile/:handle', verify, (req, res) => {
    let handle = req.params.handle;
    if (!req.user)
        res.json({ redirect: '/profile/' + handle });
    req.user.Current_Nav = '__';

    let query = `INSERT INTO NyZaKa.Friends VALUES("${req.user.user.Handle}","${handle}")`;
    connection.query(query, (error, results, fields) => {
        if (error) throw error;
        console.log(query, results);
        //res.render('/Blogs'); 
        res.json({ redirect: '/profile/' + handle });

    });
    // res.render('user',{user:req.user, Current_Nav: '__'});
})
router.delete('/profile/:handle', verify, (req, res) => {
    let handle = req.params.handle;
    /* if(handle==req.user.user.Handle)
         res.redirect('/profile');*/
    req.user.Current_Nav = '__';
    let query = `delete from NyZaKa.Friends WHERE Follower="${req.user.user.Handle}" and Followee="${handle}"`;
    connection.query(query, (error, results, fields) => {
        if (error) throw error;
        console.log(query, results);
        //res.render('/Blogs'); 
        res.json({ redirect: '/profile/' + handle });

    });
    // res.render('user',{user:req.user, Current_Nav: '__'});
})
module.exports = router;