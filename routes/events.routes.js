const router = require("express").Router()
const { isLoggedIn, checkRoles } = require("../middleware/route.guard")
const User = require("./../models/User.model")
const Character = require("./../models/Character.model")
const Event = require("./../models/Event.model")
const { formatDate } = require("./../utils/formatdate")


//Events list
router.get("/events", isLoggedIn, (req, res, next) => {
	Event.find()
		.select({ title: 1, place: 1, description: 1, date: 1, maxParticipant: 1, user: 1 })
		.then((events) => {
			events.forEach(elm => {
				elm.formattedDates = formatDate(elm.date)
				elm.isOwner = req.session.currentUser._id === elm.user._id.toString()
			})
			res.render("event/list", {
				events,
				isDM: req.session.currentUser.role === "DM",
				isPlayer: req.session.currentUser.role === "Player",
				isAdmin: req.session.currentUser.role === "Admin",
			})

		})
		.catch((error) => next(error))
})

// Create Events
router.get("/events/create", isLoggedIn, checkRoles("DM", "Admin"), (req, res, next) => {
	res.render("event/create")
})

router.post("/events/create", isLoggedIn, checkRoles("DM", "Admin"), (req, res, next) => {
	const { title, description, lat, lng, date, place, maxParticipant, imageUrl } = req.body
	const { _id: user } = req.session.currentUser

	const location = {
		type: "Point",
		coordinates: [lat, lng],
	}

	Event.create({ title, description, location, date, user, place, maxParticipant, imageUrl })
		.then(() => {
			res.redirect("/events")
		})
		.catch((error) => next(error))
})

// Details Events
router.get("/events/details/:events_id", isLoggedIn, (req, res, next) => {
	const { events_id } = req.params


	const promises = [
		Character.find({ user: req.session.currentUser._id }).select({ charactername: 1 }),
		Event.findById(events_id)
			.populate('characters user')

	]
	Promise
		.all(promises)
		.then(([characters, event]) => {

			event.formattedDate = formatDate(event.date)

			let isJoined = false;

			if (event.characters.length > 0) {
				let checkIfJoined = event.characters.filter(elm => req.session.currentUser.characters.includes(elm._id.toString()));
				if (checkIfJoined.length === 0) {
					isJoined = false
				} else {
					isJoined = true
				}
				console.log(checkIfJoined)

			}


			res.render("event/details", {
				characters,
				event,
				isDM: req.session.currentUser.role === "DM",
				isJoined,
				isOwner: req.session.currentUser._id === event.user._id,
				isMaximumReached: event.characters.length === event.maxParticipant,
				isPlayer: req.session.currentUser.role === "Player"
			})
		})
})


//  Join Event
router.post("/events/details/:events_id", checkRoles("Player"), isLoggedIn, (req, res, next) => {
	const { events_id } = req.params
	const { characters } = req.body
	Event
		.findByIdAndUpdate(events_id, { $addToSet: { characters: characters } })
		.then(() => {
			res.redirect(`/events/details/${events_id}`)
		})
		.catch((error) => next(error))
})


// Join event with Character
router.get("/events/edit/:events_id", checkRoles("DM", "Admin"), isLoggedIn, (req, res, next) => {
	const { events_id } = req.params

	Event.findById(events_id)
		.then((event) => {
			res.render("event/edit", event)
		})
		.catch((error) => next(error))
})

router.post("/events/edit/:events_id", checkRoles("DM", "Admin"), isLoggedIn, (req, res, next) => {
	const { events_id } = req.params
	const { title, description, lat, lng, date, post, place, maxParticipant } = req.body

	Event.findByIdAndUpdate(events_id, { title, description, lat, lng, date, post, place, maxParticipant }, { new: true })
		.then((updatedUser) => {
			req.session.currentUser = updatedUser
			res.redirect(`/events`)
		})
		.catch((error) => next(error))
})

// Delete Character from event
router.post("/events/characters/delete/:event_id/:character_id", isLoggedIn, (req, res, next) => {
	const { character_id, event_id } = req.params

	Event.findByIdAndUpdate(event_id, { $pull: { characters: character_id } }, { new: true })
		.then(() => {
			console.log(character_id)
			res.redirect("/events")
		})

		.catch((error) => next(error))
})

// Delete Event
router.post("/events/delete/:events_id", isLoggedIn, (req, res) => {
	const { events_id } = req.params;

	Event.findByIdAndDelete(events_id)
		.then(() => res.redirect("/events"))
		.catch((error) => { next(error) });
});




module.exports = router