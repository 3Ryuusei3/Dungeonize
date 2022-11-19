const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const characterSchema = new Schema(
	{
		charactername: {
			type: String,
			trim: true,
			required: true,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
		class: {
			type: String,
			required: true,
			enum: ["wizard", "cleric", "druid", "sorcerer", "barbarian", "fighter"],
		},
		races: {
			type: String,
			required: true,
			enum: ["elf", "gnome", "human", "halfing", "dwarf", "tiefling"],
		},
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
);

const character = model("character", characterSchema);

module.exports = character;
