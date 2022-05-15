import { createSlice } from '@reduxjs/toolkit';

var defaultState = {
    ttr: 0,
    risk: 0,
    volatility: 0,
};
const investment = createSlice({
    name: 'investment',
    initialState: defaultState,
    reducers: {
        setInvestment(state, action) {
            return (state = action.payload);
        },
    },
});

export const getInvestment = (state) => state;

export const { setInvestment } = investment.actions; // named export
export default investment.reducer; // default export
