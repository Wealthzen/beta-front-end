import { createSlice } from '@reduxjs/toolkit';

var defaultState = {};
const selectedPortfolio = createSlice({
    name: 'selectedPortfolio',
    initialState: defaultState,
    reducers: {
        selectPortfolio(state, action) {
            return action.payload
        },
    },
});

export const getselectedPortfolio = (state) => state;

export const { selectPortfolio } = selectedPortfolio.actions; // named export
export default selectedPortfolio.reducer; // default export

