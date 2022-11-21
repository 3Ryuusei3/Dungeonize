const router = require("express").Router();
const { isLoggedIn } = require("./../middleware/route-guard");
const User = require("./../models/User.model");
const Character = require("./../models/Character.model");
const Event = require("./../models/Event.model");

//Events list
router.get("/events", (req, res, next) => {
	Event.find()
		.then((events) => {
			res.render("event/list", {
				events,
				isDM: req.session.currentUser.role === "DM",
			});
		})
		.catch((err) => console.log(err));
});

// Create Events
router.get("/events/create", (req, res, next) => {
	Event.find()
		.then(() => {
			res.render("event/create");
		})
		.catch((err) => console.log(err));
});

router.post("/events/create", (req, res, next) => {
	const { title, description, lat, lng, date, user } = req.body;

	const location = {
		type: "Point",
		coordinates: [lat, lng],
	};

	Event.create({ title, description, location, date, user: req.session.currentUser._id })
		.then(() => {
			res.redirect("/events");
		})
		.catch((err) => console.log(err));
});

//Details Events
router.get("/events/details/:events_id", (req, res, next) => {
	const { events_id } = req.params;

	Event.findById(events_id)
		.populate("user characters")
		.then((event) => {
			res.render("event/details", {
				event,
				isDM: req.session.currentUser.role === "DM",
			});
		});
});

/* // Edit Character
router.get("/events/edit/:character_id", isLoggedIn, (req, res, next) => {
	const { character_id } = req.params;

	Character.findById(character_id)
		.then((character) => {
			res.render("character/edit", character);
		})
		.catch((err) => console.log(err));
});

router.post("/characters/edit/:character_id", isLoggedIn, (req, res, next) => {
	const { character_id } = req.params;
	const { charactername } = req.body;

	Character.findByIdAndUpdate(character_id, { charactername })
		.then(() => {
			res.redirect(`/characters`);
		})
		.catch((err) => console.log(err));
});
*/
// Delete Character
router.post("/events/delete/:events_id", isLoggedIn, (req, res) => {
	const { events_id } = req.params;

	Event.findByIdAndDelete(events_id)
		.then(() => res.redirect("/events"))
		.catch((err) => console.log(err));
});

module.exports = router;
