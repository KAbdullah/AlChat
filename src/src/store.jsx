import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/userSlice";
import appPageReducer from "./store/appPageSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		appPage: appPageReducer,
	},
});

export default store;
