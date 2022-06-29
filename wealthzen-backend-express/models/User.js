const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    answers: [
        {
            question_id: {
                type: Schema.Types.ObjectId,
                ref: 'questions',
            },
            answer: {}
        }
    ]
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);