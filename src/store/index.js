import { configureStore } from "@reduxjs/toolkit";
import langReducer from "./Lang/Lang";
import authReducer from "./Auth/Auth";

const store = configureStore({
    reducer: { lang: langReducer, auth: authReducer }
});

export default store;