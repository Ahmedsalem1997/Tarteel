import { createSlice } from '@reduxjs/toolkit';

const initialLangState = { globalLang: 'ar', translation: require('../../assets/json/lang/en.json') }

const langSlice = createSlice({
    name: 'lang',
    initialState: initialLangState,
    reducers: {
        translation(state, action) {
            state.globalLang = action.payload.lang || state.globalLang;
            state.translation = require(`../../assets/json/lang/${action.payload.lang || state.globalLang}.json`);
            console.log(state.globalLang);
        }
    }
})

// const langReducer = (state = initialState, action) => {
//     if (action.type === 'translation') {
//         return {
//             globalLang: action.lang,
//             translation: require(`../../assets/json/lang/${action.lang}.json`)
//         }
//     }
//     return state;
// }



export const langActions = langSlice.actions;

export default langSlice.reducer;