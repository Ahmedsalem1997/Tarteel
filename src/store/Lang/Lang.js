import { createSlice } from '@reduxjs/toolkit';

const initialLangState = { globalLang: 'ar', translation: require('../../assets/json/lang/ar.json') }

const langSlice = createSlice({
    name: 'lang',
    initialState: initialLangState,
    reducers: {
        translation(state, action) {
            state.globalLang = action.payload.lang || state.globalLang;
            state.translation = require(`../../assets/json/lang/${action.payload.lang || state.globalLang}.json`);
        }
    }
})



export const langActions = langSlice.actions;

export default langSlice.reducer;