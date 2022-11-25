const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
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
			default: "https://res.cloudinary.com/dhws4e2ty/image/upload/v1669291920/gfdvvkt06tfyaosisukn.jpg",
		},
		role: {
			type: String,
			enum: ["Player", "DM", "Admin"],
			default: "Player",
		},
		characters: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Character",
			},
		],
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model("User", userSchema)
