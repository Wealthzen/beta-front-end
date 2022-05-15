import { createSlice } from '@reduxjs/toolkit';

const questions = createSlice({
    name: 'questions',
    initialState: [],
    reducers: {
        setQuestion(state, action) {
            return (state = action.payload);
        },
    },
});

export const getAllQuestion = (state) => state;

export const { setQuestion } = questions.actions; // named export
export default questions.reducer; // default export
