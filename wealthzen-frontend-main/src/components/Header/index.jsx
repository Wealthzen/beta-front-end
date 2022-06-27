import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuestion } from '../../app/currentQuestionSlice';
import { setPhase } from '../../app/phaseSlice';
import { checkPreviousQuestion, getPreviousQuestion, updatePrevPhase } from '../../app/utils';

Header.propTypes = {};

function Header(props) {
    const [indexQuestion, setIndexQuestion] = useState(0);

    const dispath = useDispatch();

    const allQuestion = useSelector((state) => state.questions);
    const currentQuestion = useSelector((state) => state.currentQuestion);
    const allAnswer = useSelector((state) => state.currentAnswers);
    const currentPhase = useSelector((state) => state.currentPhase);

    useEffect(() => {
        // check if first question
        const updateIndex = () => {
            var index = allQuestion.findIndex(
                (x) => x.order === currentQuestion.order
            );
            setIndexQuestion(index);
        };

        updateIndex();
    }, [currentQuestion, allQuestion, allAnswer]);

    // force previous question
    const handlePreviousQuestion = () => {
        // const previousQuestion = checkPreviousQuestion(
        //     allQuestion,
        //     allAnswer,
        //     currentQuestion.order
        // );
        const previousQuestion = getPreviousQuestion(allQuestion, currentQuestion.order);

        var index = allQuestion.findIndex((x) => x.order === currentQuestion.order);

        if (previousQuestion) {
            updatePrevPhase(dispath, setPhase, allQuestion, currentPhase, index);
            dispath(updateQuestion(previousQuestion));
        }

    };

    return (
        <header className='relative h-10.89 border border-porfolio'>
            <h1 className='hidden'>WealthZen</h1>
            <div className='flex h-full items-center max-w-1152 px-3 mx-auto'>
                <div className='w-1/5'>
                    {indexQuestion > 0 && (
                        <button
                            onClick={handlePreviousQuestion}
                            className='text-sm font-semibold leading-26 text-primary px-6 py-2'
                        >
                            <i className='iconw-arrow-left mr-2.5 text-icon align-middle'></i>
                            Back
                        </button>
                    )}
                </div>
                <div className='w-3/5'>
                    <img
                        className='m-auto'
                        src='/images/wealthzen_logo.png'
                        alt=''
                    />
                </div>
                <div className='w-1/5'></div>
            </div>
        </header>
    );
}

export default Header;
