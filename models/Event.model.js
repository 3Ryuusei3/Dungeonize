const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		description: {
			type: String,
		},
		location: {
			type: {
				type: String,
			},
			coordinates: [Number],
		},
		date: {
			type: Date,
			required: true,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
		characters: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Character",
			},
		],
		post: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Post",
				// default: [],
			},
		],
		place: {
			type: String,
			require: true,
		},
	},
	{
		timestamps: true,
	}
);

eventSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Event", eventSchema);

// post.model, lo tiene Manu, para poder meter un semi foro en cada evento, deberíamos de popularlo
