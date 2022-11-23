const express = require("express")
const router = express.Router()
const { isLoggedIn } = require("../middleware/route.guard")

// Index
router.get("/", (req, res, next) => {
	res.render("index")
})

// Dashboard
router.get("/dashboard", isLoggedIn, (req, res, next) => {
	res.render("dashboard")
})

module.exports = router
