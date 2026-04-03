import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/userSlice";
import appPageReducer from "./store/appPageSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

//Later on when we want to blacklist any state from being persisted
// const userPersistConfig = {
// 	key: "user",
// 	storage: storage,
// };

// const appPagePersistConfig = {
// 	key: "appPage",
// 	storage: storage,
// };

const persistConfig = {
	key: "root",
	storage,
};

const rootReducer = combineReducers({
	user: userReducer,
	appPage: appPageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

const persistor = persistStore(store);

export { store, persistor };
