const express = require("express");
const router = express.Router();
const { isLoggedIn, checkRoles } = require("../middleware/route-guard");
const User = require("../models/User.model");

// Admin Panel
router.get("/admin", isLoggedIn, checkRoles("Admin"), (req, res, next) => {
	User.find()
		/* .select({ username: 1 }) */
		.then((user) => res.render("admin/panel", { user }))
		.catch((error) => console.log(error));
});

module.exports = router;
