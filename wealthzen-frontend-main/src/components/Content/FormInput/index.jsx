import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAnswer } from '../../../app/currentAnswersSlice';
import { updateQuestion } from '../../../app/currentQuestionSlice';
import { setUser } from '../../../app/userSlice';
import { setPhase } from '../../../app/phaseSlice';
import {
    checkAnswerExisted,
    checkAvailableQuestion,
    checkInputValidate,
    checkListCurrentAnswer,
    getNextQuestion,
    updateNextPhase,
    uploadResults,
} from '../../../app/utils';

FormInput.propTypes = {
    data: PropTypes.object,
    answers: PropTypes.array,
};

FormInput.defaultProps = {
    data: {},
    answers: [],
};

function FormInput(props) {
    const { data } = props;
    const dispath = useDispatch();

    const allQuestion = useSelector((state) => state.questions);
    const allAnswer = useSelector((state) => state.currentAnswers);
    const currentQuestion = useSelector((state) => state.currentQuestion);
    const currentPhase = useSelector((state) => state.currentPhase);
    const userData = useSelector((state) => state.user);

    const [userInput, setUserInput] = useState('');
    const [inputValidate, setInputValidate] = useState('');
    // const [selected, setSelected] = useState('');

    // get existed data if user back question
    useEffect(() => {
        const updateUserInput = () => {
            var selectedValue = checkAnswerExisted(data, allAnswer);
            setUserInput(selectedValue.value ? selectedValue.value : '');
            // setSelected(selectedValue);
            setInputValidate(true);
        };

        updateUserInput();
    }, [currentQuestion, allAnswer, data]);

    // update input value
    const handleChangeValue = (e) => {
        // setSelected('');
        setUserInput(e.target.value);
        var validate = checkInputValidate(data.user_prop, e.target.value);
        setInputValidate(validate);
    };

    // force next question
    const forceNextQuestion = (questionId, nextQuestion) => {
        // set current answer
        const answer = {
            questionId: questionId,
            answer: {
                value: userInput,
            },
            questionText: data.question,
            answerValue: userInput,
            answerText: '',
            portfolioAttributes: '',
            investment: null,
        };

        const newCurrentAnswer = checkListCurrentAnswer(allAnswer, answer);
        dispath(setCurrentAnswer(newCurrentAnswer));

        // if answer existed
        // feature redo
        // if (selected === '') {
        dispath(updateQuestion(nextQuestion));
        // }
    };

    // next question
    const handleNextQuestion = () => {
        // validate
        if (inputValidate !== true || userInput === '') return false;

        const questionId = data.order;
        const nextQuestion = getNextQuestion(allQuestion, data.order);
        // const nextQuestion = checkAvailableQuestion(allQuestion, questionId);

        updateNextPhase(dispath, setPhase, nextQuestion, currentPhase);

        // set user data
        var dataInput = () => {
            switch (data.user_prop) {
                case 'name':
                    return { ...userData, name: userInput };
                case 'email':
                    return { ...userData, email: userInput };
                case 'password':
                    return { ...userData, password: userInput };
                case 'age':
                    return { ...userData, age: userInput };
                default:
                    return { ...userData };
            }
        };
        dispath(setUser(dataInput()));


        if (nextQuestion === 'successfully') {
            const successfully = {
                type: 'SUCCESSFULLY',
                phase: 6,
            };

            // post user data to api
            uploadResults(userData, allAnswer);

            dispath(updateQuestion(successfully));
        } else {
            forceNextQuestion(questionId, nextQuestion);
        }

    };


    const styleSubmit = () => {
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
            {data.image_url && (
                <div className='content-center'>
                    <img className='mx-auto' src={data.image_url} alt='' />
                </div>
            )}

            <h2 className='text-4xl font-semibold leading-49 px-3'>
                {data.question}
            </h2>

            {data.description && (
                <p className="pt-2 text-second text-base">{data.description}</p>
            )}

            <p className='pt-8 flex flex-col items-center'>
                <input
                    type={data.user_prop === 'password' ? 'password' : 'email' ? 'email' : 'text'}
                    name={data.user_prop}
                    value={userInput}
                    className='text-lg leading-8 py-2.5 px-3.5 max-w-xs w-full placeholder:text-gray rounded-lg border-1/2 border-pink bg-neutral-100 outline-0 focus-visible:none'
                    placeholder={data.input_placeholder}
                    onChange={(e) => handleChangeValue(e)}
                />

                {inputValidate !== true && (
                    <span className='mt-2 text-red-500'>{inputValidate}</span>
                )}
            </p>
            <p className='pt-12'>
                <button
                    onClick={handleNextQuestion}
                    className='button text-sm font-semibold px-6 py-2 bg-pink text-white leading-h2 rounded-input'
                >
                    {data.button}
                    <i
                        className={`iconw-arrow-right text-icon ${styleSubmit()} align-middle`}
                    ></i>
                </button>
            </p>
        </div>
    );
}

export default FormInput;
