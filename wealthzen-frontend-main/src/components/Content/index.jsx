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



const Content = () => {
    const dispatch = useDispatch();

    const currentQuestion = useSelector((state) => state.currentQuestion);

    // Fetch all Questions from Backend
    useEffect(() => {
        axiosClient.get('/questions/')
        .then(questions => {
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