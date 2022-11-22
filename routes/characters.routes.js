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
		.then((character) => {
			res.redirect(`/characters/create/class/${character._id}`);
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

// Create class
router.get("/characters/create/class/:character_id", isLoggedIn, (req, res, next) => {
	const { character_id } = req.params
	let characterClass;
	let allTraits;

	Character.findById(character_id)
		.then((character) => {  
			characterClass = character.classes.toLowerCase();
			return characterService.getClassTraits()
		})
		.then((data) => {		
			allTraits = data.results.map((elm) => elm)
			return characterService.getClassInfo(characterClass);      ////promise all
		})
		.then((data) => {
			const health = data.hit_die
			const allSkills = data.proficiency_choices[0].from.options.map((elem2) => elem2.item.name);
			const equipment = data.starting_equipment.map((elm) => elm.equipment)
			
			res.render("character/class", { allTraits, character_id, health, allSkills, equipment });
		})
		.catch((err) => console.log(err))
});


router.post("/characters/create/class/:character_id", isLoggedIn, (req, res, next) => {
	const { health, skills, equipment, traits } = req.body;
	const { character_id } = req.params

	const classInfo = {
		health: health,
		skills: skills,
		equipment: equipment,
		traits: traits,
	};

	Character
		.findByIdAndUpdate(character_id, { classInfo })
		.then(() => {
			res.redirect(`/characters/create/race/${character_id}`);
		})
		.catch((err) => console.log(err));
});


// Create races
router.get("/characters/create/race/:character_id", isLoggedIn, (req, res, next) => {
	const { character_id } = req.params
	let characterRace;

	Character.findById(character_id)
		.then((character) => {
			characterRace = character.race.toLowerCase()
			return characterService.getRacesInfo(characterRace);      
		})
		.then((data) => {
			const speed = data.speed
			const allAlignments = ["Lawful good", "Neutral good", "Chaotic good", "Lawful neutral", "True neutral", "Chaotic neutral", "Lawful evil", "Neutral evil", "Chaotic evil"]
			const ageDescription = data.age
			const sizeDescription = data.size_description
			const allLanguages = data.languages.map((elm) => elm.name)
			const allTraits = data.traits.map((elm) => elm.name)

			res.render("character/race", { speed, allAlignments, ageDescription, sizeDescription, allLanguages, allTraits, character_id });
		})
		.catch((err) => console.log(err))
});


router.post("/characters/create/race/:character_id", isLoggedIn, (req, res, next) => {
	const { speed, alignment, age, ageDescription, sizeDescription, languages, traits } = req.body;
	const { character_id } = req.params

	const raceInfo = {
		speed: speed,
		alignment: alignment,
		age: age,
		ageDescription: ageDescription,
		sizeDescription: sizeDescription,
		languages: languages,
		traits: traits
	};

	Character
		.findByIdAndUpdate(character_id, { raceInfo })
		.then(() => {
			res.redirect(`/characters/create/background/${character_id}`);
		})
		.catch((err) => console.log(err));
});



// Create background
router.get("/characters/create/background/:character_id", isLoggedIn, (req, res, next) => {
	const { character_id } = req.params
	
	characterService
		.getBackground()
		.then((data) => {
			const allPersonalities = data.personality_traits.from.options.map((elm) => elm)
			const allIdeals = data.ideals.from.options.map((elm) => elm)
			const allBonds = data.bonds.from.options.map((elm) => elm)
			const allFlaws = data.flaws.from.options.map((elm) => elm)
			res.render("character/background", { character_id, allPersonalities, allIdeals, allBonds, allFlaws });
		})
		.catch ((err) => console.log(err))
});


router.post("/characters/create/background/:character_id", isLoggedIn, (req, res, next) => {
	const { personality, ideals, bonds, flaws } = req.body;
	const { character_id } = req.params

	const background = {
		personality: personality,
		ideals: ideals,
		bonds: bonds,
		flaws: flaws,
	};

	Character
		.findByIdAndUpdate(character_id, { background })
		.then(() => {
			res.redirect("/characters");
		})
		.catch((err) => console.log(err));
});

module.exports = router;
