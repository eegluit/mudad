import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user : {},
    token : {
        access: '',
    }
}

export const userSlice = createSlice({
    name : 'userData',
    initialState,
    reducers: {
        loginData: (state, action) => {
            state.user = action.payload.user;
            state.token.access = action.payload.token.access;
        },
        logout : (state, action) => {
            state.user = {};
            state.token.access = '';
        },
        addToken : (state, action) => {
            state.token.access = action.payload;
        }
    }
});

export const {loginData, logout, addToken, addProjectId} = userSlice.actions;

export default userSlice.reducer;