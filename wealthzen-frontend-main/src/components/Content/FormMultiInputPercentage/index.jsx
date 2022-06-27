import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAnswer } from '../../../app/currentAnswersSlice';
import { updateQuestion } from '../../../app/currentQuestionSlice';
import { setPhase } from '../../../app/phaseSlice';
import { checkAnswerExisted, checkAvailableQuestion, checkListCurrentAnswer, updateNextPhase } from '../../../app/utils';

import FormMultiInputPercentageOption from './FormMultiInputPercentageOption';


const FormMultiInputPercentage = ({ data }) => {
    const dispatch = useDispatch();

    const currentPhase = useSelector((state) => state.currentPhase);
    const allQuestions = useSelector((state) => state.questions);
    const allAnswer = useSelector((state) => state.currentAnswers);

    const [inputs, setInputs] = useState([]);
    const [error, setError] = useState(null);

    // // Get this question from the database
    // const data = {
    //     id: '3',
    //     type: 'MULTI_INPUT_PERCENTAGE',
    //     question: 'What best describes your investment portfolio?',
    //     choices: [
    //         {
    //             text: 'Advised Portfolios',
    //             value: 'A',
    //             order: 1,
    //             placeholder: '% of wealth',
    //             description: 'E.g. Endowus Core Aggressive (80% Equity) Portfolio'
    //         },
    //         {
    //             text: 'Stocks',
    //             value: 'B',
    //             order: 2,
    //             placeholder: '% of wealth',
    //             description: 'E.g. Google stock that you hold with a broker like Saxo'
    //         },
    //         {
    //             text: 'Funds, ETFs',
    //             value: 'C',
    //             order: 3,
    //             placeholder: '% of wealth',
    //             description: 'E.g. Mutual Funds you hold on Fundsupermart'
    //         },
    //         {
    //             text: 'Cash',
    //             value: 'D',
    //             order: 4,
    //             placeholder: '% of wealth',
    //             description: 'E.g. Savings A/C, FDs'
    //         },
    //         {
    //             text: 'Something Else',
    //             value: 'E',
    //             order: 5,
    //             placeholder: '% of wealth',
    //             description: 'E.g. Advised portfolio with a bank'
    //         }
    //     ],
    //     button: 'Continue'
    // }

    // Create a state to store results
    let state
    data.choices.forEach((choice, index) => {
        state = {
            ...state,
            [choice.value]: 0
        }        
    })
    useEffect(() => {
        let selectedValue = checkAnswerExisted(data, allAnswer);
        console.log(selectedValue);
        if (selectedValue) {
            setInputs(selectedValue);
        } else {
            setInputs(state);
        }
    }, []);
    console.log(inputs);


    // Percentage Evaluation script
    const evaluate = () => {
        let result = 0;
        Object.keys(inputs).forEach((key) => {
            result = result + Number(inputs[key]);
        })
        console.log(result);
        return result === 100;
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
        dispatch(updateQuestion(nextQuestion))
    }


    // Handle submit
    const handleButton  = e => {
        if (!evaluate()) {
            setError('please evaluate to 100');
        } else {
            setError(null);

            const nextQuestion = checkAvailableQuestion(allQuestions, data.order);

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
                <FormMultiInputPercentageOption key={index} choice={choice} handleFormInputs={handleFormInputs} value={inputs[choice.value]} className="my-3"/>
            ))}

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

            {error && (<p style={{color: 'red'}}>Please evaluate inputs to 100</p>)}

        </div>
  )
}

export default FormMultiInputPercentage