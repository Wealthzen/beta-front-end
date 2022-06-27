import PropTypes from 'prop-types';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAnswer } from '../../../app/currentAnswersSlice';
import { updateQuestion } from '../../../app/currentQuestionSlice';
import { setInvestment } from '../../../app/investmentSlice';
import { caculateInvestment, checkAnswerExisted, checkListCurrentAnswer, getNextQuestion, uploadResults } from '../../../app/utils';
import FormPickMultipleItem from './FormPickMultipleItem';

FormPickMultiple.propTypes = {
    data: PropTypes.object,
    allAnswer: PropTypes.array,
    style: PropTypes.number,
};

FormPickMultiple.defaultProps = {
    data: {},
    style: 1,
};

function FormPickMultiple(props) {
    const { data, style } = props;
    const dispatch = useDispatch();

    const allQuestions = useSelector((state) => state.questions);
    const userData = useSelector((state) => state.user);
    const allAnswer = useSelector((state) => state.currentAnswers);

    const [selected, setSelected] = useState({});
    const [error, setError] = useState(null)

    useEffect(() => {
        let temp = {};
        data.choices.forEach(choice => temp[choice.value] = false);
            var selectedValue = checkAnswerExisted(data, allAnswer);
            console.log(selectedValue);
            if(selectedValue) {
                setSelected(selectedValue);
            } else {
                setSelected(temp);
            }
    }, [data]);

    const formContent = () => {
        let classContent = '';

        if (style === 1) {
            classContent = 'max-w-690 flex-wrap justify-center';
        } else if (style === 2) {
            classContent = 'csss6';
        } else {
            classContent = 'csss7';
        }
        return classContent;
    };

    const button = () => {
        let classButton = '';

        if (style === 1) {
            classButton = 'mt-2';
        } else {
            classButton = 'mt-8';
        }
        return classButton;
    };

    const handleNextQuestion = e => {
        // Validation
        let isValid = false;
        Object.keys(selected).forEach(option => {
            isValid = isValid || selected[option];
        })
        
        if (!isValid) {
            setError('Please select at least one option');
            return;
        } else {
            const answer = {
                questionId: data.order,
                answer: selected
            }
            const newCurrentAnswer = checkListCurrentAnswer(allAnswer, answer)
            dispatch(setCurrentAnswer(newCurrentAnswer))
            const nextQuestion = getNextQuestion(allQuestions, data.order)

             // const portfolioAttributes =

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

    return (
        <div
            className={`form-style form-multiple form-style-${style} text-center`}
        >
            {data.image_url && <img src={data.image_url} alt='' />}

            {data.question && (
                <h2 className='pb-8 text-center text-4xl font-semibold'>
                    {data.question}
                </h2>
            )}
            
            <div className={`${formContent()} flex`}>
                {data.choices.map((item, index) => (
                    <FormPickMultipleItem
                        key={index}
                        dataItem={item}
                        // selected={selected()}
                        style={style}
                        checked={selected[item.value]}
                        setSelected={setSelected}
                        selected={selected}
                    />
                ))}
            </div>
            
            {error !== true && (
           <span className='mt-2 text-red-500'>{error}</span>
            )}
            <br />
            {data.button && (
                <button
                    className={`button text-sm font-semibold px-6 py-2 bg-pink text-white leading-h2 rounded-input ${button()}`}
                    onClick={handleNextQuestion}
                >
                    {data.button}
                    <i className='iconw-arrow-right text-icon ml-2.5 text-icon align-middle'></i>
                </button>
            )}
        </div>
    );
}

export default FormPickMultiple;
