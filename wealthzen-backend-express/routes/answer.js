const router = require('express').Router();

const User = require('../models/User');


// route    :: GET /api/questions
// desc     :: Read all questions
// access   :: Private FIXME: Add Authentication Later
router.get(
    '/',
    (req, res) => {
        User.find()
            .then(users => {
                if (users) {
                    return res.json(users);
                }
                return res.status(404).json({ err: 'No users found' });
            })
            .catch(err => res.status(500).json({ err: "Internal Server Error" }));
    }
);


// route    :: GET /api/answers/:email
// desc     :: Read answers identified by email
// access   :: Public
router.get(
    '/:email',
    (req, res) => {
        User.find({ email: req.params.email })
            .then(user => {
                if (user) {
                    return res.json(user);
                }
                return res.status(404).json({ err: 'No user found' });
            })
            .catch(err => res.status(500).json({ err: "Internal Server Error" }));
    }
);


// route    :: POST /api/answers
// desc     :: Create a new answer if user not exists else update the answer
// access   :: Public
router.post(
    '/',
    (req, res) => {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    // User already exists so update the answer
                    user.answers = req.body.answers;
                    user.save()
                        .then(user => res.json(user))
                        .catch(err => res.status(500).json({ err: "Internal Server Error" }));
                } else {
                    // User does not exist so create a new user and add the answers
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        answers: req.body.answers
                    })
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => res.status(500).json({ err: "Internal Server Error", err }));
                }
            })
            .catch(err => res.status(500).json({ err: "Internal Server Error" }));
    }
);


module.exports = router;