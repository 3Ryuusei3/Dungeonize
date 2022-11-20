const router = require("express").Router();

const User = require("./../models/User.model");

router.get("/users", (req, res, next) => {
	User.find()
		.then((user) => res.json(user))
		.catch((err) => console.log(err));
});

module.exports = router;
