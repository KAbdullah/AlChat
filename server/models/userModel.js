import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const userSchema = new Schema(
	{
		firstName: String,
		lastName: String,
		emailAddress: {
			type: String,
			lowercase: true,
			unique: true,
			required: true,
		},
		password: { type: String, required: true, minlength: 6 },
	},
	{
		timestamps: true,
		validateBeforeSave: true,
	},
);

userSchema.pre("save", async function (next) {
	try {
		if (!this.isModified("password")) return next();
		this.password = await bcrypt.hash(this.password, 12);
		next();
	} catch (error) {
		next(error);
	}
});

userSchema.methods.checkPassword = async function (
	candidatePassword,
	userPassword,
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
