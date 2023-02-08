import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = { isAuth: false, token: '', user: {} }

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setAuth(state, action) {
            console.log(action);
            state.isAuth = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        }
    }
})



export const authActions = authSlice.actions;

export default authSlice.reducer;