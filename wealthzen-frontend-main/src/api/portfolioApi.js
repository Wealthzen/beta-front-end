import axios from 'axios';
import { getBaseOptimizerUrl, groupPortfolio } from '../app/utils';

const portfolioApi = {
    /**
     * Get the portfolio options from optimizer API
     * @param {*} allAnswers list of answers
     * @param {*} userData to get user.age
     * @param {*} phase 2, 4, 6, will be converted to 1, 2, 3
     * @param {*} allQuestions List of all questions
     * @returns A list of portfolio objects
     * A portfolio:
     * {
            items: [
                {
                    asset_ticker: '2801.HK',
                    daily_return: 0.0002110365,
                    annualized_return: 0.0531811899,
                    daily_vol: 0.0172164219,
                    annualized_vol: 0.2733022247,
                    risk_free_rate: 0.02,
                    sharpe_ratio: 0.121408415,
                    asset_name: 'iShares Core MSCI China Index ETF',
                    allocation: 0.01,
                    Portfolio: 'Max Sharpe',
                }
            ],
            name: item.Portfolio,
            asset_names: [],
            asset_tickers: [],
            annualized_return: 0,
            daily_return: 0,
            daily_vol: 0,
            annualized_vol: 0,
            risk_free_rate: 0,
            sharpe_ratio: 0,
            allocation: 0,
        }
     * 
     */
    async getPortfolioOptions(
        allAnswers,
        userData,
        phase,
        allQuestions,
        selectedPortfolio
    ) {
        let allPortfolioAttributes = {};

        allQuestions.forEach((question) => {
            if (question.choices) {
                question.choices.forEach((c) => {
                    if (c.portfolioAttributes) {
                        Object.keys(c.portfolioAttributes).forEach((key) => {
                            if (!(key in allPortfolioAttributes)) {
                                allPortfolioAttributes[key] = '';
                            }
                        });
                    }
                });
            }
        });

        allAnswers.forEach((item) => {
            if (item.portfolioAttributes) {
                for (const [key, value] of Object.entries(
                    item.portfolioAttributes
                )) {
                    allPortfolioAttributes[key] = value;
                }
            }
        });

        var bodyFormData = new FormData();

        for (const [key, value] of Object.entries(allPortfolioAttributes)) {
            bodyFormData.append(key, value);
        }

        if (userData.age >= 35) {
            bodyFormData.append('userAge', 'Above 35');
        } else {
            bodyFormData.append('userAge', 'Below 35');
        }

        bodyFormData.append('dataSource', 'saved');

        let stage = 2;
        switch (phase) {
            case 2:
                stage = 1;
                break;
            case 4:
                stage = 2;
                break;
            default:
                stage = 3;
                break;
        }
        bodyFormData.append('stage', stage);

        if (selectedPortfolio.portfolioName) {
            bodyFormData.append(
                'portfolioSelected',
                selectedPortfolio.portfolioName
            );
        }

        console.log('bodyFormData', bodyFormData);

        let baseURL = getBaseOptimizerUrl();

        try {
            const response = await axios.post(
                baseURL + 'optimizer/',
                bodyFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log(response.data);
            return [groupPortfolio(response.data.portfolio), response.data.msg];
        } catch (e) {
            console.error(e);
        }
    },
};

export default portfolioApi;
