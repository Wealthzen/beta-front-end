import { createSlice } from '@reduxjs/toolkit';

var defaultState = 1;
const phase = createSlice({
    name: 'phase',
    initialState: defaultState,
    reducers: {
        increment: (state) => {
            state += 1;
        },
        decrement: (state) => {
            state -= 1;
        },
        setPhase: (state, action) => {
            return (state = action.payload);
        },
    },
});

export const getPhase = (state) => state;

export const { increment, decrement, setPhase } = phase.actions; // named export
export default phase.reducer; // default export
