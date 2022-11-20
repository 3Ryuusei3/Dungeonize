const router = require("express").Router();

const { isLoggedIn } = require("./../middleware/route-guard");

const ApiService = require("./../services/character-service");
const characterService = new ApiService();

const User = require("./../models/User.model");
const Character = require("./../models/Character.model");

//Character list
router.get("/characters", (req, res, next) => {
	let user;

	User.findById(req.session.currentUser._id)
		.populate("characters")
		.then((theUser) => {
			user = theUser;
			return Character.find().select({ charactername: 1, classes: 1, race: 1 });
		})
		.then((characters) => {
			res.render("character/list", { user, characters });
		})
		.catch((err) => console.log(err));
});

// create characters
router.get("/characters/create", (req, res, next) => {
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
			console.log(data);
			return User.findById(req.session.currentUser._id);
		})
		.then(() => {
			res.render("character/create", { allClasses });
		});

	/* User.findById(req.session.currentUser._id)
		.then(() => {
			res.render("character/create");
		})
		.catch((err) => console.log(err)); */
});

router.post("/characters/create", (req, res, next) => {
	let userId = req.session.currentUser._id;
	const { charactername, classes, race, imageUrl, user } = req.body;

	Character.create({ charactername, classes, race, imageUrl, user: userId })
		.then(() => {
			res.redirect("/characters");
		})
		.catch((err) => console.log(err));
});

// // Edit User
// router.get("/user/details/edit/:user_id", isLoggedIn, (req, res, next) => {
// 	const { user_id } = req.params;

// 	User.findById(user_id)
// 		.then((user) => {
// 			res.render("user/edit", user);
// 		})
// 		.catch((err) => console.log(err));
// });

// router.post("/user/details/edit/:user_id", isLoggedIn, (req, res, next) => {
// 	const { user_id } = req.params;
// 	const { email, username, password, description } = req.body;

// 	User.findByIdAndUpdate(user_id, { email, username, password, description })
// 		.then(() => {
// 			res.redirect(`/user/details/${user_id}`);
// 		})
// 		.catch((err) => console.log(err));
// });

// // Delete User
// router.post("/user/delete/:user_id", isLoggedIn, (req, res) => {
// 	const { user_id } = req.params;

// 	User.findByIdAndDelete(user_id)
// 		.then(() => res.redirect("/admin"))
// 		.catch((err) => console.log(err));
// });

// // Delete user's account
// router.post("/user/delete/account/:user_id", isLoggedIn, (req, res) => {
// 	const { user_id } = req.params;

// 	User.findByIdAndDelete(user_id)
// 		.then(() => {
// 			req.session.destroy(() => res.redirect("/"));
// 		})
// 		.catch((err) => console.log(err));
// });

// // My profile
// router.get("/profile", (req, res, next) => {
// 	User.findById(req.session.currentUser._id)
// 		.then((user) => res.render("user/profile", { user }))
// 		.catch((err) => console.log(err));
// });

module.exports = router;
