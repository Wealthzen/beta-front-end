const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const questionSchema = new Schema({
    type: {
        type: String,
        required: true,
        trim: true
    },
    question: {
        type: String,
        required: true,
        trim: true
    },
    choices: [
        {
            text: {
                type: String,
                required: true,
                trim: true
            },
            value: {
                type: String,
                required: true,
                trim: true
            },
            order: {
                type: Number,
                required: true,
                trim: true,
                min: 0
            },
            placeholder: {
                type: String,
                trim: true
            },
            description: {
                type: String,
                trim: true
            },
            image_url: {
                type: String,
                trim: true
            },
            form_variables: {}
        }
    ],
    button: {
        type: String,
        trim: true
    },
    phase: {
        type: Number,
        required: true,
        trim: true,
        min: 1
    },
    order: {
        type: Number,
        required: true,
        trim: true,
        min: 0,
        unique: true
    },
    description: {
        type: String,
        trim: true
    },
    image_url: {
        type: String,
        trim: true
    },
    input_placeholder: {
        type: String,
        trim: true
    },
    user_prop: {
        type: String,
        trim: true
    }
}, { timestamps: true });


module.exports = mongoose.model('Question', questionSchema);