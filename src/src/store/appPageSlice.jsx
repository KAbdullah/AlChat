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

		setCurrentRoomMessages: (state, action) => {
			state.currentRoomMessages = action.payload;
		},

		// for future reference

		// addMessageToCurrentRoom: () => {},

		// setLastMessages: () => {},
	},
});

export const { setCurrentRoomId } = store.actions;

export default store.reducer;
