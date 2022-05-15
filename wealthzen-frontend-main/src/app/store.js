import { configureStore } from '@reduxjs/toolkit';
import currentAnswersSlice from './currentAnswersSlice';
import currentQuestionSlice from './currentQuestionSlice';
import investmentSlice from './investmentSlice';
import phaseSlice from './phaseSlice';
import portfolioOptionsSlice from './portfolioOptionsSlice';
import allQuestionSlice from './questionsSlice';
import selectedPortfolioSlice from './selectedPortfolioSlice';
import userSlice from './userSlice';

const rootReducer = {
    currentQuestion: currentQuestionSlice,
    user: userSlice,
    questions: allQuestionSlice,
    investment: investmentSlice,
    currentAnswers: currentAnswersSlice,
    currentPhase: phaseSlice,
    portfolioOptions: portfolioOptionsSlice,
    selectedPortfolio: selectedPortfolioSlice,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
