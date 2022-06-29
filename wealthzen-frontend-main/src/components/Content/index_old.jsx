import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import questionApi from '../../api/questionApi';
import { updateQuestion } from '../../app/currentQuestionSlice';
import { setQuestion } from '../../app/questionsSlice';
import FormHello from './FormHello';
import FormInput from './FormInput';
import FormPickMultiple from './FormPickMultiple';
import FormPickOne from './FormPickOne';
import FormPortfolio1 from './FormPortfolio1';
import FormPortfolio2 from './FormPortfolio2';
import FormPortfolio3 from './FormPortfolio3';
import FormTextOnly from './FormTextOnly';

const dataFormPorfolio1 = {
    style: 1,
    title: 'Choose the Portfolio that best suits you!',
    subTitle: 'We have used two different models to design your portfolio.',
    items: [
        {
            itemTitle: 'Portfolio Recommendation A',
            description:
                'This portfolio is for getting the most optimum return for the risk. The return maybe higher or lower than your target return, but it is the best mix of securities to give the highest return for the risk.',
            reveal: 'Reveal Option A',
            etf: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            index: 80,
            tech: 5,
            bonds: 2,
            reFunds: 3,
            gold: 10,
            volatility: 'Low',
            timeToReturn: 'High',
            risk: 'Med',
            buttonText: 'I want to continue with Portfolio A',
        },
        {
            itemTitle: 'Portfolio Recommendation B',
            description:
                'This portfolio aims to deliver your target return for the lowest possible risk.',
            reveal: 'Reveal Option B',
            etf: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            index: 80,
            tech: 5,
            bonds: 2,
            reFunds: 3,
            gold: 10,
            volatility: 'Low',
            timeToReturn: 'High',
            risk: 'Med',
            buttonText: 'I want to continue with Portfolio B',
        },
    ],
};

const dataFormPorfolio2 = {
    style: 2,
    title: 'Here is your final Portfolio',
    subTitle: 'The following allocation best suit you!',
};

const dataFormPorfolio3 = {
    style: 2,
    title: 'Here is your final Portfolio',
    subTitle: 'The following allocation best suit you!',
};

Content.propTypes = {};

function Content(props) {
    const dispatch = useDispatch();
    const currentQuestion = useSelector((state) => state.currentQuestion);
    const userData = useSelector((state) => state.user);
    const allAnswer = useSelector((state) => state.currentAnswers);
    const currentPhase = useSelector((state) => state.currentPhase);
    const test = useSelector((state) => state.portfolioAttrState);

    // Fetch all Questions using questionAPI
    useEffect(() => {
        const fetchQuestion = async () => {
            const question = await questionApi.getAll();
            // console.log(question);
            const firstQuestion = question.data[0];

            dispatch(setQuestion(question.data));
            dispatch(updateQuestion(firstQuestion));
        };
        fetchQuestion();
    }, [dispatch]);
    

    const style = () => {
        switch (currentQuestion.type) {
            case 'PICK_ONE_1':
            case 'PICK_MULTIPLE_1':
                return 1;
            case 'PICK_ONE_2':
            case 'PICK_MULTIPLE_2':
                return 2;
            case 'PICK_ONE_3':
            case 'PICK_MULTIPLE_3':
                return 3;
            case 'YES_NO':
                return 4;
            default:
                return 1;
        }
    };

    const component = () => {
        switch (currentPhase) {
            case 2:
                return <FormPortfolio1 data={dataFormPorfolio1} />;
            case 4:
                return <FormPortfolio2 data={dataFormPorfolio2} />;
            default:
                break;
        }
        switch (currentQuestion.type) {
            case 'SUCCESSFULLY':
                return <FormPortfolio3 data={dataFormPorfolio3} />;
            case 'FORM_HELLO':
                return <FormHello />;
            case 'READ_ONLY':
                return <FormTextOnly data={currentQuestion} />;
            case 'FORM_INPUT':
                return <FormInput data={currentQuestion} answers={allAnswer} />;
            case 'PICK_ONE_1':
            case 'PICK_ONE_2':
            case 'PICK_ONE_3':
            case 'YES_NO':
                return (
                    <FormPickOne
                        data={currentQuestion}
                        allAnswer={allAnswer}
                        style={style()}
                    />
                );
            case 'PICK_MULTIPLE_1':
            case 'PICK_MULTIPLE_2':
            case 'PICK_MULTIPLE_3':
                return (
                    <FormPickMultiple
                        data={currentQuestion}
                        allAnswer={allAnswer}
                        style={style()}
                    />
                );
            case 'FORM_PORTFOLIO_1':
                return <FormPortfolio1 data={dataFormPorfolio1} />;
            case 'FORM_PORTFOLIO_2':
                return <FormPortfolio2 data={dataFormPorfolio2} />;
            case 'FORM_PORTFOLIO_3':
                return <FormPortfolio3 data={dataFormPorfolio3} />;
            default:
                return <FormInput data={currentQuestion} />;
        }
    };

    return (
        <main
            className={`text-primary py-8 ${
                currentQuestion.type === 'SUCCESSFULLY' ||
                currentQuestion.type === 'FORM_PORTFOLIO_3' ||
                currentPhase === 2 ||
                currentPhase === 4 ||
                currentPhase === 1
                    ? 'h-auto'
                    : 'h-75.887'
            }`}
        >
            <div className='main-content h-full flex items-center justify-center max-w-1152 px-3 mx-auto'>
                {component()}
            </div>
        </main>
    );
}

export default Content;
