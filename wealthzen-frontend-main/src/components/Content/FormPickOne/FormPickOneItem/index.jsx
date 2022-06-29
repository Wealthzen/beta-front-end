import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAnswer } from '../../../../app/currentAnswersSlice';
import { updateQuestion } from '../../../../app/currentQuestionSlice';
import { setInvestment } from '../../../../app/investmentSlice';
import { setPhase } from '../../../../app/phaseSlice';
import {
    caculateInvestment,
    checkAvailableQuestion,
    checkListCurrentAnswer,
    updateNextPhase,
    uploadResults,
} from '../../../../app/utils';

FormPickOneItem.propTypes = {
    dataItem: PropTypes.object,
    questionId: PropTypes.number,
    selected: PropTypes.string,
    questionText: PropTypes.string,
    style: PropTypes.number,
};

FormPickOneItem.defaultProps = {
    dataItem: {},
    questionId: 0,
    selected: '',
    questionText: '',
    style: 4,
};

function FormPickOneItem(props) {
    const { dataItem, questionId, selected, questionText, style } = props;

    const dispath = useDispatch();
    const allQuestion = useSelector((state) => state.questions);
    const allAnswer = useSelector((state) => state.currentAnswers);
    const userData = useSelector((state) => state.user);
    const currentPhase = useSelector((state) => state.currentPhase);

    const handleNextQuestion = () => {
        // set current answer
        const answer = {
            questionId: questionId,
            answer: {
                [dataItem.value]: dataItem.text
            },
            questionText: questionText,
            answerValue: dataItem.value,
            answerText: dataItem.text,
            portfolioAttributes: dataItem.portfolioAttributes,
            investment: dataItem.investmentAttributes,
        };
        const newCurrentAnswer = checkListCurrentAnswer(allAnswer, answer);
        dispath(setCurrentAnswer(newCurrentAnswer));

        const nextQuestion = checkAvailableQuestion(
            allQuestion,
            questionId,
            newCurrentAnswer
        );
        
        updateNextPhase(dispath, setPhase, nextQuestion, currentPhase);


        // const portfolioAttributes =

        if (nextQuestion === 'successfully') {
            const successfully = {
                type: 'SUCCESSFULLY',
                phase: 6,
            };

            // post user data to api
            // uploadResults(userData, allAnswer);

            dispath(updateQuestion(successfully));
        } else {
            const investmentAttrs = caculateInvestment(newCurrentAnswer);
            dispath(setInvestment(investmentAttrs));

            // force next question
            dispath(updateQuestion(nextQuestion));
        }
    };

    const dataStyles =
        style === 4
            ? 'rounded-full w-18 h-18 mx-6'
            : 'h-full px-8 py-6 mx-3 rounded-lg';

    const stylesP =
        style === 4
            ? 'font-semibold uppercase text-pink leading-6'
            : 'text-second leading-p';

    const itemStyle = () => {
        let classItems = '';

        if (style === 3) {
            classItems = ' flex-33';
        } else if (style === 4) {
            classItems = '';
        } else {
            classItems = ' flex-0-50';
        }
        return classItems;
    };

    const selectedStyle =
        selected === dataItem.value ? 'bg-questionActive' : '';

    return (
        <div className={`item${itemStyle()} mb-6`} onClick={handleNextQuestion}>
            <figure
                className={`flex justify-center items-center flex-col border-1/2 border-pink cursor-pointer hover:shadow-focus ${dataStyles} ${selectedStyle}`}
            >
                <input type='radio' name='single' className='hidden' />
                {dataItem.image_url && (
                    <img className='mx-auto' src={dataItem.image_url} alt='' />
                )}
                {dataItem.text && (
                    <p className={`${stylesP} mx-auto text-center text-lg`}>
                        {dataItem.text}
                    </p>
                )}
            </figure>
        </div>
    );
}

export default FormPickOneItem;
