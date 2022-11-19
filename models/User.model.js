const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		username: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			trim: true,
			required: true,
			maxLength: 1000,
		},
		imageUrl: {
			type: String,
			default: "https://i.pinimg.com/originals/e2/d4/52/e2d4524dde801da2ee190b67b34f2a8b.png",
		},
		role: {
			type: String,
			enum: ["Player", "DM", "Admin"],
			default: "Player",
		},
	},
	{
		timestamps: true,
	}
);

const User = model("User", userSchema);

module.exports = User;
