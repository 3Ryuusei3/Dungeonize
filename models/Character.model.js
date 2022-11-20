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
			/* enum: ["wizard", "cleric", "druid", "sorcerer", "barbarian", "fighter"], */
		},
		race: {
			type: String,
			required: true,
			/* enum: ["elf", "gnome", "human", "halfing", "dwarf", "tiefling"], */
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

/* 

{
  "charactername": "pepito",
  "user":
	{
		"$oid": "6378c38652aa0f31a8939c8b"
	},
  "class": "wizard",
  "race": "human",
  "imageUrl":  "https://i.pinimg.com/originals/e2/d4/52/e2d4524dde801da2ee190b67b34f2a8b.png"  
}

*/
