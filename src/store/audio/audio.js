import { createSlice } from '@reduxjs/toolkit';

const initialAudioState = { audioArr: [] }

const audioSlice = createSlice({
    name: 'audio',
    initialState: initialAudioState,
    reducers: {
        addAudio(state, action) {
            const newAudio = action.payload;
            state.audioArr.push(newAudio);
        },
        removeAudio(state, action) {
            state.audioArr = state.audioArr.filter(audio => audio.container.id !== action.payload.container.id);
            console.log(state.audioArr);
        }
    }
});


export const audioActions = audioSlice.actions;

export default audioSlice.reducer;