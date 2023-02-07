import { createSlice } from '@reduxjs/toolkit';

const initialAudioState = { audioArr: [] }

const audioSlice = createSlice({
    name: 'audio',
    initialState: initialAudioState,
    reducers: {
        addAudio(state, action) {
            state.audioArr = [...state.audioArr, action.payload];
        },
    }
});


export const audioActions = audioSlice.actions;

export default audioSlice.reducer;