import { configureStore } from "@reduxjs/toolkit";
import langReducer from "./Lang/Lang";
import authReducer from "./Auth/Auth";
import audioReducer from "./audio/audio";

const store = configureStore({
    reducer: { lang: langReducer, auth: authReducer, audio: audioReducer }
});

export default store;