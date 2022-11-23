const express = require("express")
const { isLoggedIn } = require("../middleware/route.guard")
const router = express.Router()

const User = require("../models/User.model")

// My profile
router.get("/user", isLoggedIn, (req, res, next) => {
	User.findById(req.session.currentUser._id)
		.select({ username: 1, imageUrl: 1, role: 1, email: 1, description: 1, })
		.then((user) => res.render("user/profile", { 
			user,
			isTheUser: true
		}))
		.catch((error) => next(error))
})

// User details
router.get("/user/details/:user_id", isLoggedIn, (req, res, next) => {
	const { user_id } = req.params

	User.findById(user_id)
		.select({ username: 1, imageUrl: 1, role: 1, email: 1, description: 1, })
		.then((user) => {
			res.render("user/profile", {
				user,
				isAdmin: req.session.currentUser.role === "Admin",
			})
		})
		.catch((error) => next(error))
})

// Edit User
router.get("/user/details/edit/:user_id", isLoggedIn, (req, res, next) => {
	const { user_id } = req.params

	User.findById(user_id)
		.select({ username: 1, email: 1, description: 1, })
		.then((user) => {
			res.render("user/edit", user)
		})
		.catch((error) => next(error))
})

router.post("/user/details/edit/:user_id", isLoggedIn, (req, res, next) => {
	const { user_id } = req.params
	const { email, username, password, description } = req.body

	User.findByIdAndUpdate(user_id, { email, username, password, description })
		.select({ username: 1, email: 1, description: 1, password : 1 })
		.then(() => {
			res.redirect(`/user/details/${user_id}`)
		})
		.catch((error) => next(error))
})

// Delete User
router.post("/user/delete/:user_id", isLoggedIn, (req, res) => {
	const { user_id } = req.params

	User.findByIdAndDelete(user_id)
		.then(() => res.redirect("/admin"))
		.catch((error) => next(error))
})

// Delete user's account
router.post("/user/delete/account/:user_id", isLoggedIn, (req, res) => {
	const { user_id } = req.params

	User.findByIdAndDelete(user_id)
		.then(() => {
			req.session.destroy(() => res.redirect("/"))
		})
		.catch((error) => next(error))
})

module.exports = router
