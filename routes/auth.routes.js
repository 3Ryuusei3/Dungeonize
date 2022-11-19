const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const saltRounds = 10;
const { isLoggedOut } = require("../middleware/route-guard");
const app = require("../app");

// Signup
router.get("/signup", isLoggedOut, (req, res, next) => res.render("auth/signup"));

router.post("/signup", isLoggedOut, (req, res, next) => {
	const { email, username, password, description } = req.body;

	// Me ha quedado pendiente esto del regex
	// var regex = /^[A-Za-z]\w{7,14}$/;

	if (password.length > 9) {
		bcrypt
			.genSalt(saltRounds)
			.then((salt) => bcrypt.hash(password, salt))
			.then((hashedPassword) => User.create({ username, email, description, password: hashedPassword }))
			.then(() => res.redirect("/login"))
			.catch((error) => console.log(error));
	} else {
		res.render("auth/signup", { errorMessage: "Password must container at least 8 characters." });
	}
});

// Login
router.get("/login", isLoggedOut, (req, res, next) => res.render("auth/login"));

router.post("/login", isLoggedOut, (req, res, next) => {
	const { email, password } = req.body;

	User.findOne({ email })
		.then((user) => {
			if (!user) {
				res.render("auth/login", { errorMessage: "User credentials are incorrect." });
				return;
			} else if (bcrypt.compareSync(password, user.password) === false) {
				res.render("auth/login", { errorMessage: "User credentials are incorrect." });
				return;
			} else {
				req.session.currentUser = user;
				// app.locals.user_id = req.session.currentUser._id;
				// if (req.session.currentUser) {
				// app.locals.user_id = user._id;
				// }
				// console.log(app.locals.user_id);
				res.redirect("/dashboard");
			}
		})
		.catch((error) => console.log(error));
});

// Logout
router.get("/logout", (req, res, next) => {
	req.session.destroy(() => res.redirect("/login"));
});

//

module.exports = router;
