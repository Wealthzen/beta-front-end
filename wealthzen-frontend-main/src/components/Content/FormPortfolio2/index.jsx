import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormPortfolioRate from '../FormPortfolioRate';
import { useDispatch } from 'react-redux';
import { setPhase } from '../../../app/phaseSlice';
import { useSelector } from 'react-redux';
// import FormPorfolioItem2 from './FormPorfolioItem2';
import portfolioApi from '../../../api/portfolioApi';
import { selectPortfolio } from "../../../app/selectedPortfolioSlice"

FormPortfolio2.propTypes = {
    data: PropTypes.object,
};

FormPortfolio2.defaultProps = {
    data: {},
};

function FormPortfolio2(props) {
    const { data } = props;
    const dispatch = useDispatch();

    const currentPhase = useSelector((state) => state.currentPhase);
    const questions = useSelector((state) => state.questions);
    const allAnswer = useSelector((state) => state.currentAnswers);
    const userData = useSelector((state) => state.user);
    const selectedPortfolio = useSelector((state) => state.selectedPortfolio);

    const [volatility, setVolatility] = useState('Med');
    const [ttr, setTtr] = useState('Med');
    const [risk, setRisk] = useState('Med');
    const [portfolioMsg, setPortfolioMsg] = useState({});

    const [loading, setLoading] = useState(true);

    const handleChangePhase = () => {
        dispatch(setPhase(5));
    };

    // fetch portfolio1 api
    useEffect(() => {
        // console.log(allAnswer);
        const fetchPortfolio = async () => {
            if (currentPhase === 4) {
                setLoading(true);
                const [portfolioOptions, msg] = await portfolioApi.getPortfolioOptions(
                    allAnswer,
                    userData,
                    currentPhase,
                    questions,
                    selectedPortfolio
                );
                dispatch(selectPortfolio(portfolioOptions[0]))
                setPortfolioMsg(msg);
                console.log("Dhamaresh Says", msg)
                setLoading(false);
            }
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
    }, [selectedPortfolio])


    return (
        <div
            className={`form-style px-3 form-portfolio form-style-${data.style}`}
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
                <div className='form-content max-w-1152 w-full mx-auto pt-8 flex flex-col'>
                    <FormPortfolioRate />
                    <ul className='clear-both flex justify-center px-6 py-2 bg-white rounded-lg max-w-500 mx-auto z-10 mt-top-16 border border-input-border'>
                        <li className='mr-6 text-sm font-semibold leading-19'>
                            <label htmlFor=''>Volatility</label>
                            <span className={`leading-18 ml-2 font-normal text-${volatility.toLowerCase()}`}>
                                {volatility}
                            </span>
                        </li>
                        <li className='mr-6 text-sm font-semibold leading-19'>
                            <label htmlFor=''>Time to Returns</label>
                            <span className={`leading-18 ml-2 font-normal text-${ttr.toLowerCase()}`}>
                                {ttr}
                            </span>
                        </li>
                        <li className='text-sm font-semibold leading-19'>
                            <label htmlFor=''>Risk</label>
                            <span className={`leading-18 ml-2 font-normal text-${risk.toLowerCase()}`}>
                                {risk}
                            </span>
                        </li>
                    </ul>
                    <p className='px-24 bg-primary text-white text-center leading-22 pt-45 pb-8 rounded-b-10  mt-top-16'>
                        {/* potfolioMsg is empty as there is network error because backend api is not working so I added ? operator for optional property */}
                        {portfolioMsg?.thematic_msg?.thematic_investing_msg}
                    </p>
                    <div className='continue flex items-center justify-between pt-8'>
                        <p className='text-sm leading-19 font-semibold'>
                            We are almost at the end... just few more questions
                            before you complete the journey.
                        </p>
                        <button
                            onClick={handleChangePhase}
                            className='button text-sm font-semibold px-6 py-2 bg-pink text-white leading-h2 rounded-input'
                        >
                            Continue On
                            <i className='iconw-arrow-right text-icon ml-2.5 align-middle'></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FormPortfolio2;
