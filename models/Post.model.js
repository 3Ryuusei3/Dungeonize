const { Schema, model } = require("mongoose");

const postModel = new Schema(
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
		character: {
			type: mongoose.Types.ObjectId,
			ref: "Character",
		},
	},
	{
		timestamps: true,
	}
);

placeSchema.index({ location: "2dsphere" });

const Event = model("Event", postModel);

module.exports = Event;
