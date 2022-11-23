const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
	{
		date: {
			type: Date,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		comment: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model("Post", postSchema)
