import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// utils
import axiosClient from '../../api/axiosClient';

// Redux
import { updateQuestion } from '../../app/currentQuestionSlice';
import { setQuestion } from '../../app/questionsSlice';

// Components
import FormInput from './FormInput';
import FormPickOne from './FormPickOne';
import FormTextOnly from './FormTextOnly';
import FormMultiInputPercentage from './FormMultiInputPercentage';
import FormPickMultiple from './FormPickMultiple';
import FormChoiceInput from './FormChoiceInput';
import UploadData from './UploadData';
import FormMultiInputStar from './FormMultiinputStar';



const Content = () => {
    const dispatch = useDispatch();

    const currentQuestion = useSelector((state) => state.currentQuestion);

    // Fetch all Questions from Backend
    useEffect(() => {
        axiosClient.get('/questions/')
        .then(questions => {
            console.log(questions);


            var newques = {
                "type": "MULTI_INPUT_STAR",
                "question": "Do you feel the following pain points in managing your wealth?",
                "choices": [
                    {
                        "text": "",
                        "value": "A",
                        "order": 1,
                        "placeholder": "",
                        "description": "Robo advisor does not give me choice to incorporate the specific stocks, funds, ETFs I like",
                        "_id": "62b6de129a88d97e986bdf03"
                    },
                    {
                        "text": "",
                        "value": "B",
                        "order": 2,
                        "placeholder": "",
                        "description": "When the markets are doing well, I am not sure how to distribute my investment $ between the Robo advisor and to buy more stocks, funds, ETFs on my own",
                        "_id": "62b6de129a88d97e986bdf04"
                    },
                    {
                        "text": "",
                        "value": "C",
                        "order": 3,
                        "placeholder": "",
                        "description": "I don’t know what to do when the markets go down",
                        "_id": "62b6de129a88d97e986bdf05"
                    },
                    {
                        "text": "",
                        "value": "D",
                        "order": 4,
                        "placeholder": "",
                        "description": "I don’t understand how the Robo advisor comes up with the recommended portfolio",
                        "_id": "62b6de129a88d97e986bdf06"
                    },
                    {
                        "text": "",
                        "value": "E",
                        "order": 5,
                        "placeholder": "",
                        "description": "Even after many years of investing: i do not have sufficient knowledge of how to manage my money",
                        "_id": "62b6de129a88d97e986bdf07"
                    }
                ],
                "button": "Continue",
                "phase": 1,
                "order": 4
            }

            questions.splice(5,0,newques);

            dispatch(setQuestion(questions))
            dispatch(updateQuestion(questions[0]))
        })
    }, [dispatch]);

    const component = () => {
        switch (currentQuestion.type) {
            case 'READ_ONLY':
                return <FormTextOnly data={currentQuestion} />;
            case 'TEXT_INPUT':
                return <FormInput data={currentQuestion} />;
            case 'MULTIPLE_CHOICE':
                return <FormPickOne data={currentQuestion} />;
            case 'MORE_THAN_ONE_CHOICE':
                return <FormPickMultiple data={currentQuestion} />;
            case 'MULTI_INPUT_PERCENTAGE':
                return <FormMultiInputPercentage data={currentQuestion} />;
            case 'MULTI_INPUT_STAR':
                return <FormMultiInputStar data={currentQuestion} />;
            case 'CHOICE_INPUT':
                return <FormChoiceInput data={currentQuestion} />;
            case 'SUCCESSFULLY':
                return <UploadData />;
            default:
                return 'PLEASE SELECT VALID QUESTION TYPE'
        }
    }

    return (
        <div className="text-primary py-8 h-auto">
            <div className='main-content h-full flex items-center justify-center max-w-1152 px-3 mx-auto'>
                    {component()}
                </div>
        </div>

    )
}

export default Content