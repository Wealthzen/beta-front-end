import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormPortfolioRate from '../FormPortfolioRate';
import { updateQuestion } from '../../../app/currentQuestionSlice';
import { useDispatch, useSelector } from 'react-redux';

import { checkAvailableQuestion } from '../../../app/utils';
import portfolioApi from '../../../api/portfolioApi';
import { selectPortfolio } from '../../../app/selectedPortfolioSlice';

// import FormPorfolioItem3 from './FormPorfolioItem3';

FormPortfolio3.propTypes = {
    data: PropTypes.object,
};

FormPortfolio3.defaultProps = {
    data: {},
};

function FormPortfolio3(props) {
    const { data } = props;
    const dispatch = useDispatch();
    const allQuestion = useSelector((state) => state.questions);

    const currentQuestion = useSelector((state) => state.currentQuestion);
    const questionId = currentQuestion.id;
    const nextQuestion = checkAvailableQuestion(allQuestion, questionId);
    const questions = useSelector((state) => state.questions);
    const selectedPortfolio = useSelector((state) => state.selectedPortfolio);
    const currentPhase = useSelector((state) => state.currentPhase);
    const allAnswer = useSelector((state) => state.currentAnswers);
    const userData = useSelector((state) => state.user);

    const [volatility, setVolatility] = useState('Med');
    const [ttr, setTtr] = useState('Med');
    const [risk, setRisk] = useState('Med');

    const [loading, setLoading] = useState(true);
    const [portfolioMsg, setPortfolioMsg] = useState({});

    // force next question
    const forceNextQuestion = (questionId, nextQuestion) => {
        dispatch(updateQuestion(nextQuestion));
    };

    const handleBackgroundClick = () => {
        // validate
        if (!data.button) {
            forceNextQuestion(questionId, nextQuestion);
        }
    };

    // fetch portfolio1 api
    useEffect(() => {
        // console.log(allAnswer);
        const fetchPortfolio = async () => {
            setLoading(true);
            const [portfolioOptions, msg] =
                await portfolioApi.getPortfolioOptions(
                    allAnswer,
                    userData,
                    currentPhase,
                    questions,
                    selectedPortfolio
                );
            dispatch(selectPortfolio(portfolioOptions[0]));
            setPortfolioMsg(msg);
            setLoading(false);
        };
        fetchPortfolio();
    }, []);

    useEffect(() => {
        if (selectedPortfolio.annualized_vol < 0.16) {
            setVolatility('Low');
        } else if (selectedPortfolio.annualized_vol > 0.32) {
            setVolatility('High');
        } else {
            setVolatility('Med');
        }

        if (selectedPortfolio.annualized_return < 0.05) {
            setTtr('Low');
        } else if (selectedPortfolio.annualized_return > 0.12) {
            setTtr('High');
        } else {
            setTtr('Med');
        }

        if (selectedPortfolio.risk_free_rate < 0.02) {
            setRisk('Low');
        } else if (selectedPortfolio.risk_free_rate > 0.08) {
            setRisk('High');
        } else {
            setRisk('Med');
        }
    }, [selectedPortfolio]);

    return (
        <div
            className={`form-style form-portfolio form-style-${data.style} h-auto`}
        >
            {data.title && (
                <h2 className='pb-2 text-center text-4xl font-semibold'>
                    {data.title}
                </h2>
            )}
            {data.subTitle && (
                <p className='text-second text-base text-center'>
                    {data.subTitle}
                </p>
            )}
            {loading ? (
                <div class='flex items-center justify-center min-w-full mt-8'>
                    <div class='w-20 h-20 border-l-2 border-rose-500 rounded-full animate-spin'></div>
                </div>
            ) : (
                <div className='form-content pt-8 px-3 flex flex-col'>
                    <FormPortfolioRate />
                    <ul className='clear-both flex justify-center px-6 py-2 bg-white rounded-lg max-w-400 mx-auto z-10 border border-input-border mt-50'>
                        <li className='mr-6 text-sm font-semibold leading-19'>
                            <label htmlFor=''>Volatility</label>
                            <span
                                className={`leading-18 ml-2 font-normal text-${volatility.toLowerCase()}`}
                            >
                                {volatility}
                            </span>
                        </li>
                        <li className='mr-6 text-sm font-semibold leading-19'>
                            <label htmlFor=''>Time to Returns</label>
                            <span
                                className={`leading-18 ml-2 font-normal text-${ttr.toLowerCase()}`}
                            >
                                {ttr}
                            </span>
                        </li>
                        <li className='text-sm font-semibold leading-19'>
                            <label htmlFor=''>Risk</label>
                            <span
                                className={`leading-18 ml-2 font-normal text-${risk.toLowerCase()}`}
                            >
                                {risk}
                            </span>
                        </li>
                    </ul>
                    <div className='section-1 w-screen bg-bgportfolio -mx-3 mt-top-16'>
                        <div className='flex max-w-1008 mx-auto mt-16 mb-12'>
                            <div className='mx-9'>
                                <img
                                    className='mb-4'
                                    src='/images/img-bag.png'
                                    alt=''
                                />
                                {/* As the Backend API is not working it returns empty portfolio msg so added ? opeartor for optional feature */}
                                <h5 className='font-semibold text-table mb-4'>
                                    {portfolioMsg?.vol_msg?.vol_msg_header}
                                </h5>
                                <p className='text-sm leading-18 text-second mb-2'>
                                    {portfolioMsg?.vol_msg?.vol_msg_body}
                                </p>
                                <ul className='text-sm leading-18 text-second list-disc ml-7'>
                                    {portfolioMsg?.vol_msg?.vol_msg_bullets
                                        .split(';')
                                        .map((txt) => (
                                            <li>{txt}</li>
                                        ))}
                                </ul>
                            </div>
                            <div className='mx-9'>
                                <img
                                    className='mb-4'
                                    src='/images/img-down.png'
                                    alt=''
                                />
                                {/* As the Backend API is not working it returns empty portfolio msg so added ? opeartor for optional feature */}
                                <h5 className='font-semibold text-table mb-4'>
                                    {portfolioMsg?.return_msg?.risk_msg_header}
                                </h5>
                                <p className='text-sm leading-18 text-second mb-2'>
                                    {portfolioMsg?.return_msg?.risk_msg_body}
                                </p>
                                <ul className='text-sm leading-18 text-second list-disc ml-7'>
                                    {portfolioMsg?.return_msg?.risk_msg_bullets
                                        .split(';')
                                        .map((txt) => (
                                            <li>{txt}</li>
                                        ))}
                                </ul>
                            </div>
                            <div className='mx-9'>
                                <img
                                    className='mb-4'
                                    src='/images/img-clock.png'
                                    alt=''
                                />
                                {/* As the Backend API is not working it returns empty portfolio msg so added ? opeartor for optional feature */}

                                <h5 className='font-semibold text-table mb-4'>
                                    {
                                        portfolioMsg?.time_to_return_msg?.time_to_return_msg_header
                                    }
                                </h5>
                                <p className='text-sm leading-18 text-second mb-2'>
                                    {
                                        portfolioMsg?.time_to_return_msg?.time_to_return_msg_body
                                    }
                                </p>
                                <ul className='text-sm leading-18 text-second list-disc ml-7'>
                                    {portfolioMsg?.time_to_return_msg?.time_to_return_msg_bullets
                                        .split(';')
                                        .map((txt) => (
                                            <li>{txt}</li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* As the Backend API is not working it returns empty portfolio msg so added ? opeartor for optional feature */}
                    <p className='max-w-936 w-full mx-auto mt-12'>
                        {portfolioMsg?.thematic_msg?.thematic_investing_msg}
                    </p>
                    <div className='section-2 max-w-936 w-full mx-auto mt-12'>
                        <div className='flex mb-12'>
                            <figure className='mr-6'>
                                <img
                                    className='rounded-full'
                                    src='/images/img-circle.jpg'
                                    alt=''
                                />
                            </figure>
                            <div>
                                <h3 className='font-semibold leading-22 text-black mb-22'>
                                    {
                                        portfolioMsg?.thematic_msg?.thematic_investing_point1_msg_header
                                    }
                                </h3>
                                <p className='text-sm leading-18 text-second mb-2'>
                                    {
                                        portfolioMsg?.thematic_msg?.thematic_investing_point1_msg_body
                                    }
                                </p>
                                {/* <ul className='text-sm leading-18 text-second list-disc ml-6'>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                    <li>Lorem ipsum dolor sit amet. </li>
                                    <li>Lorem ipsum dolor sit amet. </li>
                                </ul> */}
                            </div>
                        </div>
                        <div className='flex mb-12'>
                            <figure className='mr-6'>
                                <img
                                    className='rounded-full'
                                    src='/images/img-circle.jpg'
                                    alt=''
                                />
                            </figure>
                            <div>
                                {/* As the Backend API is not working it returns empty portfolio msg so added ? opeartor for optional feature */}
                                <h3 className='font-semibold leading-22 text-black mb-22'>
                                    {
                                        portfolioMsg?.thematic_msg?.thematic_investing_point2_msg_header
                                    }
                                </h3>
                                <p className='text-sm leading-18 text-second mb-2'>
                                    {
                                        portfolioMsg?.thematic_msg?.thematic_investing_point2_msg_body
                                    }
                                </p>
                                {/* <ul className='text-sm leading-18 text-second list-disc ml-6'>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                    <li>Lorem ipsum dolor sit amet. </li>
                                    <li>Lorem ipsum dolor sit amet. </li>
                                </ul> */}
                            </div>
                        </div>
                        <div className='flex mb-12'>
                            <figure className='mr-6'>
                                <img
                                    className='rounded-full'
                                    src='/images/img-circle.jpg'
                                    alt=''
                                />
                            </figure>
                            <div>
                                {/* As the Backend API is not working it returns empty portfolio msg so added ? opeartor for optional feature */}
                                <h3 className='font-semibold leading-22 text-black mb-22'>
                                    {
                                        portfolioMsg?.thematic_msg?.thematic_investing_point3_msg_header
                                    }
                                </h3>
                                <p className='text-sm leading-18 text-second mb-2'>
                                    {
                                        portfolioMsg?.thematic_msg?.thematic_investing_point3_msg_body
                                    }
                                </p>
                                {/* <ul className='text-sm leading-18 text-second list-disc ml-6'>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                    <li>Lorem ipsum dolor sit amet. </li>
                                    <li>Lorem ipsum dolor sit amet. </li>
                                </ul> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {currentQuestion.type !== 'SUCCESSFULLY' && (
                <div className='section-continue fixed bottom-0 z-10 w-full bg-white'>
                    <div className='max-w-1152 px-3 py-6 mx-auto flex justify-between items-center'>
                        <div>
                            <p className='text-lg text-slate-700 font-semibold mb-2'>
                                What to do next?
                            </p>
                            <span className='text-sm text-second'>
                                Enter our weekly market prediction game for an
                                opportunity to win $10 every week.
                            </span>
                        </div>
                        <button
                            onClick={handleBackgroundClick}
                            className='button text-sm font-semibold px-6 py-2 bg-pink text-white leading-h2 rounded-input'
                        >
                            Continue
                            <i
                                className={`iconw-arrow-right text-icon ml-2.5 align-middle`}
                            ></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FormPortfolio3;
