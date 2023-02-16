import { createSlice } from '@reduxjs/toolkit';

const initialModalsState =
{
    editProfileModal: false,
    loginModal: false,
    addNewRecordModal: false,
    mediaModal: false,
    mediaToPlay: ''
}

const modalsSlice = createSlice({
    name: 'audio',
    initialState: initialModalsState,
    reducers: {
        openLoginModal(state) {
            state.loginModal = true;
        },
        closeLoginModal(state) {
            state.loginModal = false;
        },
        openEditProfileModal(state, actions) {
            state.editProfileModal = true;
            // state.token = actions.payload;
        },
        closeEditProfileModal(state) {
            state.editProfileModal = false;
        },
        openAddNewRecordModal(state) {
            state.addNewRecordModal = true;
        },
        closeAddNewRecordModal(state) {
            state.addNewRecordModal = false;
        },
        openMediaModal(state, actions) {
            state.mediaModal = true;
            state.mediaToPlay = actions.payload;
        },
        closeMediaModal(state) {
            state.mediaModal = false;
        },



    }
});


export const modalsActions = modalsSlice.actions;

export default modalsSlice.reducer;