import { createSlice } from '@reduxjs/toolkit';

const initialThemeState = { theme: 'zain' }

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialThemeState,
    reducers: {
        setTheme(state, action) {
            state.theme = action.payload || state.theme;
        }
    }
})



export const themeActions = themeSlice.actions;

export default themeSlice.reducer;