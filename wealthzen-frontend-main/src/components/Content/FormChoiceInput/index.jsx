import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAnswer } from '../../../app/currentAnswersSlice';
import { updateQuestion } from '../../../app/currentQuestionSlice';
import { setInvestment } from '../../../app/investmentSlice';
import { caculateInvestment, checkAnswerExisted, checkListCurrentAnswer, getNextQuestion, uploadResults } from '../../../app/utils';
import FormChoiceInputItem from './FormChoiceInputItem';


const FormChoiceInput = ({ data }) => {
    const dispatch = useDispatch();

    const [input, setInput] = useState({});
    const [selected, setSelected] = useState(null);
    const [error, setError] = useState(null)

    const allAnswer = useSelector((state) => state.currentAnswers);
    const allQuestions = useSelector((state) => state.questions);
    const userData = useSelector((state) => state.user);


    useEffect(() => {
        let temp = {};
        data.choices.forEach(choice => {
            choice?.form_variables?.input ? temp[choice.value] = '' : temp[choice.value] = choice.description;
        });
        const selectedValue = checkAnswerExisted(data, allAnswer);
        setInput(temp);

        if (selectedValue) {
            // setInput({...input, ...selectedValue});
            setSelected(Object.keys(selectedValue)[0]);
        }

    }, []);

    const handleClick = (value) => {
        setSelected(value);
    }
    console.log('Selected:', selected)
    console.log('input:',input);


    const handleContinue = e => {
        if (!selected) {
            setError('Please select an option');
            return false;
        } else {
            setError(null);
            if (!input[selected]) {
                setError('Please input your answer');
                return false;
            } else {
                setError(null);
                const answer = {
                    questionId: data.order,
                    answer: {
                        [selected]: input[selected]
                    }
                }
                const newCurrentAnswer = checkListCurrentAnswer(allAnswer, answer);
                dispatch(setCurrentAnswer(newCurrentAnswer))
                const nextQuestion = getNextQuestion(allQuestions, data.order);

                if (nextQuestion === 'successfully') {
                    const successfully = {
                        type: 'SUCCESSFULLY',
                        phase: 6,
                    };
        
                    // post user data to api
                    uploadResults(userData, allAnswer);
        
                    dispatch(updateQuestion(successfully));
                } else {
                    const investmentAttrs = caculateInvestment(newCurrentAnswer);
                    dispatch(setInvestment(investmentAttrs));
        
                    // force next question
                    dispatch(updateQuestion(nextQuestion));
                }
            }
        }
    }


    return (
       <div className='form-style form-style-1 text-center'>
            {data.image_url && <img src={data.image_url} alt='' />}
            {data.question && (
                <h2 className='pb-8 text-center text-4xl font-semibold'>
                    {data.question}
                </h2>
            )}
            <div className='form-content flex justify-center flex-wrap'>
                {data.choices.map((item, index) => (
                    <FormChoiceInputItem 
                        key={index}
                        dataItem={item}
                        questionId={data.order}
                        input={input}
                        setInput={setInput}
                        value={input[item.value]}
                        handleClick={handleClick}
                    />
                ))}
            </div>

            {error !== true && (
                    <span className='mt-2 text-red-500'>{error}</span>
                )}

            <p className='pt-12'>
                <button
                    // onClick={handleNextQuestion}
                    className='button text-sm font-semibold px-6 py-2 bg-pink text-white leading-h2 rounded-input mt-2'
                    onClick={handleContinue}
                >
                    {data.button}
                    <i
                        className={`iconw-arrow-right text-icon ml-2.5 align-middle`}
                    ></i>
                </button>
            </p>
        </div>
    )
}


export default FormChoiceInput;