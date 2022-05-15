import { createSlice } from '@reduxjs/toolkit';

const currentAnswers = createSlice({
    name: 'currentAnswers',
    initialState: [],
    reducers: {
        setCurrentAnswer(state, action) {
            return (state = action.payload);
        },
    },
});

export const getAllAnswer = (state) => state;

export const { setCurrentAnswer } = currentAnswers.actions; // named export
export default currentAnswers.reducer; // default export
