import { createSlice } from '@reduxjs/toolkit';

var defaultState = {};

const currentQuestion = createSlice({
    name: 'currentQuestion',
    initialState: defaultState,
    reducers: {
        updateQuestion(state, action) {
            return (state = action.payload);
        },
    },
});

export const { updateQuestion } = currentQuestion.actions; // named export
export default currentQuestion.reducer; // default export
