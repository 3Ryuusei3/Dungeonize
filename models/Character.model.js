//const { Schema, model } = require("mongoose")
const mongoose = require("mongoose")

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
		classInfo: {
			health: {
				type: Number
			},
			skills: {
				type: String
			},
			equipment: {
				type: String
			},
			traits: {
				type: String
			}
		},
		raceInfo: {
			speed: {
				type: Number
			},
			alignment: {
				type: String
			},
			age: {
				type: String
			},
			ageDescription: {
				type: String
			},
			sizeDescription: {
				type: String
			},
			languages: {
				type: String
			},
			traits: {
				type: String
			}
		},
		background: {
			personality: {
				type: String,
			},
			ideals: {
				type: String,
			},
			bonds: {
				type: String,
			},
			flaws: {
				type: String,
			},
		}
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model("Character", characterSchema)
