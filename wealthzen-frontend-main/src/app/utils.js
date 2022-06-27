import answerApi from '../api/answerApi';
import axios from '../api/axiosClient';
import axiosP from 'axios';

/*
 *   get next question
 *   return @object
 */
export const checkAvailableQuestion = (question, latestAnswer, listAnswer) => {
    // NEW CODE
    var index = question.findIndex((x) => x.order === latestAnswer);

    for (let i = index + 1; i <= question.length; i++) {
        if (question[i] === undefined) {
            return 'successfully';
        }

        if (!checkSkipQuestion(question[i].skipLogic, listAnswer)) {
            return question[i];
        }
    }
};

export const getLastQuestionId = (allQuestions) => {
    let lastQuestionId = allQuestions.length;
    allQuestions.forEach(question => {
        if (question.order > lastQuestionId) {
            lastQuestionId = question.order;
        }
    })

    return lastQuestionId;
}


/*
* get Next Question (checkAvailableQuestion Rewritten By Dhamareshwar)
* return @object
*/
export const getNextQuestion = (allQuestions, currentQuestionId) => {
    const lastQuestionId = getLastQuestionId(allQuestions);
    let nextQuestionId = currentQuestionId + 1;

    let nextQuestion = allQuestions.find(question => question.order === nextQuestionId);

    if (nextQuestion === undefined && nextQuestionId < lastQuestionId) {
        return getNextQuestion(allQuestions, nextQuestionId);
    }

    return nextQuestion ? nextQuestion : 'successfully';
};

export const getPreviousQuestion = (allQuestions, currentQuestionId) => {
    let previousQuestionId = currentQuestionId - 1;

    let previousQuestion = allQuestions.find(question => question.order === previousQuestionId);

    if (previousQuestion === undefined && previousQuestionId > 0) {
        return getPreviousQuestion(allQuestions, previousQuestionId);
    }

    return previousQuestion ? previousQuestion : null;
}



/*
 *   get previous question
 *   return @object
 */
export const checkPreviousQuestion = (questions, answers, latestAnswer) => {
    var index_q = answers.findIndex((x) => x.questionId === latestAnswer);

    if (index_q !== -1 && index_q < answers.length) {
        var index = questions.findIndex(
            (x) => x.id === answers[index_q - 1].questionId
        );

        return questions[index];
    } else {
        var index_m = questions.findIndex(
            (x) => x.id === answers[answers.length - 1].questionId
        );

        return questions[index_m];
    }
};

/*
 *   check answer existed
 *   return @string
 */
export const checkAnswerExisted = (currentQuestion, allAnswer) => {
    var index = allAnswer.findIndex((x) => x.questionId === currentQuestion.order);
    console.log(allAnswer[index]);
    return index === -1 ? '' : allAnswer[index].answer ? allAnswer[index].answer : '';
};

/*
 *   update new current answer if user re-answer existed question
 *   return @array of object
 */
export const updateNewCurrentAnswer = () => {
    return 0;
};

/*
 *   validate input form
 *   return @string
 */
export const checkInputValidate = (type, value) => {
    switch (type) {
        case 'name': {
            if (value.length < 4) {
                return 'The name must be at least 4 characters!';
            } else if (value.match(/\d+/g)) {
                return 'Name not contains number!';
            } else if (value === '') {
                return 'Empty is not accepted!';
            } else {
                return true;
            }
        }
        case 'email': {
            if (value === '') {
                return 'Empty is not accepted!';
            } else if (
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ===
                false
            ) {
                return 'Email wrong format!';
            } else {
                return true;
            }
        }
        case 'password': {
            if (value === '') {
                return 'Empty is not accepted!';
            } else if (value.length < 6) {
                return 'The password must be at least 6 characters!';
            } else {
                return true;
            }
        }
        case 'age': {
            if (value === '') {
                return 'Empty is not accepted!';
            } else if (value.match(/\d+/g)) {
                return true;
            } else {
                return 'Please enter only number!';
            }
        }
        default:
            return false;
    }
};

/*
 *   update new current answer if user re-answer existed question
 *   return @array of object
 */
export const checkListCurrentAnswer = (allAnswer, currentAnswer) => {
    let filteredAnswers = allAnswer.filter(answer => answer.questionId !== currentAnswer.questionId);
    filteredAnswers.push(currentAnswer);
    return filteredAnswers;
    // var index = allAnswer.findIndex(
    //     (x) => x.questionId === currentAnswer.questionId
    // );
    // // if not exist in array
    // if (index === -1) {
    //     return [...allAnswer, currentAnswer];
    // }
    // // if index existed in array
    // else {
    //     var newAnswer = allAnswer.slice(0, index);
    //     return [...newAnswer, currentAnswer];
    // }
};

/*
 *   caculate investment
 *   return @object
 */
export const caculateInvestment = (allAnswer) => {
    var volatility = 0,
        ttr = 0,
        risk = 0,
        volatilityLength = 1e-6,
        ttrLength = 1e-6,
        riskLength = 1e-6;

    for (var i = 0; i < allAnswer.length; i++) {
        let investAttr = allAnswer[i].investment;

        if (investAttr) {
            if (investAttr.volatility !== undefined) {
                volatility += investAttr.volatility;
                volatilityLength++;
            }
            if (investAttr.ttr !== undefined) {
                ttr += investAttr.ttr;
                ttrLength++;
            }
            if (investAttr.risk !== undefined) {
                risk += investAttr.risk;
                riskLength++;
            }
        }
    }

    let result = {
        volatility: volatility / volatilityLength,
        ttr: ttr / ttrLength,
        risk: risk / riskLength,
    };
    // console.log(result);
    return result;
};

/*
 *   caculate skip logic
 *   return @bool
 */
export const checkSkipQuestion = (skipLogic, answers) => {
    if (!skipLogic) return false;

    switch (skipLogic.type) {
        case 'AND':
            // All items must be true
            for (let i = 0; i < skipLogic.items.length; i++) {
                let item = skipLogic.items[i];
                if (!checkSkipQuestion(item, answers)) {
                    return false;
                }
            }
            return true;
        case 'OR':
            // One item is true, then true
            for (let i = 0; i < skipLogic.items.length; i++) {
                let item = skipLogic.items[i];
                if (checkSkipQuestion(item, answers)) {
                    return true;
                }
            }
            return false;
        case 'Answer':
            // check the answer is matched
            var index = answers.findIndex(
                (x) => x.questionId === skipLogic.questionId
            );

            let currentAnswer = answers[index];
            if (currentAnswer !== undefined) {
                if (currentAnswer.answerValue === skipLogic.value) {
                    return true;
                }
            } else {
            }
            return false;
        default:
            throw `Unsupported type ${skipLogic.type}`;
    }
};

export const updateNextPhase = (dispatch, setPhase, nextQuiz, currentPhase) => {
    if (nextQuiz && nextQuiz.phase) {
        if (nextQuiz.phase === 3 && currentPhase === 1) {
            console.log(`next question:`, nextQuiz, `move to phase 2`);
            dispatch(setPhase(2));
        } else if (nextQuiz.phase === 5 && currentPhase === 3) {
            console.log(`next question:`, nextQuiz, `move to phase 4`);
            dispatch(setPhase(4));
        } else {
            console.log(`next question:`, nextQuiz, `stay in the phase`);
            dispatch(setPhase(nextQuiz.phase));
        }
    }
};

export const updatePrevPhase = (
    dispatch,
    setPhase,
    allQuestions,
    currentPhase,
    currentQuestionsIdx
) => {
    const currentQuestion = allQuestions[currentQuestionsIdx];
    const prevQuiz = allQuestions[currentQuestionsIdx - 1];
    if (prevQuiz) {
        if (
            (prevQuiz.phase === 1 && currentQuestion.phase === 3) ||
            currentPhase === 2
        ) {
            dispatch(setPhase(1));
        } else if (
            (prevQuiz.phase === 3 && currentQuestion.phase === 5) ||
            currentPhase === 2
        ) {
            dispatch(setPhase(3));
        } else {
            dispatch(setPhase(prevQuiz.phase));
        }
    }
};

/*
 *   Group portfolio item
 *   return a list of grouped portfolio based on Items' Portfolio
 *   Item example:
 *   {
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
 */
export const groupPortfolio = (listItem) => {
    // List of portfolio object
    /**
     * {
     *      Max Sharpe: {
     *          items: [], items of portfolio
     *          ...
     *      }
     * }
     */

    const portfolios = new Map();

    listItem.forEach((item) => {
        if (!portfolios.has(item.Portfolio)) {
            portfolios.set(item.Portfolio, {
                items: [],
                name: item.Portfolio,
                portfolioName: item.portfolioName,
                annualized_return: 0,
                daily_return: 0,
                daily_vol: 0,
                annualized_vol: 0,
                risk_free_rate: 0,
                sharpe_ratio: 0,
            });
        }

        let currentPortfolio = portfolios.get(item.Portfolio);
        currentPortfolio.items.push(item);

        currentPortfolio.annualized_return +=
            item.annualized_return * item.allocation;
        currentPortfolio.daily_return += item.daily_return * item.allocation;
        currentPortfolio.daily_vol += item.daily_vol * item.allocation;
        currentPortfolio.annualized_vol +=
            item.annualized_vol * item.allocation;
        currentPortfolio.risk_free_rate +=
            item.risk_free_rate * item.allocation;
        currentPortfolio.sharpe_ratio += item.sharpe_ratio * item.allocation;
    });

    let newPortfolio = [];

    // sort all location
    portfolios.forEach((portfolio) => {
        portfolio.items.sort((a, b) => b.allocation - a.allocation);
        newPortfolio.push(portfolio);
    });
    return newPortfolio;
};

export const uploadResults = (userData, allAnswer) => {
    // post user data to api
    // userApi.add(userData);
    axios
        .post('/users', userData)
        .then(function (response) {
            // post user answer to api
            // console.log(response.data.id);
            const userId = response.data.id;
            allAnswer.map((item) => answerApi.add(item, userId));
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const getPortfolioOptions = (formData) => {
    let baseURL = getBaseOptimizerUrl();

    axiosP
        .post(baseURL + 'optimizer/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(function (response) {
            // post user answer to api
            console.log(response);
            // const userId = response.data.id;
            // allAnswer.map((item, index) => answerApi.add(item, userId));
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const getBaseUrl = () => {
    let baseURL;
    if (window.location.href.split(':')[1].substring(2) === 'localhost' || window.location.href.split(':')[1].substring(2) === '127.0.0.1') {
        baseURL = 'http://127.0.0.1:5555/api';
    } else {
        baseURL = window.location.href;
    }

    return baseURL;
};


export const getBaseOptimizerUrl = () => {
    let baseURL;

    if (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'
    ) {
        // baseURL = 'http://192.53.115.165:8000/';
        baseURL = 'https://wztestbe.ga/';
    } else {
        baseURL = window.location.href;
    }

    return baseURL;
};
