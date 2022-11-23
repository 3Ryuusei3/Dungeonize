function isLoggedIn(req, res, next) {
	if (req.session.currentUser) {
		next()
	} else {
		res.render("auth/login", { errorMessage: "Login to access." })
	}
}

function isLoggedOut(req, res, next) {
	if (!req.session.currentUser) {
		next()
	} else {
		res.redirect(`/dashboard`)
	}
}


const checkRoles =
	(...rolesToCheck) =>
	(req, res, next) => {
		if (rolesToCheck.includes(req.session.currentUser.role)) {
			next()
		} else {
			res.render("index", { errorMessage: `You do not have ${rolesToCheck} priviledges` })
		}
	}

module.exports = {
	isLoggedIn,
	isLoggedOut,
	checkRoles
}
