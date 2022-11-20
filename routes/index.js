module.exports = (app) => {
	// Index
	const indexRoutes = require("./index.routes");
	app.use("/", indexRoutes);

	// Auth Routes
	const authRoutes = require("./auth.routes");
	app.use("/", authRoutes);
	// require("./config")(app);
	// require("./auth.routes")(app);

	// Admin Routes
	const adminRoutes = require("./admin.routes");
	app.use("/", adminRoutes);

	// Characters Routes
	const charactersRoutes = require("./characters.routes");
	app.use("/", charactersRoutes);

	// User Routes
	const userRoutes = require("./user.routes");
	app.use("/", userRoutes);

	// API Routes
	const apiRoutes = require("./api.routes");
	app.use("/api", apiRoutes);

	// // Events Routes
	// const eventsRoutes = require("./events.routes");
	// app.use("/", eventsRoutes);
};
