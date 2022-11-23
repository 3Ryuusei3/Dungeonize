const router = require("express").Router();
const { isLoggedIn } = require("./../middleware/route-guard");
const User = require("./../models/User.model");
const Character = require("./../models/Character.model");
const Event = require("./../models/Event.model");

//Events list
router.get("/events", (req, res, next) => {
	Event.find()
		.then((events) => {

			events.forEach(elm => {
				elm.formattedDates = elm.date.toString().split("T")[0].split("01:00")[0]
			});

			res.render("event/list", {
				events,
				/* formattedDates, */
				isDM: req.session.currentUser.role === "DM",
				isPlayer: req.session.currentUser.role === "Player"
			});

		})
		.catch((error) => { next(error) });
});

// Create Events
router.get("/events/create", (req, res, next) => {
	Event.find()
		.then(() => {
			res.render("event/create");
		})
		.catch((error) => { next(error) });
});

router.post("/events/create", (req, res, next) => {
	const { title, description, lat, lng, date, post, place, maxParticipant } = req.body;

	const { _id: user } = req.session.currentUser

	const location = {
		type: "Point",
		coordinates: [lat, lng],
	};

	Event.create({ title, description, location, date, user, place, maxParticipant })
		.then(() => {
			res.redirect("/events");
		})
		.catch((error) => { next(error) });
});

//Details Events
router.get("/events/details/:events_id", (req, res, next) => {
	const { events_id } = req.params;


	const promises = [
		Character.find({ user: req.session.currentUser._id }).select({ charactername: 1 }),
		Event.findById(events_id)
			.populate('characters')
	]
	Promise
		.all(promises)
		.then(([characters, event]) => {
			let isJoined;
			if (event.characters.length > 0) {
				isJoined = event.characters[0].user.toString() === req.session.currentUser._id;
			} else {
				isJoined = false;
			}
			res.render("event/details", {
				characters,
				event,
				isDM: req.session.currentUser.role === "DM",
				isJoined,
				isMaximumReached: event.characters.length + 1 === event.maxParticipant,
				isPlayer: req.session.currentUser.role === "Player"
			})
		});
});

//    Join Event
router.post("/events/details/:events_id", (req, res, next) => {
	const { events_id } = req.params
	const { characters } = req.body
	Event
		.findByIdAndUpdate(events_id, { $push: { characters: characters } })
		.then(() => {
			res.redirect(`/events/details/${events_id}`)
		})
		.catch((error) => { next(error) });

})


// Edit Character
router.get("/events/edit/:events_id", isLoggedIn, (req, res, next) => {
	const { events_id } = req.params;

	Event.findById(events_id)
		.then((event) => {
			res.render("event/edit", event);
		})
		.catch((error) => { next(error) });
});

router.post("/events/edit/:events_id", isLoggedIn, (req, res, next) => {
	const { events_id } = req.params;
	const { title, description, lat, lng, date, post, place } = req.body;

	Event.findByIdAndUpdate(events_id, { title, description, lat, lng, date, post, place })
		.then(() => {
			res.redirect(`/events`);
		})
		.catch((error) => { next(error) });
});

// Delete Character
router.post("/events/delete/:events_id", isLoggedIn, (req, res) => {
	const { events_id } = req.params;

	Event.findByIdAndDelete(events_id)
		.then(() => res.redirect("/events"))
		.catch((error) => { next(error) });
});

module.exports = router;
