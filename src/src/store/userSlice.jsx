import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	firstName: "",
	lastName: "",
	emailAddress: "",
	_id: "",
	userName: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserInfo: (state, action) => {
			const { firstName, lastName, emailAddress, _id, userName } =
				action.payload;
			state.firstName = firstName;
			state.lastName = lastName;
			state.emailAddress = emailAddress;
			state._id = _id;
			state.userName = userName;
		},
	},
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
