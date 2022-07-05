import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAnswer } from '../../../app/currentAnswersSlice';
import { updateQuestion } from '../../../app/currentQuestionSlice';
import { setInvestment } from '../../../app/investmentSlice';
import { setPhase } from '../../../app/phaseSlice';
import { caculateInvestment, checkAnswerExisted, checkAvailableQuestion, checkListCurrentAnswer, getNextQuestion, updateNextPhase } from '../../../app/utils';

import FormMultiInputStarItem from './FormMultiInputStarItem';


const FormMultiInputStar = ({ data }) => {
    const dispatch = useDispatch();

    const currentPhase = useSelector((state) => state.currentPhase);
    const allQuestions = useSelector((state) => state.questions);
    const allAnswer = useSelector((state) => state.currentAnswers);

    const [inputs, setInputs] = useState([]);
    const [error, setError] = useState(null);

    // Create a state to store results
    let state
    data.choices.forEach((choice, index) => {
        state = {
            ...state,
            [choice.value]: 0
        }        
    })
    useEffect(() => {
        // let selectedValue = checkAnswerExisted(data, allAnswer);
        // console.log(selectedValue);
        // if (selectedValue) {
        //     setInputs(selectedValue);
        // } else {
        //     setInputs(state);
        // }
            setInputs(state);
    }, []);
    console.log(inputs);


    // Percentage Evaluation script
    const evaluate = () => {
        // let result = 0;
        // Object.keys(inputs).forEach((key) => {
        //     result = result + Number(inputs[key]);
        // })
        // console.log(result);
        // return result === 100;
        let returnValue = true;
        Object.keys(inputs).forEach((key) => {
            if (inputs[key] == 0) {
                returnValue = returnValue && false;
            }
        })
        return returnValue ? true : false;
    }


    // Handle input change
    const handleFormInputs = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
        console.log(inputs);
    }

    const forceNextQuestion = (questionId, nextQuestion) => {
        const answer = {
            questionId: questionId,
            questionText: data.question,
            answer: inputs,
            answerText: '',
            portfolioAttributes: '',
            investment: null,
        }

        const newCurrentAnswer = checkListCurrentAnswer(allAnswer, answer);
        dispatch(setCurrentAnswer(newCurrentAnswer));

        if (nextQuestion === 'successfully') {
            const successfully = {
                type: 'SUCCESSFULLY',
                phase: 6,
            };

            // post user data to api
            // uploadResults(userData, allAnswer);

            dispatch(updateQuestion(successfully));
        } else {
            const investmentAttrs = caculateInvestment(newCurrentAnswer);
            dispatch(setInvestment(investmentAttrs));

            // force next question
            dispatch(updateQuestion(nextQuestion));
        }
    }


    // Handle submit
    const handleButton  = e => {
        console.log(evaluate());
        if (!evaluate()) {
            setError('Please Answer All Questions');
        } else {
            setError(null);

            const nextQuestion = getNextQuestion(allQuestions, data.order);

            updateNextPhase(dispatch, setPhase, nextQuestion, currentPhase);
        
            forceNextQuestion(data.order, nextQuestion);
        }
    }


    // Styles
    const styleSubmit = data => {
        let classBtn = '';
        if (data.button) {
            classBtn = 'ml-2.5';
        } else {
            classBtn = '';
        }

        return classBtn;
    };


    return (
        <div className='form-input text-center text-primary'>
            {/* Display Question */}
            {data.question && (
                <h2 className='text-4xl font-semibold leading-49 px-3'>
                    {data.question}
                </h2>
            )}

            {/* Iterate through the options */}
            {data.choices && data.choices.map((choice, index) => (
                <FormMultiInputStarItem key={index} choice={choice} handleFormInputs={handleFormInputs} value={inputs[choice.value]} className={`my-2`}/>
            ))}

            {error && (<p  className={`pt-2 padt-2`} style={{color: 'red'}}>Please Choose Atleast One Star</p>)}
            {/* Continue Button */}
            <p className='pt-12'>
                <button
                    onClick={handleButton}
                    className='button text-sm font-semibold px-6 py-2 bg-pink text-white leading-h2 rounded-input'
                >
                    {data.button}
                    <i
                        className={`iconw-arrow-right text-icon ${styleSubmit(data)} align-middle`}
                    ></i>
                </button>
            </p>

        </div>
  )
}

export default FormMultiInputStar