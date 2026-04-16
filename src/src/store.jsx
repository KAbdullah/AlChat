import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/userSlice";
import appPageReducer from "./store/appPageSlice";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

// const userPersistConfig = {
// 	key: "user",
// 	storage: storage,
// };

// const appPagePersistConfig = {
// 	key: "appPage",
// 	storage: storage,
// };

//Created two individual configs so later one we can individually tweak each reducer config,
// such as when we want to blacklist any state that we don't want, to expose from being persisted,
// Like the roomId after being refreshed, so the user must click the room again

const userPersistConfig = {
	key: "user",
	storage,
};

const appPagePersistConfig = {
	key: "appPage",
	storage,
	blacklist: ["currentRoomId"],
};

const rootReducer = combineReducers({
	user: persistReducer(userPersistConfig, userReducer),
	appPage: persistReducer(appPagePersistConfig, appPageReducer),
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			//redux-persist actions like rehydrate for persistence are sometimes
			//serizable like so () => {}, so we ignore it if it's action from redux-persist
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

const persistor = persistStore(store);

export { store, persistor };
