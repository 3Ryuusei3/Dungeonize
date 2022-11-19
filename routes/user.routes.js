const express = require("express");
const { isLoggedIn } = require("../middleware/route-guard");
const router = express.Router();

const User = require("../models/User.model");

// User details
router.get("/user/details/:user_id", isLoggedIn, (req, res, next) => {
	const { user_id } = req.params;

	User.findById(user_id)
		.then((user) => {
			res.render("user/profile", {
				user,
				isAdmin: req.session.currentUser.role === "Admin",
				isTheUser: req.session.currentUser._id === user_id,
			});
		})
		.catch((err) => console.log(err));
});

// Edit User
router.get("/user/details/edit/:user_id", isLoggedIn, (req, res, next) => {
	const { user_id } = req.params;

	User.findById(user_id)
		.then((user) => {
			res.render("user/edit", user);
		})
		.catch((err) => console.log(err));
});

router.post("/user/details/edit/:user_id", isLoggedIn, (req, res, next) => {
	const { user_id } = req.params;
	const { email, username, password, description } = req.body;

	User.findByIdAndUpdate(user_id, { email, username, password, description })
		.then(() => {
			res.redirect(`/user/details/${user_id}`);
		})
		.catch((err) => console.log(err));
});

// Delete User
router.post("/user/delete/:user_id", isLoggedIn, (req, res) => {
	const { user_id } = req.params;

	User.findByIdAndDelete(user_id)
		.then(() => res.redirect("/admin"))
		.catch((err) => console.log(err));
});

// Delete user's account
router.post("/user/delete/account/:user_id", isLoggedIn, (req, res) => {
	const { user_id } = req.params;

	User.findByIdAndDelete(user_id)
		.then(() => {
			req.session.destroy(() => res.redirect("/"));
		})
		.catch((err) => console.log(err));
});

// My profile
router.get("/profile", (req, res, next) => {
	User.findById(req.session.currentUser._id)
		.then((user) => res.render("user/profile", { user }))
		.catch((err) => console.log(err));
});

module.exports = router;
