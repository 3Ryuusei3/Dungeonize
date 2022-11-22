const router = require("express").Router();

const { isLoggedIn } = require("./../middleware/route-guard");

const ApiService = require("./../services/character-service");
const characterService = new ApiService();

const User = require("./../models/User.model");
const Character = require("./../models/Character.model");

//Character list
router.get("/characters", isLoggedIn, (req, res, next) => {


	const promises = [
		User.findById(req.session.currentUser._id),
		Character.find({ user: req.session.currentUser._id }).select({ charactername: 1, classes: 1, race: 1 })
	]

	Promise
		.all(promises)
		.then(([user, characters]) => res.render("character/list", { user, characters }))
		.catch((err) => console.log(err));
})

// Create characters
router.get("/characters/create", isLoggedIn, (req, res, next) => {
	let allClasses = [];
	let allRaces = [];

	characterService
		.getClasses()
		.then((data) => {
			//res.json(data.results);
			data.results.forEach((elm) => {
				allClasses.push(elm);
			});
			return characterService.getRaces();
		})
		.then((data) => {
			data.results.forEach((elm) => {
				allRaces.push(elm);
			});
			// console.log(data);
			return User.findById(req.session.currentUser._id);
		})
		.then(() => {
			res.render("character/create", { allClasses, allRaces });
		})
		.catch((err) => console.log(err))
});

router.post("/characters/create", isLoggedIn, (req, res, next) => {

	let userId = req.session.currentUser._id;
	const { charactername, classes, race, imageUrl, user } = req.body;

	Character.create({ charactername, classes, race, imageUrl, user: userId })
		.then(() => {
			res.redirect("/characters");
		})
		.catch((err) => console.log(err));
});

// Edit Character
router.get("/characters/edit/:character_id", isLoggedIn, (req, res, next) => {
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

// Delete Character
router.post("/characters/delete/:character_id", isLoggedIn, (req, res) => {
	const { character_id } = req.params;

	Character.findByIdAndDelete(character_id)
		.then(() => res.redirect("/characters"))
		.catch((err) => console.log(err))
});

// Create background
router.get("/characters/create/background", isLoggedIn, (req, res, next) => {

	let allPersonalities = [];
	let allIdeals = [];
	let allBonds = [];
	let allFlaws = [];

	characterService
		.getBackground()
		.then((data) => {
			// allPersonalities.map(elm => elm.data.personality_traits.from.options)
			data.personality_traits.from.options.forEach((elm) => {
				allPersonalities.push(elm)
			})
			data.ideals.from.options.forEach((elm) => {
				allIdeals.push(elm)
			})
			data.bonds.from.options.forEach((elm) => {
				allBonds.push(elm)
			})
			data.flaws.from.options.forEach((elm) => {
				allFlaws.push(elm)
			})
			res.render("character/background", { allPersonalities, allIdeals, allBonds, allFlaws });
		})
		.catch ((err) => console.log(err))
});


router.post("/characters/create/background", isLoggedIn, (req, res, next) => {

	const { personality, ideals, bonds, flaws } = req.body;


	const background = {
		personality: personality,
		ideals: ideals,
		bonds: bonds,
		flaws: flaws,
	};

	Character
	.create({ background })
		.then(() => {
			res.redirect("/characters");
		})
		.catch((err) => console.log(err));
});






module.exports = router;
