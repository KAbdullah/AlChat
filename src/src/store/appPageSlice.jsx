import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentRoomId: null,
	currentRoomMessages: [],
	lastMessages: [],
};

const store = createSlice({
	name: "appPage",
	initialState,
	reducers: {
		setCurrentRoomId: (state, action) => {
			state.currentRoomId = action.payload;
		},

		// for future reference
		// setCurrentRoomMessages: () => {},

		// addMessageToCurrentRoom: () => {},

		// setLastMessages: () => {},
	},
});

export const { setCurrentRoomId } = store.actions;

export default store.reducer;
