import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = { isAuth: false }

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        isAuth(state) {
            state.isAuth = true;
        }
    }
})



export const authActions = authSlice.actions;

export default authSlice.reducer;