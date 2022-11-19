const { Schema, model } = require("mongoose");

const forumModel = new Schema(
	{
		description: {
			type: String,
		},
		date: {
			type: Date,
			required: true,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

const Forum = model("Forum", forumModel);

module.exports = Forum;
