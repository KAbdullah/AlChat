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

		// avoids the async-errors when updating messages in the front.
		// handle the push into the array here, instead of inside the dispatch
		setCurrentRoomMessages: (state, action) => {
			state.currentRoomMessages.push(action.payload);
		},

		// resestPreviousRoomMessages: (state, action) => {
		// 	state.currentRoomMessages = [];
		// },

		// for future reference

		// addCurrentRoomMessages: (state, action) => {},

		// setLastMessages: () => {},
	},
});

export const {
	setCurrentRoomId,
	setCurrentRoomMessages,
	resestPreviousRoomMessages,
} = store.actions;

export default store.reducer;
