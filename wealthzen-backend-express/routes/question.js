const router = require('express').Router();


// Import Models
const Question = require('../models/Question');


// route    :: GET /api/questions
// desc     :: Read all questions
// access   :: Public
router.get(
    '/',
    (req, res) => {
        Question.find()
            .sort({ order: 1 })
            .then(questions => {
                if (questions.length) {
                    return res.json(questions)
                } else {
                    return res.status(404).json({ err: 'No questions found' })
                }
            })
            .catch(err => res.status(500).json({ err: "Internal Server Error" }));
    }
);


// route    :: POST /api/questions
// desc     :: Create a new question
// access   :: Private TODO: Add Authentication Later
router.post(
    '/',
    (req, res) => {
        // TODO: Add Validations
        new Question(req.body).save()
            .then(question => res.json(question))
            .catch(err => res.status(500).json({ err: "Internal Server Error", err }));
    }
);

module.exports = router;