const router = require("express").Router();

const User = require("./../models/User.model");
const Character = require("./../models/Character.model");
const Event = require("./../models/Event.model");

router.get("/users", (req, res, next) => {
	User.find()
		.then((users) => res.json(users))
		.catch((err) => console.log(err));
});

router.get("/characters", (req, res, next) => {
	Character.find()
		.then((characters) => res.json(characters))
		.catch((err) => console.log(err));
});

router.get("/events", (req, res, next) => {
	Event.find()
		.then((events) => res.json(events))
		.catch((err) => console.log(err));
});

router.get("/events/:event_id", (req, res, next) => {
	const { event_id } = req.params;

	Event.findById(event_id)
		.then((event) => res.json(event))
		.catch((err) => console.log(err));
});

module.exports = router;
