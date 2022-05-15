import { createSlice } from '@reduxjs/toolkit';

var defaultState = {
    name: '',
    email: '',
    password: '',
    age: '',
};

const user = createSlice({
    name: 'user',
    initialState: defaultState,
    reducers: {
        setUser(state, action) {
            return (state = action.payload);
        },
    },
});

export const getUser = (state) => state;

const { actions, reducer } = user;
export const { setUser } = actions; // named export
export default reducer; // default export
