import { createSlice } from '@reduxjs/toolkit';

var defaultState = [];
const portfolioOptions = createSlice({
    name: 'portfolioOptions',
    initialState: defaultState,
    reducers: {
        updatePortfolio(state, action) {
            return (state = action.payload);
        },
    },
});

export const getportfolioOptions = (state) => state;

export const { updatePortfolio } = portfolioOptions.actions; // named export
export default portfolioOptions.reducer; // default export