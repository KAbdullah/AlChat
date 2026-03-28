import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	firstName: "",
	lastName: "",
	emailAddress: "",
	id: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserInfo: (state, action) => {
			const { firstName, lastName, emailAddress, id } = action.payload;
			state.firstName = firstName;
			state.lastName = lastName;
			state.emailAddress = emailAddress;
			state.id = id;
		},
	},
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
