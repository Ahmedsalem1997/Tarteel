import { createSlice } from '@reduxjs/toolkit';

const initialRecordsState = { myRecordsHome: 0, latestRecords: 0, myRecords: 0 }

const recordsSlice = createSlice({
    name: 'records',
    initialState: initialRecordsState,
    reducers: {
        updateMyRecordsHome(state) {
            state.myRecordsHome++;
        },
        updateLatestRecords(state) {
            state.latestRecords++;
        },
        updateMyRecords(state) {
            state.myRecords++;
        }

        // setRecords(state, actions) {
        //     state.records = actions.payload;
        // },
        // setComments(state, actions) {
        //     state.comments = actions.payload;
        // },
        // updateRecords(state, actions) {
        //     const updatedRecord = actions.payload;
        //     let updatedRecords = [...state.records];
        //     let existingRecord = updatedRecords.find(record => record.id === updatedRecord.id);
        //     if (existingRecord) {
        //         updatedRecords = updatedRecords.filter(record => record.id !== existingRecord.id);
        //         updatedRecords.push(updatedRecord);
        //     }
        //     state.records = updatedRecords;
        // },
        // updateComments(state, action) {
        //     const updatedComment = action.payload;
        //     let updatedComments = [...state.comments];
        //     let existingComment = updatedComments.find(comment => comment.id === updatedComment.id);
        //     if (existingComment) {
        //         updatedComments = updatedComments.filter(comment => comment.id !== existingComment.id);
        //         updatedComments.push(updatedComment);
        //     }
        //     state.comments = updatedComments;
        // }
    }
});

export const recordsActions = recordsSlice.actions;

export default recordsSlice.reducer;