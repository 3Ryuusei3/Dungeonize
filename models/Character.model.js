//const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema(
	{
		charactername: {
			type: String,
			trim: true,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
		classes: {
			type: String,
			required: true,
		},
		race: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
			default: "https://i.pinimg.com/originals/e2/d4/52/e2d4524dde801da2ee190b67b34f2a8b.png",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Character", characterSchema);
