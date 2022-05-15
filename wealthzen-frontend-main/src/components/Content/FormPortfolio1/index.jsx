import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import portfolioApi from '../../../api/portfolioApi';
import FormPortfolioItem1 from './FormPortfolioItem1';

FormPortfolio1.propTypes = {
    data: PropTypes.object,
};

FormPortfolio1.defaultProps = {
    data: {},
};

function FormPortfolio1(props) {
    const { data } = props;

    const userData = useSelector((state) => state.user);
    const allAnswer = useSelector((state) => state.currentAnswers);
    const currentPhase = useSelector((state) => state.currentPhase);
    const questions = useSelector((state) => state.questions);
    const selectedPortfolio = useSelector((state) => state.selectedPortfolio);

    const [portfolio, setPortfolio] = useState([]);
    const [loading, setLoading] = useState(false)

    const getNumberOfOption = () => {
        let number = ""
        if(portfolio.length === 3) {
            number = "We have used three different models to design your portfolio."
        } else if(portfolio.length === 2) {
            number = "We have used two different models to design your portfolio."
        } else {
            number = "We have used a model to design your portfolio."
        }
        return number
    }

    // fetch portfolio1 api
    useEffect(() => {
        // console.log(allAnswer);
        const fetchPortfolio = async () => {
            if (currentPhase === 2) {
                const [portfolioOptions, portfolioMsg] = await portfolioApi.getPortfolioOptions(
                    allAnswer,
                    userData,
                    currentPhase,
                    questions,
                    selectedPortfolio
                );
                // console.log(portfolioOptions);
                setPortfolio(portfolioOptions);
                setLoading(true)
            }
        };
        fetchPortfolio();
    }, []);

    const selectPortfolio = (item) => {

    }

    return (
        <div
            className={`form-style form-portfolio w-full form-style-${data.style}`}
        >
            {data.title && (
                <h2 className='pb-2 text-center text-4xl font-semibold'>
                    {data.title}
                </h2>
            )}
            {loading ? (
                <p className='text-second text-base text-center'>
                    {`${getNumberOfOption()}`}
                </p>
            ) : (
                <p className='text-second text-base text-center'>
                    Loading...
                </p>
            )}
            <div className='form-content flex max-w-1152'>
                {loading ? (portfolio.map((item, index) => (
                    <FormPortfolioItem1 key={index} dataItem={item} on />
                ))) : (
                    <div class="flex items-center justify-center min-w-full mt-8">
                        <div class="w-20 h-20 border-l-2 border-rose-500 rounded-full animate-spin"></div>
                    </div>
                )}            
            </div>
        </div>
    );
}

export default FormPortfolio1;
