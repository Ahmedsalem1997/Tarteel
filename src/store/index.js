import { configureStore } from "@reduxjs/toolkit";
import langReducer from "./Lang/Lang";
import authReducer from "./Auth/Auth";
import audioReducer from "./audio/audio";
import recordsReducer from "./Records/Records";

const store = configureStore({
    reducer: { lang: langReducer, auth: authReducer, audio: audioReducer, records: recordsReducer }
});

export default store;