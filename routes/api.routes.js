const router = require("express").Router()
const { checkRoles } = require("../middleware/route.guard")

const User = require("./../models/User.model")
const Character = require("./../models/Character.model")
const Event = require("./../models/Event.model")

router.get("/users", /* checkRoles("Admin"), */ (req, res, next) => {
	User.find()
		.then((users) => res.json(users))
		.catch((error) => next(error))
})

router.get("/characters", /* checkRoles("Admin"), */ (req, res, next) => {
	Character.find()
		.then((characters) => res.json(characters))
		.catch((error) => next(error))
})

router.get("/events", /* checkRoles("Admin"), */ (req, res, next) => {
	Event.find()
		.then((events) => res.json(events))
		.catch((error) => next(error))
})

router.get("/events/:event_id", /* checkRoles("Admin"), */ (req, res, next) => {
	const { event_id } = req.params

	Event.findById(event_id)
		.then((event) => res.json(event))
		.catch((error) => next(error))
})

module.exports = router
